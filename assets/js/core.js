/*
 * DMR Showcase — core: loads the content files, checks them, then starts the site.
 *
 * Content lives in /content and is described in CONTENT.md. Nothing in this
 * file needs to change when manufacturers, products, buildings or pins change.
 *
 * Order of events:
 *   1. index.html loads content/settings.js, categories.js, manifest.js, then this file.
 *   2. This file loads every manufacturer and building named in the manifest,
 *      plus installs.js and gallery.js, then the text file for each product
 *      and building from content/text/.
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
      p.photos = p.photos || [];
      D.products.push(p);
    });
  };

  D.registerBuilding = function (def) {
    def.size.height = def.size.floors * def.size.floorHeight;
    def.stops = def.stops || [];
    def.challenges = def.challenges || [];
    def.advantages = def.advantages || [];
    D.buildings.push(def);
  };

  /* ---------- text files ---------- */

  /*
   * The words for every product and building are in plain text files under
   * content/text/. The format is deliberately simple:
   *
   *   Label: one line of text
   *   Another label:
   *   - a list item
   *   - another list item
   *   # a note that is not shown
   *
   * parseText returns the entries in order: [{ key, value, items }].
   */
  function parseText(src) {
    var out = [], cur = null;
    src.split(/\r?\n/).forEach(function (line) {
      line = line.trim();
      if (!line || line.charAt(0) === "#") return;
      var m;
      if (/^[-*•]\s*/.test(line)) { if (cur) cur.items.push(line.replace(/^[-*•]\s*/, "").trim()); return; }
      if ((m = line.match(/^([A-Za-z][A-Za-z '’-]{0,40}):\s*(.*)$/))) { cur = { key: m[1].trim().toLowerCase(), value: m[2].trim(), items: [] }; out.push(cur); return; }
      if (cur) cur.value = (cur.value + " " + line).trim();
    });
    return out;
  }
  function cells(item) { return item.split("|").map(function (c) { return c.trim(); }); }
  function pair(item) { var i = item.indexOf(":"); return i < 0 ? ["", item.trim()] : [item.slice(0, i).trim(), item.slice(i + 1).trim()]; }

  function applyProductText(p, entries) {
    entries.forEach(function (e) {
      if (e.key === "name") p.name = e.value;
      else if (e.key === "summary") p.summary = e.value;
      else if (e.key === "key points") p.features = e.items;
      else if (e.key === "badge") p.badge = e.value;
      else if (e.key === "specifications") { p.specs = {}; e.items.forEach(function (i) { var kv = pair(i); p.specs[kv[0] || kv[1]] = kv[0] ? kv[1] : ""; }); }
      else if (e.key === "documents") p.links = e.items.map(cells).filter(function (c) { return c[1]; }).map(function (c) { return { label: c[0], url: c[1] }; });
      else if (e.key === "photos") p.photos = e.items.map(cells).map(function (c) { return { src: c[0], caption: c[1] || "" }; });
    });
  }
  function applyBuildingText(b, entries) {
    var stops = {}, stop = null;
    b.stops.forEach(function (s) { stops[s.id] = s; });
    entries.forEach(function (e) {
      if (e.key === "location") {
        stop = stops[e.value];
        if (!stop) issue("warn", "content/text/buildings/" + b.id + ".txt mentions the location \"" + e.value + "\", which is not in content/buildings/" + b.id + ".js. It was ignored.");
      } else if (stop && e.key === "title") stop.title = e.value;
      else if (stop && e.key === "text") stop.text = e.value;
      else if (stop && e.key === "equipment") stop.equipment = e.items.map(cells).map(function (c) { return { product: c[0], role: c[1] || "", note: c[2] || "" }; });
      else if (e.key === "name") b.name = e.value;
      else if (e.key === "summary") b.intro = e.value;
      else if (e.key === "why a dmr package") b.advantages = e.items.map(pair).map(function (kv) { return { title: kv[0], text: kv[1] }; });
      else if (e.key === "challenges") b.challenges = e.items;
    });
  }
  function loadText(path, target, apply) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (t) { apply(target, parseText(t)); }, function () {
      issue("error", "Could not read " + path + ". The words for \"" + (target.name || target.id) + "\" are missing until that file exists.");
    });
  }

  /* ---------- 3D world layout ---------- */

  /*
   * Works out where every building stands: districts side by side in use-type
   * order, shortest buildings in the front row. Sets building.pos = { x, z }.
   * A building file can set `position: { x, z }` to place itself by hand.
   */
  D.layoutWorld = function () {
    var W = D.world, districts = {}, bands = [[]], bandWidth = 0;
    // Group the districts into rows ("bands") no wider than W.maxWidth. The first band is at the back.
    D.useTypes.forEach(function (u) {
      var list = D.buildings.filter(function (b) { return b.use === u.id; })
        .sort(function (a, b) { return a.size.height - b.size.height; });
      if (!list.length) return;
      var cols = Math.min(W.columns, list.length), d = { id: u.id, list: list, cols: cols, rows: Math.ceil(list.length / cols), width: cols * W.cell.width };
      if (bandWidth && bandWidth + W.districtGap + d.width > (W.maxWidth || Infinity)) { bands.push([]); bandWidth = 0; }
      bands[bands.length - 1].push(d);
      bandWidth += (bandWidth ? W.districtGap : 0) + d.width;
    });
    var front = 0, minX = 0, maxX = 0, minZ = 0;
    for (var n = bands.length - 1; n >= 0; n--) {
      var band = bands[n], total = band.reduce(function (a, d) { return a + d.width; }, 0) + W.districtGap * (band.length - 1);
      var x0 = -total / 2, rows = Math.max.apply(null, band.map(function (d) { return d.rows; }).concat(1));
      band.forEach(function (d) {
        d.list.forEach(function (b, i) {
          b.pos = b.position || { x: x0 + (i % d.cols + 0.5) * W.cell.width, z: front - Math.floor(i / d.cols) * W.cell.depth };
        });
        districts[d.id] = { x: x0 + d.width / 2, z: front - (d.rows - 1) * W.cell.depth / 2, width: d.width, depth: d.rows * W.cell.depth, front: front };
        x0 += d.width + W.districtGap;
      });
      minX = Math.min(minX, -total / 2); maxX = Math.max(maxX, total / 2);
      minZ = front - (rows - 1) * W.cell.depth;
      front -= rows * W.cell.depth + (W.bandGap || 0);
    }
    return { districts: districts, width: maxX - minX, depth: W.cell.depth - minZ, x: (minX + maxX) / 2, z: minZ / 2 };
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
      p.name = p.name || p.id;
      p.summary = p.summary || "";
      p.photos = p.photos.filter(function (x) { return x.src; });
      p.photo = p.photos.length ? p.photos[0].src : null;
    });

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
        s.title = s.title || s.id;
        s.text = s.text || "";
        s.equipment = s.equipment || (s.products || []).map(function (id) { return { product: id, role: "", note: "" }; });
        var before = s.equipment.length;
        s.equipment = s.equipment.filter(function (e) { return products[e.product]; });
        s.products = s.equipment.map(function (e) { return e.product; });
        if (s.products.length < before) issue("info", "Building \"" + b.name + "\", stop \"" + s.title + "\": " + (before - s.products.length) + " product(s) no longer available were removed.");
        if (!s.products.length) issue("warn", "Building \"" + b.name + "\", stop \"" + s.title + "\" has no products left and is hidden. Add equipment to it in content/text/buildings/" + b.id + ".txt.");
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
      i.manufacturers = (i.manufacturers || []).filter(function (id, n, all) { return brands[id] && all.indexOf(id) === n; });
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
      // Read the words for every product and building before checking the content.
      return Promise.all(
        D.products.map(function (p) { return loadText("content/text/products/" + p.id + ".txt", p, applyProductText); })
          .concat(D.buildings.map(function (b) { return loadText("content/text/buildings/" + b.id + ".txt", b, applyBuildingText); })));
    })
    .then(function () {
      reconcile();
      return Promise.all(["assets/js/app.js", "assets/js/tour.js", "assets/js/map.js"].map(function (src) { return load(src); }));
    })
    .then(function () {
      report();
      return load("assets/js/scene3d.js", "module");
    });
})();
