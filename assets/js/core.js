/*
 * DMR Showcase — core: loads the content files, checks them, then starts the site.
 *
 * Content lives in /content and is described in CONTENT.md. Nothing in this
 * file needs to change when manufacturers, products, buildings or pins change.
 *
 * Order of events:
 *   1. index.html loads content/settings.js, categories.js, manifest.js, then this file.
 *   2. This file loads every manufacturer and building named in the manifest,
 *      plus installs.js and gallery.js.
 *   3. reconcile() removes anything switched off and any reference to something
 *      that no longer exists, recording each one in DMR.issues.
 *   4. The site scripts start (app.js, tour.js, map.js, scene3d.js).
 */
(function () {
  "use strict";
  var D = window.DMR;
  D.brands = [];
  D.products = [];
  D.buildings = [];
  D.installs = D.installs || [];
  D.gallery = D.gallery || [];
  D.issues = [];
  function issue(kind, text) { D.issues.push({ kind: kind, text: text }); }

  /* ---------- registration (called by the content files) ---------- */

  D.registerManufacturer = function (def) {
    var products = def.products || [];
    delete def.products;
    def.family = def.family || "Independent";
    D.brands.push(def);
    products.forEach(function (p) {
      p.brand = def.id;
      p.features = p.features || [];
      if (!("photo" in p)) p.photo = null;
      D.products.push(p);
    });
  };

  D.registerBuilding = function (def) {
    def.size.height = def.size.floors * def.size.floorHeight;
    def.stops = def.stops || [];
    def.challenges = def.challenges || [];
    D.buildings.push(def);
  };

  /* ---------- 3D world layout ---------- */

  /*
   * Works out where every building stands: districts side by side in use-type
   * order, shortest buildings in the front row. Sets building.pos = { x, z }.
   * A building file can set `position: { x, z }` to place itself by hand.
   */
  D.layoutWorld = function () {
    var W = D.world, x0 = 0, districts = {}, maxRows = 1;
    D.useTypes.forEach(function (u) {
      var list = D.buildings.filter(function (b) { return b.use === u.id; })
        .sort(function (a, b) { return a.size.height - b.size.height; });
      if (!list.length) return;
      var cols = Math.min(W.columns, list.length), rows = Math.ceil(list.length / cols);
      maxRows = Math.max(maxRows, rows);
      list.forEach(function (b, i) {
        b.pos = b.position || { x: x0 + (i % cols + 0.5) * W.cell.width, z: -Math.floor(i / cols) * W.cell.depth };
      });
      districts[u.id] = { x: x0 + cols * W.cell.width / 2, z: -(rows - 1) * W.cell.depth / 2, width: cols * W.cell.width, depth: rows * W.cell.depth };
      x0 += cols * W.cell.width + W.districtGap;
    });
    var width = Math.max(W.cell.width, x0 - W.districtGap), shift = width / 2;
    D.buildings.forEach(function (b) { if (!b.position) b.pos.x -= shift; });
    Object.keys(districts).forEach(function (k) { districts[k].x -= shift; });
    return { districts: districts, width: width, depth: maxRows * W.cell.depth };
  };

  /* ---------- reconcile: make the content consistent ---------- */

  function index(list) { var m = {}; list.forEach(function (x) { m[x.id] = x; }); return m; }
  function dedupe(list, what) {
    var seen = {};
    return list.filter(function (x) {
      if (seen[x.id]) { issue("error", "Two " + what + " share the id \"" + x.id + "\". The second one was ignored."); return false; }
      return (seen[x.id] = true);
    });
  }

  function reconcile() {
    // Manufacturers and products that are switched off simply disappear.
    D.brands = dedupe(D.brands, "manufacturers").filter(function (b) { return b.active !== false; });
    var brands = index(D.brands);
    D.products = dedupe(D.products, "products").filter(function (p) { return p.active !== false && brands[p.brand]; });
    var products = index(D.products), cats = index(D.categories);

    D.products.forEach(function (p) {
      if (!cats[p.category]) {
        issue("warn", "Product \"" + p.id + "\" uses the product type \"" + p.category + "\", which is not in content/categories.js. It is shown under Other.");
        if (!cats.other) { cats.other = { id: "other", name: "Other", blurb: "" }; D.categories.push(cats.other); }
        p.category = "other";
      }
    });
    D.brands.forEach(function (b) {
      if (!D.products.some(function (p) { return p.brand === b.id; })) issue("info", "Manufacturer \"" + b.name + "\" has no active product lines. Its tile still shows.");
      if (!b.logo) issue("info", "Manufacturer \"" + b.name + "\" has no logo. Its name is shown instead.");
    });
    // Product types with nothing in them are hidden.
    D.categories = D.categories.filter(function (c) { return D.products.some(function (p) { return p.category === c.id; }); });

    // Buildings: drop unknown use types, missing products, and stops left empty.
    var uses = index(D.useTypes);
    D.buildings = dedupe(D.buildings, "buildings").filter(function (b) {
      if (b.active === false) return false;
      if (!uses[b.use]) { issue("error", "Building \"" + b.id + "\" has the use type \"" + b.use + "\", which is not in content/settings.js. The building is hidden."); return false; }
      b.stops = b.stops.filter(function (s) {
        var before = s.products.length;
        s.products = s.products.filter(function (id) { return products[id]; });
        if (s.products.length < before) issue("info", "Building \"" + b.name + "\", stop \"" + s.title + "\": " + (before - s.products.length) + " product(s) no longer available were removed.");
        if (!s.products.length) issue("warn", "Building \"" + b.name + "\", stop \"" + s.title + "\" has no products left and is hidden. Add products to it in content/buildings/" + b.id + ".js.");
        return s.products.length > 0;
      });
      if (!b.stops.length) { issue("warn", "Building \"" + b.name + "\" has no stops left and is hidden."); return false; }
      return true;
    });
    D.buildings.sort(function (a, b) {
      return D.useTypes.indexOf(uses[a.use]) - D.useTypes.indexOf(uses[b.use]);
    });
    var buildings = index(D.buildings);

    // Which buildings each product appears in (drives the "Building type" filters).
    D.products.forEach(function (p) { p.buildings = []; });
    D.buildings.forEach(function (b) {
      b.stops.forEach(function (s) {
        s.products.forEach(function (id) { if (products[id].buildings.indexOf(b.id) < 0) products[id].buildings.push(b.id); });
      });
    });
    D.products.forEach(function (p) {
      if (!p.buildings.length) issue("info", "Product \"" + p.id + "\" is not placed in any building. It appears in the catalog only.");
    });

    // Map pins keep their place even when a manufacturer goes away.
    D.cleanInstall = function (i) {
      i.manufacturers = (i.manufacturers || []).filter(function (id) { return brands[id]; });
      i.products = (i.products || []).filter(function (id) { return products[id]; });
      i.photos = i.photos || [];
      if (i.building && !buildings[i.building]) i.building = "";
      return i;
    };
    D.installs.forEach(function (i) {
      var m = (i.manufacturers || []).length;
      D.cleanInstall(i);
      if (i.manufacturers.length < m) issue("info", "Map pin \"" + i.name + "\": " + (m - i.manufacturers.length) + " manufacturer(s) no longer represented were removed from it.");
      if (!i.manufacturers.length) issue("warn", "Map pin \"" + i.name + "\" has no manufacturers left. It still shows, but no manufacturer filter will find it.");
    });
    D.gallery.forEach(function (g) {
      if (g.product && !products[g.product]) { issue("info", "Gallery photo \"" + g.caption + "\" pointed at a product that is no longer available. The link was removed."); g.product = null; }
    });

    D.lookup = { brands: brands, cats: index(D.categories), products: products, buildings: buildings };
    D.issues.forEach(function (i) { (i.kind === "info" ? console.info : console.warn)("[content] " + i.text); });
  }

  /* ---------- content report (?check=1) ---------- */

  function report() {
    if (!/[?&]check(=1)?(&|$)/.test(location.search)) return;
    var order = { error: 0, warn: 1, info: 2 }, label = { error: "Fix", warn: "Check", info: "Note" };
    var list = D.issues.slice().sort(function (a, b) { return order[a.kind] - order[b.kind]; });
    var el = document.createElement("section");
    el.className = "content-report";
    el.innerHTML = "<h2>Content report</h2><p>" + D.brands.length + " manufacturers · " + D.products.length + " product lines · " +
      D.categories.length + " product types · " + D.buildings.length + " buildings · " + D.installs.length + " map pins</p>" +
      (list.length ? "<ul>" + list.map(function (i) { return '<li class="' + i.kind + '"><strong>' + label[i.kind] + "</strong> " + i.text.replace(/</g, "&lt;") + "</li>"; }).join("") + "</ul>"
        : "<p><strong>No problems found.</strong></p>");
    document.getElementById("main").prepend(el);
  }

  /* ---------- loader ---------- */

  function load(src, type) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = src;
      if (type) s.type = type; else s.async = false;   // classic scripts run in the order added
      s.onload = resolve;
      s.onerror = function () { issue("error", "Could not load " + src + ". Check the name in content/manifest.js and that the file exists."); resolve(); };
      document.body.appendChild(s);
    });
  }
  var M = D.manifest, content = []
    .concat(M.manufacturers.map(function (id) { return "content/manufacturers/" + id + ".js"; }))
    .concat(M.buildings.map(function (id) { return "content/buildings/" + id + ".js"; }))
    .concat(["content/installs.js", "content/gallery.js"]);

  Promise.all(content.map(function (src) { return load(src); }))
    .then(function () {
      reconcile();
      return Promise.all(["assets/js/app.js", "assets/js/tour.js", "assets/js/map.js"].map(function (src) { return load(src); }));
    })
    .then(function () {
      report();
      return load("assets/js/scene3d.js", "module");
    });
})();
