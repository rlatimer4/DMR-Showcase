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

  function placeholderSvg(item) {
    var cat = (item && item.category) || "";
    if (cat === "ahu" || cat === "fanwall" || cat === "makeup" || cat === "recovery") {
      return '<svg class="ph-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="40" height="28" rx="3"/><circle cx="18" cy="24" r="8"/><path d="M18 16v16M10 24h16M32 16h6M32 24h6M32 32h6"/></svg>';
    }
    if (cat === "datacenter" || cat === "coils" || cat === "evap" || cat === "dehum") {
      return '<svg class="ph-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="8" width="36" height="32" rx="3"/><path d="M14 14v20M21 14v20M28 14v20M35 14v20M10 20h28M10 28h28"/></svg>';
    }
    if (cat === "hydronic" || cat === "heaters" || cat === "electric" || cat === "heatpump" || cat === "vrf" || cat === "packaged" || cat === "terminal") {
      return '<svg class="ph-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="12" width="38" height="24" rx="3"/><path d="M13 18v12M19 18v12M25 18v12M31 18v12M36 21h3M36 27h3"/></svg>';
    }
    if (cat === "humid" || cat === "iaq" || cat === "critical" || cat === "controls") {
      return '<svg class="ph-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="4"/><circle cx="24" cy="24" r="7"/><path d="M24 12v3M24 33v3M12 24h3M33 24h3"/></svg>';
    }
    return '<svg class="ph-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="3"/><circle cx="19" cy="22" r="4"/><path d="M6 32l11-9 8 7 7-6 10 8"/></svg>';
  }

  // Real photo if one is set, otherwise a labelled placeholder tile.
  D.media = function (item, label) {
    if (item && item.photo) return '<img class="media" src="' + item.photo + '" alt="' + (label || "") + '" loading="lazy">';
    var tag = item && item.category && cats[item.category] ? cats[item.category].name : "Equipment photo";
    return '<div class="media ph" role="img" aria-label="Photo placeholder">' +
      placeholderSvg(item) +
      '<span class="ph-label">' + tag + '</span>' + (label ? '<span class="ph-name">' + label + "</span>" : "") + "</div>";
  };


  /* ---------- project list & Basis-of-Design schedule (saved in the browser) ---------- */

  var KEY = "dmr-project-list", META_KEY = "dmr-project-meta";
  var list = [], meta = { proj: { name: "", location: "", engineer: "", phase: "" }, items: {} };
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]").filter(function (id) { return products[id]; }); } catch (e) { list = []; }
  try {
    var savedMeta = JSON.parse(localStorage.getItem(META_KEY) || "null");
    if (savedMeta && typeof savedMeta === "object") {
      meta.proj = Object.assign(meta.proj, savedMeta.proj || {});
      meta.items = savedMeta.items || {};
    }
  } catch (e) { /* ignore */ }

  var TAG_PREFIX = {
    ahu: "AHU", fanwall: "FW", packaged: "RTU", datacenter: "DC", critical: "CR",
    recovery: "ERV", heatpump: "ASHP", vrf: "VRF", terminal: "TU", coils: "CL",
    hydronic: "HYD", electric: "EH", heaters: "UH", makeup: "MUA", humid: "HUM",
    dehum: "DH", iaq: "UV", evap: "EVAP", controls: "CTL"
  };
  function defaultTag(id, idx) {
    var p = products[id];
    var pre = (p && TAG_PREFIX[p.category]) || "EQ";
    return pre + "-" + (idx + 1);
  }
  function ensureItemMeta(id, roleHint) {
    var idx = list.indexOf(id);
    if (!meta.items[id]) {
      meta.items[id] = { tag: defaultTag(id, idx > -1 ? idx : list.length), qty: 1, role: roleHint || "", notes: "" };
    } else if (roleHint && !meta.items[id].role) {
      meta.items[id].role = roleHint;
    }
    return meta.items[id];
  }
  function saveMeta() {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch (e) { /* storage unavailable */ }
  }
  function saveList(animate) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
    saveMeta();
    var countEl = $("#listCount");
    countEl.textContent = list.length;
    if (animate) {
      countEl.classList.remove("bump");
      void countEl.offsetWidth;
      countEl.classList.add("bump");
      setTimeout(function () { countEl.classList.remove("bump"); }, 240);
    }
    document.querySelectorAll("[data-add]").forEach(syncAddBtn);
  }
  function syncAddBtn(btn) {
    var on = list.indexOf(btn.dataset.add) > -1;
    btn.setAttribute("aria-pressed", on);
    btn.textContent = btn.classList.contains("add-mini") ? (on ? "✓ In project list" : "+ Add to project list") : (on ? "✓ In project list" : "Add to project list");
  }
  D.syncAddBtns = function (root) {
    (root || document).querySelectorAll("[data-add]").forEach(syncAddBtn);
  };
  function toggleList(id, roleHint) {
    var i = list.indexOf(id);
    if (i > -1) list.splice(i, 1);
    else { list.push(id); ensureItemMeta(id, roleHint); }
    saveList(true);
  }

  /* ---------- catalog ---------- */

  var state = { q: "", cat: "", building: "", brand: "" };

  function specSummary(p) {
    if (!p.specs) return "";
    var k = Object.keys(p.specs)[0];
    return k ? k + ": " + p.specs[k] : "";
  }

  function matches(p) {
    if (state.cat && p.category !== state.cat && !((state.cat === "humid" || state.cat === "evap") && (p.shape === "evap" || p.shape === "atomizer"))) return false;
    if (state.building && p.buildings.indexOf(state.building) < 0) return false;
    if (state.brand && p.brand !== state.brand) return false;
    if (state.q) {
      var specText = p.specs ? Object.keys(p.specs).map(function (k) { return k + " " + p.specs[k]; }).join(" ") : "";
      var hay = (p.name + " " + brands[p.brand].name + " " + cats[p.category].name + " " + p.summary + " " + p.features.join(" ") + " " + specText).toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
    }
    return true;
  }

  function card(p) {
    var sys = D.systemTags(p), sp = specSummary(p);
    return '<article class="card">' +
      '<button class="card-open" type="button" data-product="' + p.id + '" aria-label="' + brands[p.brand].name + " " + p.name + ': details">' +
      D.media(p) + "</button>" +
      '<div class="card-body">' +
      '<p class="card-meta">' + cats[p.category].name + "</p>" +
      '<h3><span class="card-brand">' + brands[p.brand].name + "</span> " + p.name + (p.badge ? ' <span class="badge">' + p.badge + "</span>" : "") + "</h3>" +
      D.systemBadgesHtml(sys) +
      "<p>" + p.summary + "</p>" +
      (sp ? '<p class="card-spec">' + sp + "</p>" : "") +
      '<div class="card-actions"><button class="link" type="button" data-product="' + p.id + '">View details</button>' +
      '<button class="add" type="button" data-add="' + p.id + '"></button></div>' +
      "</div></article>";
  }

  function renderCatalog() {
    var found = D.products.filter(matches);
    var isFiltered = Boolean(state.q || state.cat || state.building || state.brand);
    $("#productGrid").innerHTML = found.length ? found.map(card).join("") :
      '<p class="empty">No products match these filters. Clear a filter, or call DMR at ' + D.company.phone + " and we will find what you need.</p>";
    $("#resultCount").textContent = isFiltered
      ? ("Showing " + found.length + " of " + D.products.length + " product lines")
      : (D.products.length + " product lines across " + D.brands.length + " manufacturers");
    $("#clearFilters").hidden = !isFiltered;
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
    if (scroll) D.showPage("products");
  };

  function catProductCount(catId) {
    return D.products.filter(function (p) {
      return p.category === catId || ((catId === "humid" || catId === "evap") && (p.shape === "evap" || p.shape === "atomizer"));
    }).length;
  }

  function initCatalog() {
    $("#catChips").innerHTML = '<button type="button" data-cat="">All systems <span class="idx">' + D.products.length + "</span></button>" + D.categories.map(function (c) {
      return '<button type="button" data-cat="' + c.id + '">' + c.name + ' <span class="idx">' + catProductCount(c.id) + "</span></button>";
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
      var count = D.products.filter(function (p) { return p.brand === b.id; }).length;
      return '<button class="brand-tile" type="button" data-brand="' + b.id + '">' +
        '<span class="brand-logo">' + (b.logo ? '<img src="' + b.logo + '" alt="">' : '<span class="brand-word">' + b.name + "</span>") + "</span>" +
        '<span class="brand-name">' + b.name + "</span>" +
        '<span class="brand-foot">' + count + (count === 1 ? " product line" : " product lines") + "</span>" +
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
      var subLabel = p ? (brands[p.brand].name + " · " + p.name) : "Field installation";
      return '<figure class="shot' + (g.size === "wide" ? " wide" : "") + '">' + D.media(p || g, subLabel) +
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
  function shotHtml(x, alt, p) {
    return x.src ? '<img class="media" src="' + x.src + '" alt="' + (x.caption || alt) + '">' : D.media({ photo: null, category: p && p.category }, x.caption);
  }
  function galleryHtml(p) {
    var list = shots(p), name = brands[p.brand].name + " " + p.name;
    return '<div class="pgal" data-gallery="' + p.id + '" data-at="0">' +
      '<div class="pgal-main">' + shotHtml(list[0], name, p) + "</div>" +
      (list.length > 1 ? '<div class="pgal-bar"><button type="button" class="pgal-nav" data-shot-step="-1" aria-label="Previous photo">‹</button>' +
        '<p class="pgal-cap">' + (list[0].caption || "") + "</p>" +
        '<button type="button" class="pgal-nav" data-shot-step="1" aria-label="Next photo">›</button></div>' +
        '<div class="pgal-thumbs">' + list.map(function (x, i) {
          return '<button type="button" data-shot="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + (x.caption ? ": " + x.caption : "") + '">' + shotHtml(x, name, p) + "</button>";
        }).join("") + "</div>" : (list[0].caption ? '<p class="pgal-cap">' + list[0].caption + "</p>" : "")) +
      "</div>";
  }
  function showShot(el, i) {
    var p = products[el.dataset.gallery], list = shots(p);
    i = (i + list.length) % list.length;
    el.dataset.at = i;
    el.querySelector(".pgal-main").innerHTML = shotHtml(list[i], p.name, p);
    el.querySelector(".pgal-cap").textContent = list[i].caption || "";
    el.querySelectorAll("[data-shot]").forEach(function (b) { b.setAttribute("aria-pressed", Number(b.dataset.shot) === i); });
  }

  /* ---------- product dialog ---------- */

  var pd = $("#productDialog");
  D.openProduct = function (id) {
    var p = products[id];
    if (!p) return;
    var b = brands[p.brand];
    var stops = [], peers = {};
    D.buildings.forEach(function (bl) {
      bl.stops.forEach(function (s) {
        if (s.products.indexOf(id) > -1) {
          var idx = 0;
          s.equipment.forEach(function (eq, i) {
            if (eq.product === id || eq.also.some(function (a) { return a.product === id; })) {
              idx = i;
              peers[eq.product] = true;
              eq.also.forEach(function (a) { peers[a.product] = true; });
            }
          });
          stops.push({ b: bl, s: s, item: idx });
        }
      });
    });
    function relScore(x) {
      var sameShape = p.shape && p.shape !== "box" && x.shape === p.shape ? 4 : 0;
      var sameCat = x.category === p.category ? 2 : 0;
      var peer = peers[x.id] && (sameShape || sameCat || x.category !== "controls") ? 3 : 0;
      if (!sameShape && !sameCat && !peer) return 0;
      return sameShape + peer + sameCat + (x.brand !== p.brand ? 1 : 0);
    }
    var related = D.products.filter(function (x) { return x.id !== id && relScore(x) > 0; }).sort(function (a, c) {
      return relScore(c) - relScore(a);
    }).slice(0, 6);
    var relTitle = related.every(function (r) { return r.category === p.category; }) ? "More in " + cats[p.category].name : "Related products";
    pd.innerHTML =
      '<div class="sheet-head">' +
        '<div class="sheet-head-titles">' +
          '<p class="card-meta">' + cats[p.category].name + "</p>" +
          '<h2 id="pdTitle"><span class="card-brand">' + b.name + "</span> " + p.name + (p.badge ? ' <span class="badge">' + p.badge + "</span>" : "") + "</h2>" +
        '</div>' +
        '<form method="dialog"><button class="close" aria-label="Close">Close</button></form>' +
      '</div>' +
      '<div class="sheet-body">' +
        '<div class="sheet-grid"><div>' + galleryHtml(p) + "</div><div>" +
        D.systemBadgesHtml(D.systemTags(p), "System type:") +
        '<p class="lede-sm">' + p.summary + "</p>" +
        (p.features.length ? "<h3>Key points</h3><ul class='ticks'>" + p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>" : "") +
        (p.specs ? "<h3>Specifications</h3><dl class='specs'>" + Object.keys(p.specs).map(function (k) { return "<dt>" + k + "</dt><dd>" + p.specs[k] + "</dd>"; }).join("") + "</dl>" : "") +
        (p.links && p.links.length ? "<h3>Documents and links</h3><ul class='doc-links'>" + p.links.map(function (l) { return '<li><a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + "</a></li>"; }).join("") + "</ul>" : "") +
        (p.buildings.length ? "<h3>Used in</h3><p class='tags'>" + p.buildings.map(function (m) { return "<span>" + buildings[m].name + "</span>"; }).join("") + "</p>" : "") +
        (stops.length ? "<h3>See it in the walkthrough</h3><p class='tags'>" + stops.map(function (x) {
          return '<button type="button" class="tag-btn" data-stop="' + x.s.id + '" data-item="' + x.item + '">' + x.b.name + ": " + x.s.title + "</button>";
        }).join("") + "</p>" : "") +
        "</div></div>" +
        (related.length ? '<div class="related"><h3>' + relTitle + "</h3><div class='related-row'>" + related.map(function (r) {
          return '<button type="button" data-product="' + r.id + '"><strong>' + brands[r.brand].name + "</strong>" + r.name + "</button>";
        }).join("") + "</div></div>" : "") +
      '</div>' +
      '<div class="sheet-foot">' +
        '<div class="sheet-actions"><button class="btn btn-primary add" type="button" data-add="' + p.id + '"></button>' +
        '<a class="btn btn-line" href="mailto:' + D.company.email + "?subject=" + encodeURIComponent("Inquiry: " + b.name + " " + p.name) + '">Ask DMR about this</a>' +
        (b.website ? '<a class="btn btn-line" href="' + b.website + '" target="_blank" rel="noopener">Visit ' + b.name + " ↗</a>" : "") +
        '</div>' +
      '</div>';
    pd.querySelectorAll("[data-add]").forEach(syncAddBtn);
    if (!pd.open) pd.showModal();
    var bodyEl = pd.querySelector(".sheet-body");
    if (bodyEl) bodyEl.scrollTop = 0;
  };

  /* ---------- project list & Basis-of-Design schedule dialog ---------- */

  var ld = $("#listDialog");
  function escAttr(s) { return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  function buildScheduleText() {
    var pr = meta.proj;
    var lines = [
      "Hello DMR,",
      "",
      "Please review the following Basis-of-Design equipment schedule:",
      "",
      "Project Name: " + (pr.name || "(Not specified)"),
      "Location: " + (pr.location || "(Not specified)"),
      "Engineer / Firm: " + (pr.engineer || "(Not specified)"),
      "Project Phase / Target Date: " + (pr.phase || "(Not specified)"),
      "",
      "EQUIPMENT SCHEDULE (" + list.length + " items):",
      "------------------------------------------------------------"
    ];
    list.forEach(function (id, idx) {
      var p = products[id], m = ensureItemMeta(id), sys = D.systemTags(p).map(function (t) { return t.label; }).join(" / ");
      var sp = specSummary(p);
      lines.push((m.tag || defaultTag(id, idx)) + " (Qty: " + (m.qty || 1) + ") — " + brands[p.brand].name + " · " + p.name);
      lines.push("  Category: " + cats[p.category].name + (sys ? " | System: " + sys : ""));
      if (m.role) lines.push("  Application / Role: " + m.role);
      if (sp) lines.push("  Basis Spec: " + sp);
      if (m.notes) lines.push("  Design Notes (CFM / Capacity / Conditions): " + m.notes);
      lines.push("");
    });
    return lines.join("\n");
  }

  function syncMailLink() {
    var mailBtn = $("#scheduleMailBtn", ld);
    if (!mailBtn) return;
    var subj = "Basis-of-Design Schedule" + (meta.proj.name ? ": " + meta.proj.name : " Inquiry");
    mailBtn.href = "mailto:" + D.company.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(buildScheduleText());
  }

  function exportScheduleCsv() {
    var rows = [["Tag", "Qty", "Category", "Manufacturer", "Product Line", "System Type", "Application / Role", "Key Specification", "Design Notes", "Project Name", "Location", "Engineer / Firm"]];
    list.forEach(function (id, idx) {
      var p = products[id], m = ensureItemMeta(id), sys = D.systemTags(p).map(function (t) { return t.label; }).join(" / ");
      rows.push([
        m.tag || defaultTag(id, idx),
        String(m.qty || 1),
        cats[p.category].name,
        brands[p.brand].name,
        p.name,
        sys,
        m.role || "",
        specSummary(p),
        m.notes || "",
        meta.proj.name || "",
        meta.proj.location || "",
        meta.proj.engineer || ""
      ]);
    });
    var csv = "\uFEFF" + rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c || "").replace(/"/g, '""') + '"'; }).join(",");
    }).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var a = document.createElement("a");
    var slug = (meta.proj.name || "dmr-project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "dmr-project";
    a.href = URL.createObjectURL(blob);
    a.download = slug + "-equipment-schedule.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function renderList() {
    var pr = meta.proj;
    ld.innerHTML =
      '<div class="sheet-head">' +
        '<div class="sheet-head-titles">' +
          '<p class="card-meta">Engineering Schedule Builder</p>' +
          '<h2 id="ldTitle">Project Basis-of-Design Schedule</h2>' +
        '</div>' +
        '<form method="dialog"><button class="close" aria-label="Close">Close</button></form>' +
      '</div>' +
      '<div class="sheet-body">' +
      (list.length
        ? '<p class="lede-sm">Assign equipment tags, quantities and design notes, then export a CSV schedule or send directly to a DMR sales engineer.</p>' +
          '<div class="sched-proj">' +
            '<label><span>Project name</span><input type="text" data-proj="name" placeholder="e.g., Bethesda Medical Center Wing B" value="' + escAttr(pr.name) + '"></label>' +
            '<label><span>Location (City / State)</span><input type="text" data-proj="location" placeholder="e.g., Bethesda, MD" value="' + escAttr(pr.location) + '"></label>' +
            '<label><span>Engineer / Firm</span><input type="text" data-proj="engineer" placeholder="e.g., Smith MEP Engineers" value="' + escAttr(pr.engineer) + '"></label>' +
            '<label><span>Design phase / Schedule</span><input type="text" data-proj="phase" placeholder="e.g., DD / Q3 Bid" value="' + escAttr(pr.phase) + '"></label>' +
          '</div>' +
          '<ul class="pl sched-list">' + list.map(function (id, idx) {
            var p = products[id], m = ensureItemMeta(id), sys = D.systemTags(p), sp = specSummary(p);
            return '<li class="sched-item" data-sched-id="' + id + '">' +
              '<div class="sched-head">' +
                '<div class="sched-title">' +
                  '<span class="card-meta">' + cats[p.category].name + "</span>" +
                  '<button type="button" class="link sched-prod" data-product="' + id + '"><strong>' + brands[p.brand].name + "</strong> · " + p.name + "</button>" +
                  D.systemBadgesHtml(sys) +
                  (sp ? '<p class="sched-spec">' + sp + "</p>" : "") +
                '</div>' +
                '<button class="link sched-rm" type="button" data-remove="' + id + '">Remove</button>' +
              '</div>' +
              '<div class="sched-fields">' +
                '<label class="sched-tag"><span>Tag / Mark</span><input type="text" data-item-field="tag" value="' + escAttr(m.tag || defaultTag(id, idx)) + '" placeholder="AHU-1"></label>' +
                '<label class="sched-qty"><span>Qty</span><input type="number" min="1" max="999" data-item-field="qty" value="' + escAttr(m.qty || 1) + '"></label>' +
                '<label class="sched-role"><span>Building application / Role</span><input type="text" data-item-field="role" value="' + escAttr(m.role) + '" placeholder="e.g., Rooftop 100% OA supply AHU"></label>' +
                '<label class="sched-notes"><span>Design conditions / Notes</span><input type="text" data-item-field="notes" value="' + escAttr(m.notes) + '" placeholder="e.g., 25,000 CFM, 45°F CHW, N+1 FANWALL"></label>' +
              '</div>' +
            "</li>";
          }).join("") + "</ul>"
        : '<p class="lede-sm">Your project schedule is empty. Add equipment from the 3D building walkthrough or the product catalog to build a Basis-of-Design schedule.</p>') +
      '</div>' +
      (list.length
        ? '<div class="sheet-foot"><div class="sheet-actions">' +
            '<a class="btn btn-primary" id="scheduleMailBtn" href="#">Email schedule to DMR</a>' +
            '<button class="btn btn-line" type="button" data-export-csv>Download CSV schedule</button>' +
            '<button class="btn btn-line" type="button" data-copy-schedule>Copy schedule text</button>' +
            '<button class="btn btn-line" type="button" data-clear>Clear list</button>' +
          "</div></div>"
        : "");
    syncMailLink();
  }
  function openList() { renderList(); if (!ld.open) ld.showModal(); }

  ld.addEventListener("input", function (e) {
    var t = e.target;
    if (t.dataset.proj) {
      meta.proj[t.dataset.proj] = t.value;
      saveMeta();
      syncMailLink();
    } else if (t.dataset.itemField) {
      var row = t.closest("[data-sched-id]");
      if (row) {
        var m = ensureItemMeta(row.dataset.schedId);
        m[t.dataset.itemField] = t.dataset.itemField === "qty" ? Math.max(1, parseInt(t.value, 10) || 1) : t.value;
        saveMeta();
        syncMailLink();
      }
    }
  });

  /* ---------- global events ---------- */

  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-add]"))) { toggleList(t.dataset.add, t.dataset.role || ""); return; }
    if ((t = e.target.closest("[data-remove]"))) { toggleList(t.dataset.remove); renderList(); return; }
    if (e.target.closest("[data-clear]")) {
      if (!list.length || !confirm("Clear all items from your project schedule?")) return;
      list = []; saveList(true); renderList(); return;
    }
    if (e.target.closest("[data-export-csv]")) { exportScheduleCsv(); return; }
    if ((t = e.target.closest("[data-copy-schedule]"))) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(buildScheduleText()).then(function () {
          var orig = t.textContent;
          t.textContent = "Copied!";
          setTimeout(function () { t.textContent = orig; }, 1800);
        });
      }
      return;
    }
    if ((t = e.target.closest("[data-shot]"))) { showShot(t.closest(".pgal"), Number(t.dataset.shot)); return; }
    if ((t = e.target.closest("[data-shot-step]"))) { var gal = t.closest(".pgal"); showShot(gal, Number(gal.dataset.at) + Number(t.dataset.shotStep)); return; }
    if ((t = e.target.closest("[data-product]"))) { D.openProduct(t.dataset.product); return; }
    if ((t = e.target.closest("dialog [data-stop]"))) { pd.close(); D.goToStop(t.dataset.stop, true, Number(t.dataset.item) || 0); return; }
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

  /* ---------- pages ---------- */

  // Each primary-nav tab is its own page: only one section shows at a time.
  // The URL hash names the page (#products, #gallery …); no hash is the home page.
  var pages = {}, curPage = null;
  document.querySelectorAll("[data-page]").forEach(function (sec) { pages[sec.dataset.page] = sec; });
  var navLinks = {};
  nav.querySelectorAll("a[href^='#']").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });

  function setPage(id) {
    if (!pages[id]) id = "home";
    if (id === curPage) return;
    curPage = id;
    Object.keys(pages).forEach(function (k) { pages[k].hidden = k !== id; });
    Object.keys(navLinks).forEach(function (k) {
      var on = k === id;
      navLinks[k].classList.toggle("is-active", on);
      if (on) navLinks[k].setAttribute("aria-current", "page");
      else navLinks[k].removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: "instant" });
    var h = pages[id].querySelector("h1, h2");
    document.title = (id === "home" || !h ? "" : (navLinks[id] ? navLinks[id].textContent : h.textContent) + " — ") + "DMR Associates — Product Showcase";
  }
  function pageFromHash() {
    var id = location.hash.slice(1);
    // #product/<id> opens a product window over whichever page is showing.
    if (/^product\//.test(id)) return curPage || "home";
    return id === "top" ? "home" : id;
  }
  D.showPage = function (id) {
    if (id === curPage) { window.scrollTo({ top: 0, behavior: "instant" }); return; }
    if (location.hash !== "#" + id) location.hash = id;
    else setPage(id);
  };
  window.addEventListener("hashchange", function () { setPage(pageFromHash()); });
  setPage(pageFromHash());

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
