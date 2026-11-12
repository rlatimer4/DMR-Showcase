/* DMR Showcase — catalog, manufacturers, gallery, project list, dialogs. */
(function () {
  "use strict";
  var D = window.DMR;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var brands = D.lookup.brands, cats = D.lookup.cats, products = D.lookup.products, buildings = D.lookup.buildings;

  // <option>s for a building-type <select>, grouped by use type.
  D.buildingOptions = function () {
    return D.useTypes.map(function (u) {
      var list = D.buildings.filter(function (b) { return b.use === u.id; });
      return list.length ? '<optgroup label="' + u.name + '">' + list.map(function (b) { return '<option value="' + b.id + '">' + b.name + "</option>"; }).join("") + "</optgroup>" : "";
    }).join("");
  };

  /* ---------- shared helpers ---------- */

  // Real photo if one is set, otherwise a labelled placeholder tile.
  D.media = function (item, label) {
    if (item.photo) return '<img class="media" src="' + item.photo + '" alt="' + (label || "") + '" loading="lazy">';
    return '<div class="media ph" role="img" aria-label="Photo placeholder">' +
      '<span class="ph-label">Photo placeholder</span>' + (label ? '<span class="ph-name">' + label + "</span>" : "") + "</div>";
  };


  /* ---------- project list (saved in the browser) ---------- */

  var KEY = "dmr-project-list";
  var list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]").filter(function (id) { return products[id]; }); } catch (e) { list = []; }
  function saveList() {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
    $("#listCount").textContent = list.length;
    document.querySelectorAll("[data-add]").forEach(syncAddBtn);
  }
  function syncAddBtn(btn) {
    var on = list.indexOf(btn.dataset.add) > -1;
    btn.setAttribute("aria-pressed", on);
    btn.textContent = on ? "In project list" : "Add to project list";
  }
  function toggleList(id) {
    var i = list.indexOf(id);
    if (i > -1) list.splice(i, 1); else list.push(id);
    saveList();
  }

  /* ---------- catalog ---------- */

  var state = { q: "", cat: "", building: "", brand: "" };

  function matches(p) {
    if (state.cat && p.category !== state.cat) return false;
    if (state.building && p.buildings.indexOf(state.building) < 0) return false;
    if (state.brand && p.brand !== state.brand) return false;
    if (state.q) {
      var hay = (p.name + " " + brands[p.brand].name + " " + cats[p.category].name + " " + p.summary + " " + p.features.join(" ")).toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
    }
    return true;
  }

  function card(p) {
    return '<article class="card">' +
      '<button class="card-open" type="button" data-product="' + p.id + '" aria-label="' + brands[p.brand].name + " " + p.name + ': details">' +
      D.media(p) + "</button>" +
      '<div class="card-body">' +
      '<p class="card-meta">' + cats[p.category].name + "</p>" +
      '<h3><span class="card-brand">' + brands[p.brand].name + "</span> " + p.name + (p.badge ? ' <span class="badge">' + p.badge + "</span>" : "") + "</h3>" +
      "<p>" + p.summary + "</p>" +
      '<div class="card-actions"><button class="link" type="button" data-product="' + p.id + '">View details</button>' +
      '<button class="add" type="button" data-add="' + p.id + '"></button></div>' +
      "</div></article>";
  }

  function renderCatalog() {
    var found = D.products.filter(matches);
    $("#productGrid").innerHTML = found.length ? found.map(card).join("") :
      '<p class="empty">No products match these filters. Clear a filter, or call DMR at ' + D.company.phone + " and we will find what you need.</p>";
    $("#resultCount").textContent = "";
    $("#clearFilters").hidden = !(state.q || state.cat || state.building || state.brand);
    $("#catBlurb").textContent = state.cat && cats[state.cat] ? cats[state.cat].blurb : (state.brand && brands[state.brand] ? brands[state.brand].blurb : "");
    document.querySelectorAll("#catChips button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.cat === state.cat);
    });
    $("#fMarket").value = state.building;
    $("#fBrand").value = state.brand;
    if ($("#q").value !== state.q) $("#q").value = state.q;
    document.querySelectorAll("#productGrid [data-add]").forEach(syncAddBtn);
  }

  D.filterCatalog = function (patch, scroll) {
    state = Object.assign({ q: "", cat: "", building: "", brand: "" }, patch);
    renderCatalog();
    if (scroll) $("#products").scrollIntoView({ behavior: "smooth" });
  };

  function initCatalog() {
    $("#catChips").innerHTML = '<button type="button" data-cat="">All systems</button>' + D.categories.map(function (c) {
      return '<button type="button" data-cat="' + c.id + '">' + c.name + "</button>";
    }).join("");
    $("#fMarket").insertAdjacentHTML("beforeend", D.buildingOptions());
    $("#fBrand").insertAdjacentHTML("beforeend", D.brands.map(function (b) { return '<option value="' + b.id + '">' + b.name + "</option>"; }).join(""));
    $("#catChips").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) { state.cat = b.dataset.cat; renderCatalog(); }
    });
    $("#q").addEventListener("input", function (e) { state.q = e.target.value.trim(); renderCatalog(); });
    $("#fMarket").addEventListener("change", function (e) { state.building = e.target.value; renderCatalog(); });
    $("#fBrand").addEventListener("change", function (e) { state.brand = e.target.value; renderCatalog(); });
    $("#clearFilters").addEventListener("click", function () { D.filterCatalog({}); });
    renderCatalog();
  }

  /* ---------- manufacturers ---------- */

  function initBrands() {
    $("#brandGrid").innerHTML = D.brands.map(function (b) {
      return '<button class="brand-tile" type="button" data-brand="' + b.id + '">' +
        '<span class="brand-logo">' + (b.logo ? '<img src="' + b.logo + '" alt="">' : '<span class="brand-word">' + b.name + "</span>") + "</span>" +
        '<span class="brand-name">' + b.name + "</span>" +
        '<span class="brand-blurb">' + b.blurb + "</span>" +
        "</button>";
    }).join("");
    $("#brandGrid").addEventListener("click", function (e) {
      var t = e.target.closest("[data-brand]");
      if (t) D.filterCatalog({ brand: t.dataset.brand }, true);
    });
  }

  /* ---------- gallery ---------- */

  function initGallery() {
    $("#galleryGrid").innerHTML = D.gallery.map(function (g) {
      var p = g.product && products[g.product];
      return '<figure class="shot' + (g.size === "wide" ? " wide" : "") + '">' + D.media(g, g.caption) +
        "<figcaption>" + g.caption + (p ? ' · <button class="link" type="button" data-product="' + p.id + '">' + brands[p.brand].name + "</button>" : "") + "</figcaption></figure>";
    }).join("");
  }

  /* ---------- product photo gallery ---------- */

  // Photos come from the product's text file. Until real photos are added,
  // placeholder tiles show the kinds of photo the gallery is meant to hold.
  var SLOTS = ["Product photo", "Installed on site", "Close-up detail", "Inside the unit"];
  function shots(p) {
    return p.photos.length ? p.photos : SLOTS.map(function (c) { return { src: null, caption: c }; });
  }
  function shotHtml(x, alt) {
    return x.src ? '<img class="media" src="' + x.src + '" alt="' + (x.caption || alt) + '">' : D.media({ photo: null }, x.caption);
  }
  function galleryHtml(p) {
    var list = shots(p), name = brands[p.brand].name + " " + p.name;
    return '<div class="pgal" data-gallery="' + p.id + '" data-at="0">' +
      '<div class="pgal-main">' + shotHtml(list[0], name) + "</div>" +
      (list.length > 1 ? '<div class="pgal-bar"><button type="button" class="pgal-nav" data-shot-step="-1" aria-label="Previous photo">‹</button>' +
        '<p class="pgal-cap">' + (list[0].caption || "") + "</p>" +
        '<button type="button" class="pgal-nav" data-shot-step="1" aria-label="Next photo">›</button></div>' +
        '<div class="pgal-thumbs">' + list.map(function (x, i) {
          return '<button type="button" data-shot="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + (x.caption ? ": " + x.caption : "") + '">' + shotHtml(x, name) + "</button>";
        }).join("") + "</div>" : (list[0].caption ? '<p class="pgal-cap">' + list[0].caption + "</p>" : "")) +
      "</div>";
  }
  function showShot(el, i) {
    var p = products[el.dataset.gallery], list = shots(p);
    i = (i + list.length) % list.length;
    el.dataset.at = i;
    el.querySelector(".pgal-main").innerHTML = shotHtml(list[i], p.name);
    el.querySelector(".pgal-cap").textContent = list[i].caption || "";
    el.querySelectorAll("[data-shot]").forEach(function (b) { b.setAttribute("aria-pressed", Number(b.dataset.shot) === i); });
  }

  /* ---------- product dialog ---------- */

  var pd = $("#productDialog");
  D.openProduct = function (id) {
    var p = products[id];
    if (!p) return;
    var b = brands[p.brand];
    var stops = [];
    D.buildings.forEach(function (bl) {
      bl.stops.forEach(function (s) { if (s.products.indexOf(id) > -1) stops.push({ b: bl, s: s }); });
    });
    var related = D.products.filter(function (x) { return x.id !== id && x.category === p.category; }).slice(0, 4);
    pd.innerHTML =
      '<form method="dialog"><button class="close" aria-label="Close">Close</button></form>' +
      '<div class="sheet-grid"><div>' + galleryHtml(p) + "</div><div>" +
      '<p class="card-meta">' + cats[p.category].name + "</p>" +
      '<h2 id="pdTitle"><span class="card-brand">' + b.name + "</span> " + p.name + (p.badge ? ' <span class="badge">' + p.badge + "</span>" : "") + "</h2>" +
      '<p class="lede-sm">' + p.summary + "</p>" +
      (p.features.length ? "<h3>Key points</h3><ul class='ticks'>" + p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>" : "") +
      (p.specs ? "<h3>Specifications</h3><dl class='specs'>" + Object.keys(p.specs).map(function (k) { return "<dt>" + k + "</dt><dd>" + p.specs[k] + "</dd>"; }).join("") + "</dl>" : "") +
      (p.links && p.links.length ? "<h3>Documents and links</h3><ul class='doc-links'>" + p.links.map(function (l) { return '<li><a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + "</a></li>"; }).join("") + "</ul>" : "") +
      (p.buildings.length ? "<h3>Used in</h3><p class='tags'>" + p.buildings.map(function (m) { return "<span>" + buildings[m].name + "</span>"; }).join("") + "</p>" : "") +
      (stops.length ? "<h3>See it in the walkthrough</h3><p class='tags'>" + stops.map(function (x) {
        return '<button type="button" class="tag-btn" data-stop="' + x.s.id + '">' + x.b.name + ": " + x.s.title + "</button>";
      }).join("") + "</p>" : "") +
      '<div class="sheet-actions"><button class="btn btn-primary add" type="button" data-add="' + p.id + '"></button>' +
      '<a class="btn btn-line" href="mailto:' + D.company.email + "?subject=" + encodeURIComponent("Inquiry: " + b.name + " " + p.name) + '">Ask DMR about this</a></div>' +
      (b.website ? '<p class="maker-link"><a href="' + b.website + '" target="_blank" rel="noopener">Visit ' + b.name + "</a></p>" : "") +
      "</div></div>" +
      (related.length ? '<div class="related"><h3>More in ' + cats[p.category].name + "</h3><div class='related-row'>" + related.map(function (r) {
        return '<button type="button" data-product="' + r.id + '"><strong>' + brands[r.brand].name + "</strong>" + r.name + "</button>";
      }).join("") + "</div></div>" : "");
    pd.querySelectorAll("[data-add]").forEach(syncAddBtn);
    if (!pd.open) pd.showModal();
    pd.scrollTop = 0;
  };

  /* ---------- project list dialog ---------- */

  var ld = $("#listDialog");
  function renderList() {
    var body = "Hello DMR,\n\nI would like to discuss these products:\n\n" + list.map(function (id) {
      return "- " + brands[products[id].brand].name + " " + products[id].name;
    }).join("\n") + "\n\nProject name:\nLocation:\nSchedule:\n";
    ld.innerHTML =
      '<form method="dialog"><button class="close" aria-label="Close">Close</button></form>' +
      '<h2 id="ldTitle">Project list</h2>' +
      (list.length
        ? '<p class="lede-sm">Send this list to DMR and a sales engineer will follow up.</p><ul class="pl">' + list.map(function (id) {
          var p = products[id];
          return "<li><span><strong>" + brands[p.brand].name + "</strong> " + p.name + '</span><button class="link" type="button" data-remove="' + id + '">Remove</button></li>';
        }).join("") + '</ul><div class="sheet-actions"><a class="btn btn-primary" href="mailto:' + D.company.email + "?subject=" + encodeURIComponent("Project inquiry") + "&body=" + encodeURIComponent(body) + '">Email list to DMR</a>' +
          '<button class="btn btn-line" type="button" data-clear>Clear list</button></div>'
        : '<p class="lede-sm">Your list is empty. Add products from the catalog or the walkthrough, then send the list to DMR.</p>');
  }
  function openList() { renderList(); if (!ld.open) ld.showModal(); }

  /* ---------- global events ---------- */

  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-add]"))) { toggleList(t.dataset.add); return; }
    if ((t = e.target.closest("[data-remove]"))) { toggleList(t.dataset.remove); renderList(); return; }
    if (e.target.closest("[data-clear]")) { list = []; saveList(); renderList(); return; }
    if ((t = e.target.closest("[data-shot]"))) { showShot(t.closest(".pgal"), Number(t.dataset.shot)); return; }
    if ((t = e.target.closest("[data-shot-step]"))) { var gal = t.closest(".pgal"); showShot(gal, Number(gal.dataset.at) + Number(t.dataset.shotStep)); return; }
    if ((t = e.target.closest("[data-product]"))) { D.openProduct(t.dataset.product); return; }
    if ((t = e.target.closest("dialog [data-stop]"))) { pd.close(); D.goToStop(t.dataset.stop, true); return; }
    // Click on the backdrop closes a dialog.
    if (e.target.tagName === "DIALOG") e.target.close();
  });
  $("#listBtn").addEventListener("click", openList);
  $("#contactList").addEventListener("click", openList);

  var toggle = $(".nav-toggle"), nav = $("#nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); });

  /* ---------- static content ---------- */

  var c = D.company;
  $("#statFounded").textContent = c.founded;
  $("#lineCardLink").href = c.lineCard;
  $("#contactCard").innerHTML = "<strong>" + c.name + "</strong><span>" + c.address.join("<br>") + "</span>" +
    '<a href="tel:' + c.phone.replace(/\D/g, "") + '">' + c.phone + '</a><a href="mailto:' + c.email + '">' + c.email + "</a>" +
    '<a href="' + c.website + '" target="_blank" rel="noopener">dmr-hvac.com</a>';
  $("#footLine").textContent = "© " + new Date().getFullYear() + " " + c.name + " · " + c.tagline;

  initCatalog();
  initBrands();
  initGallery();
  saveList();

  // Deep link: #product/<id>
  function route() {
    var m = location.hash.match(/^#product\/(.+)$/);
    if (m) D.openProduct(m[1]);
  }
  window.addEventListener("hashchange", route);
  route();
})();
