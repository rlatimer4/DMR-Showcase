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
    if (cat === "hydronic" || cat === "heaters" || cat === "electric" || cat === "heatpump" || cat === "vrf" || cat === "packaged" || cat === "vav" || cat === "fancoil" || cat === "blowercoil") {
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
  var list = [], meta = { proj: { name: "", location: "", engineer: "", contactName: "", contactEmail: "", contactPhone: "", phase: "", additionalInfo: "" }, items: {} };
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
    recovery: "ERV", heatpump: "ASHP", vrf: "VRF", vav: "VAV", fancoil: "FCU", blowercoil: "BCU", coils: "CL",
    hydronic: "HYD", electric: "EH", heaters: "UH", makeup: "MUA", humid: "HUM",
    dehum: "DH", iaq: "UV", evap: "EVAP", controls: "CTL"
  };
  function defaultTag(id, idx) {
    var p = products[id];
    var pre = (p && TAG_PREFIX[p.category]) || "EQ";
    return pre + "-" + (idx + 1);
  }
  function ensureItemMeta(id, roleHint, specCtx) {
    var idx = list.indexOf(id);
    var m = meta.items[id];
    if (!m) {
      m = meta.items[id] = {
        tag: defaultTag(id, idx > -1 ? idx : list.length),
        qty: 1,
        role: roleHint || "",
        notes: "",
        bod: "",
        reqs: [],
        specText: "",
        entryId: ""
      };
    } else {
      if (!Array.isArray(m.reqs)) m.reqs = [];
      if (typeof m.bod !== "string") m.bod = "";
      if (typeof m.specText !== "string") m.specText = "";
      if (typeof m.entryId !== "string") m.entryId = "";
    }
    if (roleHint && (!m.role || (specCtx && specCtx.fromSpecMatch))) m.role = roleHint;
    if (specCtx && specCtx.fromSpecMatch) {
      m.bod = specCtx.bod || "";
      m.reqs = Array.isArray(specCtx.reqs) ? specCtx.reqs.slice() : [];
      m.specText = specCtx.specText || "";
      m.entryId = specCtx.entryId || "";
    } else if (specCtx) {
      if (specCtx.bod) m.bod = specCtx.bod;
      if (Array.isArray(specCtx.reqs) && specCtx.reqs.length) m.reqs = specCtx.reqs.slice();
      if (specCtx.specText) m.specText = specCtx.specText;
      if (specCtx.entryId) m.entryId = specCtx.entryId;
    }
    return m;
  }
  function saveMeta() {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch (e) { /* storage unavailable */ }
  }
  function syncSpecCartUI(animate) {
    var cb = $("#xrefCartBtn");
    if (cb) {
      cb.classList.toggle("is-nonempty", list.length > 0);
      cb.textContent = list.length > 0 ? "Spec Match Cart ✓" : "Spec Match Cart";
      if (animate) {
        cb.classList.remove("bump");
        void cb.offsetWidth;
        cb.classList.add("bump");
        setTimeout(function () { cb.classList.remove("bump"); }, 240);
      }
    }
    var bar = $("#xrefCartBar"), chips = $("#xrefCartChips");
    if (bar && chips) {
      bar.hidden = list.length === 0;
      chips.innerHTML = list.map(function (id) {
        var p = products[id];
        if (!p) return "";
        var b = brands[p.brand];
        return '<span class="xref-cart-chip">' +
          '<button type="button" class="link xref-cart-chip-name" data-sc-open>' + escHtml((b ? b.name + " · " : "") + p.name) + "</button>" +
          '<button type="button" class="xref-cart-chip-x" data-cart-remove="' + escAttr(id) + '" aria-label="Remove ' + escAttr(p.name) + ' from cart">&#215;</button>' +
        "</span>";
      }).join("");
    }
    document.querySelectorAll("[data-cart-bundle]").forEach(function (btn) {
      var pid = btn.dataset.cartPid;
      var on = Boolean(pid && list.indexOf(pid) > -1);
      btn.setAttribute("aria-pressed", on);
      btn.textContent = on ? "✓ In Spec Cart" : "+ Add Spec Match to Cart";
      btn.classList.toggle("btn-primary", !on);
      btn.classList.toggle("btn-line", on);
    });
  }
  function saveList(animate) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
    saveMeta();
    var lb = $("#listBtn");
    if (lb) {
      lb.classList.toggle("is-nonempty", list.length > 0);
      lb.textContent = list.length > 0 ? "Project list ✓" : "Project list";
      if (animate) {
        lb.classList.remove("bump");
        void lb.offsetWidth;
        lb.classList.add("bump");
        setTimeout(function () { lb.classList.remove("bump"); }, 240);
      }
    }
    document.querySelectorAll("[data-add]").forEach(syncAddBtn);
    syncSpecCartUI(animate);
  }
  function syncAddBtn(btn) {
    var on = list.indexOf(btn.dataset.add) > -1;
    btn.setAttribute("aria-pressed", on);
    if (btn.closest("#spec-match")) {
      btn.textContent = on ? "✓ In Spec Cart" : "+ Add to Spec Cart";
    } else {
      btn.textContent = btn.classList.contains("add-mini") ? (on ? "✓ In project list" : "+ Add to project list") : (on ? "✓ In project list" : "Add to project list");
    }
  }
  D.syncAddBtns = function (root) {
    (root || document).querySelectorAll("[data-add]").forEach(syncAddBtn);
    syncSpecCartUI(false);
  };
  function toggleList(id, roleHint, specCtx) {
    if (!id || !products[id]) return;
    var i = list.indexOf(id);
    if (i > -1) list.splice(i, 1);
    else { list.push(id); ensureItemMeta(id, roleHint, specCtx); }
    saveList(true);
  }
  D.addZoneToList = function (stop) {
    if (!stop || !stop.equipment) return;
    stop.equipment.forEach(function (eq) {
      if (!products[eq.product]) return;
      var roleCtx = (stop.building ? stop.building.name + " — " : "") + (eq.role || products[eq.product].name);
      if (list.indexOf(eq.product) < 0) {
        list.push(eq.product);
        ensureItemMeta(eq.product, roleCtx);
      }
    });
    saveList(true);
  };

  /* ---------- catalog ---------- */

  var state = { q: "", cat: "", building: "", brand: "", system: "", app: "" };
  var RETROFIT_IDS = {
    "huntair-knockdown": true, "temtrol-knockdown": true, "ventrol-knockdown": true,
    "huntair-fanwall": true, "temtrol-fanwall": true, "governair-fanwall": true, "ventrol-fanwall": true,
    "mammoth-vcube-slim": true, "mammoth-ultraline": true,
    "cooney-freeze-block": true, "cooney-smart-coil": true,
    "envirotec-sgx": true, "envirotec-rft": true, "envirotec-pneumatic": true,
    "gree-mtac": true, "gree-ptac": true, "gree-ttw": true, "uvr-rlm": true, "uvr-uvk": true
  };

  function specSummary(p) {
    if (!p.specs) return "";
    var k = Object.keys(p.specs)[0];
    return k ? k + ": " + p.specs[k] : "";
  }

  function matchesApp(p, app) {
    if (!app) return true;
    if (app === "retrofit") {
      if (RETROFIT_IDS[p.id]) return true;
      var txt = (p.summary + " " + p.features.join(" ")).toLowerCase();
      return /retrofit|replacement|knockdown|existing curb|existing opening/.test(txt);
    }
    if (app === "critical") {
      return ["critical", "datacenter", "iaq", "humid", "dehum"].indexOf(p.category) > -1 ||
        p.buildings.some(function (b) { return ["hospital", "laboratory", "pharma-manufacturing", "data-center"].indexOf(b) > -1; });
    }
    if (app === "decarb") {
      return ["recovery", "heatpump", "vrf", "electric"].indexOf(p.category) > -1 || p.id === "mammoth-vcube" || p.id === "mammoth-vcube-slim";
    }
    return true;
  }

  function matches(p) {
    if (state.cat && p.category !== state.cat && !((state.cat === "humid" || state.cat === "evap") && (p.shape === "evap" || p.shape === "atomizer"))) return false;
    if (state.building && p.buildings.indexOf(state.building) < 0) return false;
    if (state.brand && p.brand !== state.brand) return false;
    if (state.system) {
      var stags = D.systemTags(p);
      if (!stags.some(function (t) { return t.id === state.system || (state.system === "condenser" && t.id === "geo"); })) return false;
    }
    if (state.app && !matchesApp(p, state.app)) return false;
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
      '<div class="card-actions"><div class="card-links"><button class="link" type="button" data-product="' + p.id + '">View details</button>' +
      '<button class="link cmp-btn" type="button" data-compare="' + p.id + '">Compare</button></div>' +
      '<button class="add" type="button" data-add="' + p.id + '"></button></div>' +
      "</div></article>";
  }

  function renderCatalog() {
    var found = D.products.filter(matches);
    var isFiltered = Boolean(state.q || state.cat || state.building || state.brand || state.system || state.app);
    $("#productGrid").innerHTML = found.length ? found.map(card).join("") :
      '<p class="empty">No products match these filters. Clear a filter, or call DMR at ' + D.company.phone + " and we will find what you need.</p>";
    $("#resultCount").textContent = isFiltered ? "Filtered view" : "";
    $("#clearFilters").hidden = !isFiltered;
    $("#catBlurb").textContent = state.cat && cats[state.cat] ? cats[state.cat].blurb : (state.brand && brands[state.brand] ? brands[state.brand].blurb : "");
    document.querySelectorAll("#catChips button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.cat === state.cat);
    });
    $("#fMarket").value = state.building;
    $("#fBrand").value = state.brand;
    $("#fSystem").value = state.system;
    $("#fApp").value = state.app;
    if ($("#q").value !== state.q) $("#q").value = state.q;
    document.querySelectorAll("#productGrid [data-add]").forEach(syncAddBtn);
    syncCompareUI();
  }

  D.filterCatalog = function (patch, scroll) {
    state = Object.assign({ q: "", cat: "", building: "", brand: "", system: "", app: "" }, patch);
    renderCatalog();
    if (scroll) D.showPage("products");
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
    $("#fSystem").addEventListener("change", function (e) { state.system = e.target.value; renderCatalog(); });
    $("#fApp").addEventListener("change", function (e) { state.app = e.target.value; renderCatalog(); });
    $("#clearFilters").addEventListener("click", function () { D.filterCatalog({}); });
    renderCatalog();
  }

  /* ---------- manufacturers ---------- */

  function initBrands() {
    $("#brandGrid").innerHTML = D.brands.map(function (b) {
      return '<button class="brand-tile" type="button" data-brand="' + b.id + '">' +
        '<span class="brand-logo">' + (b.logo ? '<img src="' + b.logo + '" alt="">' : '<span class="brand-word">' + b.name + "</span>") + "</span>" +
        '<span class="brand-name">' + b.name + "</span>" +
        '<span class="brand-foot">' + b.family + "</span>" +
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
      var imgHtml = D.media(g.photo ? { photo: g.photo, category: p && p.category } : (p || g), subLabel);
      return '<figure class="shot' + (g.size === "wide" ? " wide" : "") + '">' +
        (p ? '<button type="button" class="shot-open" data-product="' + p.id + '" aria-label="' + escAttr(subLabel + " — " + g.caption) + '">' + imgHtml + "</button>" : imgHtml) +
        "<figcaption>" + g.caption + (p ? ' · <button class="link" type="button" data-product="' + p.id + '">' + brands[p.brand].name + " " + p.name + "</button>" : "") + "</figcaption></figure>";
    }).join("");
  }

  /* ---------- basis-of-design spec match (CSV-driven) ---------- */

  var xrefState = { mode: "idle", mfr: "", mfrKey: "", q: "", selectedItem: null, level1: "", subcats: [], reqs: [], sliders: {}, selects: {}, reqScopeKey: "" };
  var xrefLookup = {};
  var xrefMfrList = [];
  var xrefMfrMap = {};
  var xrefCatOrder = [];
  var xrefCatIndex = {};
  var xrefActiveSug = -1;
  var XREF_MFR_ALIASES = {
    "johnson controls": "jci",
    "mcquay": "daikin",
    "daikin applied": "daikin",
    "daikin vrv": "daikin",
    "liebert": "vertiv",
    "price": "price industries",
    "cambridge": "cambridge air solutions",
    "cambridge air": "cambridge air solutions",
    "climate by design": "cdi",
    "international environmental": "iec",
    "semco": "semco",
    "flaktgroup": "fläktgroup semco",
    "flakt": "fläktgroup semco"
  };

  function escHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function normAlnum(s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function editDist(a, b) {
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 2) return 99;
    var dp = [];
    for (var i = 0; i <= la; i++) dp[i] = [i];
    for (var j = 1; j <= lb; j++) dp[0][j] = j;
    for (i = 1; i <= la; i++) {
      for (j = 1; j <= lb; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[la][lb];
  }

  function isSubseq(needle, hay) {
    if (!needle || needle.length < 3 || needle.length > hay.length) return false;
    var ni = 0;
    for (var hi = 0; hi < hay.length && ni < needle.length; hi++) {
      if (hay.charAt(hi) === needle.charAt(ni)) ni++;
    }
    return ni === needle.length;
  }

  function buildXrefIndexes() {
    xrefLookup = {};
    xrefMfrMap = {};
    xrefMfrList = [];
    xrefCatOrder = [];
    xrefCatIndex = {};

    (D.crossref || []).forEach(function (entry) {
      xrefLookup[entry.id] = entry;
      entry.reqMap = {};

      (entry.modelCatalog || []).forEach(function (item) {
        var key = item.mfr.toLowerCase().trim();
        if (!key) return;
        if (!xrefMfrMap[key]) {
          xrefMfrMap[key] = { key: key, name: item.mfr, items: [] };
          xrefMfrList.push(xrefMfrMap[key]);
        }
        var dup = xrefMfrMap[key].items.some(function (ex) {
          return ex.entryId === item.entryId && ex.model.toLowerCase() === item.model.toLowerCase();
        });
        if (!dup) xrefMfrMap[key].items.push(item);
      });

      var l1 = entry.level1;
      if (l1) {
        if (!xrefCatIndex[l1]) {
          xrefCatIndex[l1] = { subcats: [], entries: [], groups: [], groupMap: {}, sliders: [], sliderMap: {}, selects: [], selectMap: {}, reqByKey: {} };
          xrefCatOrder.push(l1);
        }
        var rec = xrefCatIndex[l1];
        rec.entries.push(entry);
        if (entry.level2 && rec.subcats.indexOf(entry.level2) < 0) rec.subcats.push(entry.level2);

        (entry.reqCheckboxes || []).forEach(function (rc) {
          entry.reqMap[rc.key] = true;
          if (rc.group.indexOf("SLIDER:") === 0) {
            var sName = rc.group.replace(/^SLIDER:\s*/i, "").trim();
            var sl = rec.sliderMap[sName];
            if (!sl) {
              sl = { name: sName, steps: [], stepMap: {} };
              rec.sliderMap[sName] = sl;
              rec.sliders.push(sl);
            }
            var st = sl.stepMap[rc.key];
            if (!st) {
              st = { key: rc.key, sliderName: sName, label: rc.label, prodMap: {}, entryMap: {} };
              sl.stepMap[rc.key] = st;
              sl.steps.push(st);
            }
            st.entryMap[entry.id] = true;
            (rc.products || []).forEach(function (pid) {
              if (products[pid]) st.prodMap[pid] = true;
            });
          } else if (rc.group.indexOf("SELECT:") === 0) {
            var selName = rc.group.replace(/^SELECT:\s*/i, "").trim();
            var selObj = rec.selectMap[selName];
            if (!selObj) {
              selObj = { name: selName, options: [], optMap: {} };
              rec.selectMap[selName] = selObj;
              rec.selects.push(selObj);
            }
            var sOpt = selObj.optMap[rc.key];
            if (!sOpt) {
              sOpt = { key: rc.key, selectName: selName, label: rc.label, prodMap: {}, entryMap: {} };
              selObj.optMap[rc.key] = sOpt;
              selObj.options.push(sOpt);
              rec.reqByKey[rc.key] = sOpt;
            }
            sOpt.entryMap[entry.id] = true;
            (rc.products || []).forEach(function (pid) {
              if (products[pid]) sOpt.prodMap[pid] = true;
            });
          } else {
            var grp = rec.groupMap[rc.group];
            if (!grp) {
              grp = { group: rc.group, options: [], optMap: {} };
              rec.groupMap[rc.group] = grp;
              rec.groups.push(grp);
            }
            var opt = grp.optMap[rc.key];
            if (!opt) {
              opt = { key: rc.key, group: rc.group, label: rc.label, prodMap: {}, entryMap: {} };
              grp.optMap[rc.key] = opt;
              grp.options.push(opt);
              rec.reqByKey[rc.key] = opt;
            }
            opt.entryMap[entry.id] = true;
            (rc.products || []).forEach(function (pid) {
              if (products[pid]) opt.prodMap[pid] = true;
            });
          }
        });
      }
    });
  }

  // Strictly returns at most ONE canonical manufacturer ONLY when the user's input
  // matches an exact alias/name or uniquely identifies a single manufacturer (never reveals extra competitors).
  function findUniqueMfr(raw) {
    var s = String(raw || "").toLowerCase().trim();
    if (!s) return null;
    if (XREF_MFR_ALIASES[s] && xrefMfrMap[XREF_MFR_ALIASES[s]]) {
      return xrefMfrMap[XREF_MFR_ALIASES[s]];
    }
    if (xrefMfrMap[s]) return xrefMfrMap[s];
    if (s.length < 3) return null;

    var prefixMatches = xrefMfrList.filter(function (m) {
      var n = m.name.toLowerCase();
      if (n.indexOf(s) === 0) return true;
      var words = n.split(/[\s\/-]+/);
      return words.some(function (w) { return w.length >= 3 && w.indexOf(s) === 0; });
    });
    if (prefixMatches.length === 1) return prefixMatches[0];
    if (prefixMatches.length > 1) return null;

    var fuzzyMatches = xrefMfrList.filter(function (m) {
      var n = m.name.toLowerCase();
      var maxD = s.length >= 6 ? 2 : 1;
      if (editDist(s, n) <= maxD) return true;
      return n.split(/[\s\/-]+/).some(function (w) { return w.length >= 4 && editDist(s, w) <= 1; });
    });
    return fuzzyMatches.length === 1 ? fuzzyMatches[0] : null;
  }

  function scoreModelFuzzy(item, q) {
    var qRaw = String(q || "").toLowerCase().trim();
    if (qRaw.length < 2) return 0;
    var qAlnum = normAlnum(qRaw);
    var mRaw = (item.model || "").toLowerCase();
    var mAlnum = normAlnum(mRaw);
    var modelTokens = mRaw.split(/[\s,;()/—–|:.-]+/).filter(Boolean);
    var dRaw = (item.desc || "").toLowerCase();
    var entry = xrefLookup[item.entryId] || {};
    var kRaw = (entry.aliases || []).join(" ").toLowerCase();
    var keyTokens = kRaw.split(/[\s,;()/—–|:.-]+/).filter(Boolean);
    var score = 0;

    if (mRaw === qRaw || (qAlnum && mAlnum === qAlnum)) score += 100;
    else if (mRaw.indexOf(qRaw) === 0) score += 75;
    else if (modelTokens.some(function (mt) { return mt.indexOf(qRaw) === 0; })) score += 60;
    else if (qRaw.length >= 3 && mRaw.indexOf(qRaw) > -1) score += 50;

    if (qAlnum.length >= 3 && mAlnum.indexOf(qAlnum) > -1) score += 45;
    else if (qAlnum.length >= 2 && mAlnum.indexOf(qAlnum) === 0) score += 45;
    else if (qAlnum.length >= 4 && isSubseq(qAlnum, mAlnum)) score += 28;

    if (qRaw.length >= 3 && kRaw.indexOf(qRaw) > -1) score += 26;
    if (qRaw.length >= 4 && dRaw.indexOf(qRaw) > -1) score += 18;

    var qTokens = qRaw.split(/[\s,;()/—–|:.-]+/).filter(function (w) { return w.length >= 2; });
    var hits = 0;
    qTokens.forEach(function (qt) {
      var bestTok = 0;
      if (modelTokens.some(function (mt) { return mt.indexOf(qt) === 0; })) bestTok = 34;
      else if (qt.length >= 3 && mRaw.indexOf(qt) > -1) bestTok = 28;
      else if (keyTokens.some(function (kt) { return kt === qt || (qt.length >= 3 && kt.indexOf(qt) === 0); })) bestTok = 26;
      else {
        modelTokens.forEach(function (mt) {
          if (qt.length >= 4 && mt.length >= 4) {
            var d = editDist(qt, mt);
            if (d <= 2) bestTok = Math.max(bestTok, 42 - d * 7);
          }
        });
        if (!bestTok && qt.length >= 4 && dRaw.indexOf(qt) > -1) bestTok = 14;
      }
      if (bestTok > 0) { hits++; score += bestTok; }
    });
    if (qTokens.length > 1 && hits === qTokens.length) score += 20;
    return score;
  }

  function scoreDirectProduct(p, queryText) {
    var tokens = String(queryText || "").toLowerCase().split(/[\s,;()/—–|:.-]+/).filter(function (w) { return w.length >= 3; });
    if (!tokens.length) return 0;
    var titleLo = (brands[p.brand].name + " " + p.name).toLowerCase();
    var catLo = (cats[p.category] ? cats[p.category].name : "").toLowerCase();
    var specLo = p.specs ? Object.keys(p.specs).map(function (k) { return k + " " + p.specs[k]; }).join(" ").toLowerCase() : "";
    var bodyLo = (p.summary + " " + p.features.join(" ")).toLowerCase();
    var hay = titleLo + " " + catLo + " " + specLo + " " + bodyLo;
    var score = 0, hits = 0;
    tokens.forEach(function (tok) {
      if (hay.indexOf(tok) > -1) {
        hits++;
        if (titleLo.indexOf(tok) > -1) score += 8;
        else if (catLo.indexOf(tok) > -1) score += 5;
        else if (specLo.indexOf(tok) > -1) score += 4;
        else score += 2;
      }
    });
    return hits ? score : 0;
  }

  function passesCatalogCombos(pid, activeReqObjs) {
    if (!activeReqObjs || !activeReqObjs.length) return true;
    var hasKey = {};
    activeReqObjs.forEach(function (ro) { if (ro && ro.key) hasKey[ro.key] = true; });
    var hasCHW = Boolean(hasKey["Coil Options::Chilled Water Coil"]);
    var hasHW = Boolean(hasKey["Coil Options::Hot Water Coil"]);
    var hasEH = Boolean(hasKey["Coil Options::Electric Heat Coil"]);
    var hasDX = Boolean(hasKey["Coil Options::DX Cooling Coil"]);
    var hasSteam = Boolean(hasKey["Coil Options::Steam Heating Coil"]);
    var is2Pipe = Boolean(hasKey["SELECT: Hydronic Piping::2-Pipe Hydronic"]);

    // VAV terminal boxes support one reheat source at a time (either hot water OR electric heat).
    if (/^envirotec-(sdr|sdl|vfr|vfl|crb|crq|cfl|crc|cfl-cc|sgx|rft|pneumatic)$/.test(pid)) {
      if (hasHW && hasEH) return false;
    }

    // 2-Pipe changeover hydronic systems and single-coil perimeter units (PowerKon LT) cannot hold simultaneous CHW + HW coils.
    if ((hasCHW && hasHW) && (is2Pipe || pid === "kampmann-powerkon")) return false;

    // Compact/vertical FCUs cannot pair hot water and electric heat coils simultaneously, and FCU/BCU cabinets cannot mix CHW+DX or Steam+(HW/EH).
    if (/^(envirotec-(hp|hl|vf|vl|vh|cdv|hdd|vb)|kampmann-(venkon|venkon-xl|kadeck|kadius|powerkon))$/.test(pid)) {
      if (hasHW && hasEH && /^envirotec-(hl|vf|vl|vh|cdv)$/.test(pid)) return false;
      if (hasCHW && hasDX) return false;
      if (hasSteam && (hasHW || hasEH)) return false;
    }

    return true;
  }

  // Products listed in a category but tagged on none of its requirements (accessories and
  // complementary equipment such as FANWALL arrays or freeze-protection coils) can't be judged
  // by the requirement filters, so they stay visible as alternates instead of being eliminated.
  function isUnratedInCategory(rec, pid) {
    if (!rec) return false;
    if (!rec.taggedPids) {
      var tagged = {};
      var mark = function (o) { Object.keys(o.prodMap || {}).forEach(function (id) { tagged[id] = true; }); };
      (rec.groups || []).forEach(function (g) { g.options.forEach(mark); });
      (rec.selects || []).forEach(function (s) { s.options.forEach(mark); });
      (rec.sliders || []).forEach(function (sl) { sl.steps.forEach(mark); });
      rec.taggedPids = tagged;
    }
    return !rec.taggedPids[pid];
  }

  function xrefCardHtml(entry, bodCtx, activeReqObjs, level1Rec) {
    var catObj = cats[entry.category];
    var roleHint = bodCtx && bodCtx.mfr
      ? "Match for " + bodCtx.mfr + " (" + bodCtx.model + ")"
      : "Spec match — " + (entry.level3 || entry.equipmentType);
    var reqs = activeReqObjs || [];
    var bodLabelStr = (bodCtx && bodCtx.mfr)
      ? (bodCtx.mfr + (bodCtx.model ? " · " + bodCtx.model : ""))
      : "";
    var reqSummaryStr = reqs.map(function (r) { return r.label; }).join("||");

    var candOrder = [];
    var candSeen = {};
    var origPrimRank = {};
    (entry.primary || []).forEach(function (pid, idx) {
      if (products[pid] && !candSeen[pid]) {
        candSeen[pid] = true;
        candOrder.push(pid);
        origPrimRank[pid] = idx;
      }
    });
    (entry.alternates || []).forEach(function (pid) {
      if (products[pid] && !candSeen[pid]) {
        candSeen[pid] = true;
        candOrder.push(pid);
      }
    });

    if (reqs.length && level1Rec && bodCtx) {
      (level1Rec.entries || []).forEach(function (sib) {
        (sib.primary || []).concat(sib.alternates || []).forEach(function (pid) {
          if (!products[pid] || candSeen[pid]) return;
          var meetsAll = reqs.every(function (ro) { return Boolean(ro.prodMap[pid]); });
          if (meetsAll && passesCatalogCombos(pid, reqs)) {
            candSeen[pid] = true;
            candOrder.push(pid);
          }
        });
      });
    }

    var primaryList = [];
    var altList = [];
    var matchedLabelsById = {};
    var unratedById = {};

    if (reqs.length) {
      var unrated = [];
      var passing = candOrder.filter(function (pid) {
        if (isUnratedInCategory(level1Rec, pid)) {
          unratedById[pid] = true;
          unrated.push(pid);
          return false;
        }
        var meetsAll = reqs.every(function (ro) { return Boolean(ro.prodMap[pid]); });
        if (!meetsAll || !passesCatalogCombos(pid, reqs)) return false;
        matchedLabelsById[pid] = reqs.map(function (ro) { return ro.label; });
        return true;
      });
      passing.forEach(function (pid) {
        if (Object.prototype.hasOwnProperty.call(origPrimRank, pid)) primaryList.push(pid);
        else altList.push(pid);
      });
      if (!primaryList.length && altList.length) {
        primaryList = altList.slice(0, 3);
        altList = altList.slice(3);
      }
      // Unrated accessories never become the headline match, and only show beside a real match.
      if (primaryList.length) altList = altList.concat(unrated);
    } else {
      primaryList = (entry.primary || []).filter(function (id) { return Boolean(products[id]); });
      altList = (entry.alternates || []).filter(function (id) { return Boolean(products[id]); });
    }

    var cmpIds = primaryList.concat(altList).filter(function (id, idx, arr) {
      return products[id] && arr.indexOf(id) === idx;
    }).slice(0, 4);

    var primaryHtml = primaryList.map(function (pid, idx) {
      var p = products[pid];
      if (!p) return "";
      var sp = specSummary(p);
      var hitLabels = matchedLabelsById[pid] || [];
      var reqBadges = hitLabels.length
        ? '<div class="xref-prod-reqs">' + hitLabels.map(function (lbl) {
            return '<span class="xref-req-hit">&#10003; ' + escHtml(lbl) + "</span>";
          }).join("") + "</div>"
        : "";
      var tierBadge = idx === 0
        ? '<span class="xref-tier-badge">Closest DMR Match</span>'
        : '<span class="xref-tier-badge is-recommended">Recommended DMR Option</span>';
      return '<div class="xref-prod-card is-primary">' +
        '<div class="xref-prod-top">' +
          tierBadge +
          '<span class="card-meta">' + escHtml(cats[p.category].name) + "</span>" +
        "</div>" +
        '<h4><span class="card-brand">' + escHtml(brands[p.brand].name) + "</span>" + escHtml(p.name) + "</h4>" +
        D.systemBadgesHtml(D.systemTags(p)) +
        reqBadges +
        (sp ? '<p class="card-spec">' + escHtml(sp) + "</p>" : '<p class="xref-prod-sum">' + escHtml(p.summary) + "</p>") +
        '<div class="xref-prod-acts">' +
          '<div class="card-links">' +
            '<button type="button" class="link" data-product="' + p.id + '">View details</button>' +
            '<button type="button" class="link cmp-btn" data-compare="' + p.id + '">Compare</button>' +
          "</div>" +
          '<button type="button" class="add add-mini" data-add="' + p.id + '" data-role="' + escAttr(roleHint) + '" data-entry-id="' + escAttr(entry.id) + '" data-bod="' + escAttr(bodLabelStr) + '" data-reqs="' + escAttr(reqSummaryStr) + '">+ Add to Spec Cart</button>' +
        "</div>" +
      "</div>";
    }).join("");
    if (!primaryHtml && !altList.length && reqs.length) {
      primaryHtml = '<p class="empty">No single DMR model in this family supports every selected requirement together — adjust the coil or construction filters above, or call DMR at ' + escHtml(D.company.phone) + " for custom engineering.</p>";
    }

    var altsList = altList.map(function (pid) {
      var p = products[pid];
      if (!p) return "";
      var hitCount = (matchedLabelsById[pid] || []).length;
      return '<div class="xref-alt-row">' +
        '<button type="button" class="xref-alt-name" data-product="' + p.id + '"><strong>' + escHtml(brands[p.brand].name) + "</strong> " + escHtml(p.name) +
          (reqs.length && hitCount ? ' <span class="xref-alt-hits">(' + hitCount + "/" + reqs.length + ")</span>" : "") +
          (reqs.length && unratedById[pid] ? ' <span class="xref-alt-hits">(accessory — not filtered by requirements)</span>' : "") + "</button>" +
        '<div class="xref-alt-acts">' +
          '<button type="button" class="link cmp-btn" data-compare="' + p.id + '">Compare</button>' +
          '<button type="button" class="add add-mini" data-add="' + p.id + '" data-role="' + escAttr(roleHint) + '" data-entry-id="' + escAttr(entry.id) + '" data-bod="' + escAttr(bodLabelStr) + '" data-reqs="' + escAttr(reqSummaryStr) + '">+ Add to Spec Cart</button>' +
        "</div>" +
      "</div>";
    }).filter(Boolean);

    var bodBanner = bodCtx && bodCtx.mfr
      ? '<div class="xref-bod-summary">' +
          '<p class="xref-bod-kicker">Basis-of-Design Product Understood — ' + escHtml(bodCtx.mfr) + " · " + escHtml(bodCtx.model) + "</p>" +
          '<p class="xref-bod-desc">' + escHtml(bodCtx.desc) + "</p>" +
        "</div>"
      : "";

    var eyebrowText = bodCtx && bodCtx.mfr ? "Recommended DMR Specification Match" : (entry.level1 || "Recommended DMR Specification Match");
    var subText = (entry.level2 ? escHtml(entry.level2) + " · " : "") + (catObj ? escHtml(catObj.name) : "");
    var bundlePid = primaryList[0] || altList[0] || "";

    return '<article class="xref-card">' +
      '<div class="xref-head">' +
        '<div class="xref-head-titles">' +
          '<span class="xref-comp-badge">' + escHtml(eyebrowText) + "</span>" +
          "<h3>" + escHtml(entry.level3 || entry.equipmentType) + "</h3>" +
          '<p class="xref-type">' + subText + "</p>" +
        "</div>" +
        '<div class="xref-head-acts">' +
          (bundlePid ? '<button type="button" class="btn btn-primary btn-xs" data-cart-bundle="' + escAttr(entry.id) + '" data-cart-pid="' + escAttr(bundlePid) + '" data-role="' + escAttr(roleHint) + '" data-bod="' + escAttr(bodLabelStr) + '" data-reqs="' + escAttr(reqSummaryStr) + '">+ Add Spec Match to Cart</button>' : "") +
          (cmpIds.length > 1 ? '<button type="button" class="btn btn-line btn-xs" data-compare-role="' + cmpIds.join(",") + '">Compare DMR matches side-by-side</button>' : "") +
          '<button type="button" class="btn btn-line btn-xs" data-copy-spec="' + entry.id + '">Copy spec addition text</button>' +
        "</div>" +
      "</div>" +
      bodBanner +
      '<div class="xref-guidance"><p>' + escHtml(entry.matchSummary) + "</p></div>" +
      '<div class="xref-matches">' + primaryHtml + "</div>" +
      (altsList.length ? '<div class="xref-alts"><p class="xref-alts-label">Alternate / Situational DMR Options</p><div class="xref-alts-grid">' + altsList.join("") + "</div></div>" : "") +
      '<div class="xref-spec-box">' +
        '<div class="xref-spec-head"><span>Recommended Division 23 Spec Addition</span><button type="button" class="link" data-copy-spec="' + entry.id + '">Copy text</button></div>' +
        "<p>" + escHtml(entry.specText) + "</p>" +
      "</div>" +
    "</article>";
  }

  function closeListBox(ulSel, inpSel) {
    var ul = $(ulSel), inp = $(inpSel);
    xrefActiveSug = -1;
    if (ul) { ul.hidden = true; ul.innerHTML = ""; }
    if (inp) inp.setAttribute("aria-expanded", "false");
  }

  function renderMfrSuggest(raw) {
    var ul = $("#xrefMfrSuggest"), inp = $("#xrefMfr");
    if (!ul || !inp) return;
    var match = findUniqueMfr(raw);
    if (!match || match.name.toLowerCase() === String(raw || "").toLowerCase().trim()) {
      closeListBox("#xrefMfrSuggest", "#xrefMfr");
      return;
    }
    ul.innerHTML = '<li role="option" data-mfr-val="' + escAttr(match.name) + '" aria-selected="false">' +
      '<span class="xref-sug-label">' + escHtml(match.name) + "</span>" +
      '<span class="xref-sug-desc">Matched Basis-of-Design manufacturer — select to search model</span>' +
    "</li>";
    ul.hidden = false;
    inp.setAttribute("aria-expanded", "true");
  }

  function renderModelSuggest(query) {
    var ul = $("#xrefSuggest"), inp = $("#xrefQ");
    if (!ul || !inp) return;
    var qTrim = String(query || "").trim();
    if (!xrefState.mfrKey || !xrefMfrMap[xrefState.mfrKey] || qTrim.length < 2) {
      closeListBox("#xrefSuggest", "#xrefQ");
      return;
    }
    var items = xrefMfrMap[xrefState.mfrKey].items;
    var scored = items.map(function (it) {
      return { item: it, score: scoreModelFuzzy(it, qTrim) };
    }).filter(function (x) {
      return x.score >= 25;
    }).sort(function (a, b) {
      return b.score - a.score || a.item.model.localeCompare(b.item.model);
    }).slice(0, 5);

    if (!scored.length) { closeListBox("#xrefSuggest", "#xrefQ"); return; }
    xrefActiveSug = -1;
    ul.innerHTML = scored.map(function (x, idx) {
      return '<li role="option" data-sug-idx="' + idx + '" data-sug-entry="' + escAttr(x.item.entryId) + '" data-sug-model="' + escAttr(x.item.model) + '" data-sug-desc="' + escAttr(x.item.desc) + '" data-sug-defaults="' + escAttr(JSON.stringify(x.item.defaults || [])) + '" aria-selected="false">' +
        '<span class="xref-sug-label">' + escHtml(x.item.model) + "</span>" +
      "</li>";
    }).join("");
    ul.hidden = false;
    inp.setAttribute("aria-expanded", "true");
  }

  function syncBoxMode() {
    var entryGrid = $("#xrefEntryGrid"), mfrForm = $("#xrefMfrForm"), orDiv = $("#xrefOrDivider"), treePanel = $("#xrefTreePanel");
    var modeLabel = $("#xrefModeLabel"), clearBtn = $("#clearXref");
    if (!entryGrid || !mfrForm || !orDiv || !treePanel) return;

    entryGrid.dataset.mode = xrefState.mode;
    if (xrefState.mode === "bod") {
      mfrForm.hidden = false;
      orDiv.hidden = true;
      treePanel.hidden = true;
      if (modeLabel) modeLabel.textContent = "Basis-of-Design Manufacturer & Model Lookup";
      if (clearBtn) clearBtn.hidden = false;
    } else if (xrefState.mode === "category") {
      mfrForm.hidden = true;
      orDiv.hidden = true;
      treePanel.hidden = false;
      if (modeLabel) modeLabel.textContent = "Product Category & Requirement Checklist";
      if (clearBtn) clearBtn.hidden = false;
    } else {
      mfrForm.hidden = false;
      orDiv.hidden = false;
      treePanel.hidden = false;
      if (modeLabel) modeLabel.textContent = "Choose How to Start — Enter BOD Model or Select Product Category";
      if (clearBtn) clearBtn.hidden = true;
    }
  }

  function getActiveReqObjs(rec) {
    if (!rec) return [];
    var out = [];
    (rec.sliders || []).forEach(function (sl) {
      var idx = xrefState.sliders[sl.name] || 0;
      if (idx > 0 && idx < sl.steps.length) {
        var st = sl.steps[idx];
        out.push({
          key: st.key,
          group: sl.name,
          label: sl.name + ": " + st.label,
          prodMap: st.prodMap
        });
      }
    });
    (rec.selects || []).forEach(function (sel) {
      var k = xrefState.selects[sel.name];
      if (k && sel.optMap[k]) out.push(sel.optMap[k]);
    });
    xrefState.reqs.forEach(function (k) {
      if (rec.reqByKey[k]) out.push(rec.reqByKey[k]);
    });
    return out;
  }

  function renderReqPanel(contextLevel1, titleText, allowSubcats, bodDefaults, bodScopedEntries, bodScopeId) {
    var panel = $("#xrefReqPanel"), groupsEl = $("#xrefReqGroups"), titleEl = $("#xrefReqTitle"), clearReqBtn = $("#clearXrefReqs");
    if (!panel || !groupsEl) return;

    var rec = contextLevel1 ? xrefCatIndex[contextLevel1] : null;
    if (!rec) {
      panel.hidden = true;
      groupsEl.innerHTML = "";
      groupsEl.dataset.uiSig = "";
      xrefState.reqScopeKey = "";
      xrefState.sliders = {};
      xrefState.selects = {};
      if (clearReqBtn) clearReqBtn.hidden = true;
      return;
    }

    var scopeKey = allowSubcats
      ? ("cat:" + contextLevel1)
      : ("bod:" + (bodScopeId || contextLevel1));
    var isNewScope = xrefState.reqScopeKey !== scopeKey;
    if (isNewScope) {
      xrefState.reqScopeKey = scopeKey;
      xrefState.subcats = [];
      xrefState.reqs = [];
      xrefState.sliders = {};
      xrefState.selects = {};
    }

    if (titleEl) titleEl.textContent = titleText || ("Requirements for " + contextLevel1);

    var scopedEntries = (!allowSubcats && bodScopedEntries && bodScopedEntries.length)
      ? bodScopedEntries
      : rec.entries;
    if (allowSubcats && xrefState.subcats.length) {
      scopedEntries = rec.entries.filter(function (e) { return xrefState.subcats.indexOf(e.level2) > -1; });
      if (!scopedEntries.length) scopedEntries = rec.entries;
    }

    var bodDefSet = {};
    (!allowSubcats && Array.isArray(bodDefaults) ? bodDefaults : []).forEach(function (k) {
      if (k) bodDefSet[k] = true;
    });

    var visSliders = [];
    var validSliders = {};
    (rec.sliders || []).forEach(function (sl) {
      var steps = sl.steps.filter(function (st) {
        return scopedEntries.some(function (e) { return Boolean(st.entryMap[e.id]); });
      });
      if (steps.length > 1) {
        var scopedSl = { name: sl.name, steps: steps, stepMap: sl.stepMap };
        visSliders.push(scopedSl);
        validSliders[sl.name] = scopedSl;
      }
    });

    var rawSelectMap = {}, rawSelects = [];
    var rawGroupMap = {}, rawGroups = [];
    scopedEntries.forEach(function (e) {
      (e.reqCheckboxes || []).forEach(function (rc) {
        if (rc.group.indexOf("SLIDER:") === 0) return;
        if (rc.group.indexOf("SELECT:") === 0) {
          var selName = rc.group.replace(/^SELECT:\s*/i, "").trim();
          if (!rawSelectMap[selName]) {
            rawSelectMap[selName] = { name: selName, options: [], seen: {}, optMap: {} };
            rawSelects.push(rawSelectMap[selName]);
          }
          if (!rawSelectMap[selName].seen[rc.key]) {
            rawSelectMap[selName].seen[rc.key] = true;
            var oObj = { key: rc.key, label: rc.label };
            rawSelectMap[selName].optMap[rc.key] = oObj;
            rawSelectMap[selName].options.push(oObj);
          }
          return;
        }
        if (!rawGroupMap[rc.group]) {
          rawGroupMap[rc.group] = { group: rc.group, options: [], seen: {} };
          rawGroups.push(rawGroupMap[rc.group]);
        }
        if (!rawGroupMap[rc.group].seen[rc.key]) {
          rawGroupMap[rc.group].seen[rc.key] = true;
          rawGroupMap[rc.group].options.push({ key: rc.key, label: rc.label });
        }
      });
    });

    // In BOD mode, suppress single-option groups whose sole option is already guaranteed by the matched BOD model.
    var visSelects = rawSelects.filter(function (sel) {
      if (!allowSubcats && sel.options.length === 1 && bodDefSet[sel.options[0].key]) return false;
      return sel.options.length > 0;
    });
    var validSelects = {};
    visSelects.forEach(function (sel) { validSelects[sel.name] = sel; });

    var visGroups = rawGroups.filter(function (g) {
      if (!allowSubcats && g.options.length === 1 && bodDefSet[g.options[0].key]) return false;
      return g.options.length > 0;
    });
    var validKeys = {};
    visGroups.forEach(function (g) {
      g.options.forEach(function (opt) { validKeys[opt.key] = true; });
    });

    if (isNewScope && !allowSubcats) {
      Object.keys(bodDefSet).forEach(function (defKey) {
        visSliders.forEach(function (sl) {
          for (var si = 1; si < sl.steps.length; si++) {
            if (sl.steps[si].key === defKey) xrefState.sliders[sl.name] = si;
          }
        });
        visSelects.forEach(function (sel) {
          if (sel.optMap[defKey]) xrefState.selects[sel.name] = defKey;
        });
        if (validKeys[defKey] && xrefState.reqs.indexOf(defKey) < 0) {
          xrefState.reqs.push(defKey);
        }
      });
    }

    xrefState.reqs = xrefState.reqs.filter(function (k) { return Boolean(validKeys[k]); });
    Object.keys(xrefState.sliders).forEach(function (sName) {
      if (!validSliders[sName] || xrefState.sliders[sName] <= 0 || xrefState.sliders[sName] >= validSliders[sName].steps.length) {
        delete xrefState.sliders[sName];
      }
    });
    Object.keys(xrefState.selects).forEach(function (selName) {
      var k = xrefState.selects[selName];
      if (!validSelects[selName] || !validSelects[selName].optMap[k]) {
        delete xrefState.selects[selName];
      }
    });
    if (!allowSubcats) xrefState.subcats = [];

    var uiSig = scopeKey + "|" + scopedEntries.map(function (e) { return e.id; }).join(",") + "|" + (allowSubcats ? xrefState.subcats.join(",") : "");
    if (groupsEl.dataset.uiSig !== uiSig) {
      var rowsHtml = [];

      if (visSliders.length) {
        rowsHtml.push(
          '<div class="xref-sliders-row">' +
            visSliders.map(function (sl) {
              var curIdx = xrefState.sliders[sl.name] || 0;
              var curStep = sl.steps[curIdx] || sl.steps[0];
              return '<div class="xref-slider-card" data-slider-card="' + escAttr(sl.name) + '">' +
                '<div class="xref-slider-top">' +
                  '<span class="xref-slider-name">' + escHtml(sl.name) + "</span>" +
                  '<span class="xref-slider-val' + (curIdx > 0 ? " is-active" : "") + '">' + escHtml(curStep ? curStep.label : "Any") + "</span>" +
                "</div>" +
                '<input type="range" class="xref-slider-input" data-slider-name="' + escAttr(sl.name) + '" min="0" max="' + (sl.steps.length - 1) + '" step="1" value="' + curIdx + '" aria-label="' + escAttr(sl.name) + '">' +
                '<div class="xref-slider-ticks">' +
                  sl.steps.map(function (st, idx) {
                    return '<button type="button" class="xref-slider-tick' + (idx === curIdx ? " is-active" : "") + '" data-slider-tick="' + escAttr(sl.name) + '" data-slider-idx="' + idx + '">' + escHtml(st.label) + "</button>";
                  }).join("") +
                "</div>" +
              "</div>";
            }).join("") +
          "</div>"
        );
      }

      if (visSelects.length) {
        rowsHtml.push(
          '<div class="xref-selects-row">' +
            visSelects.map(function (sel) {
              var curKey = xrefState.selects[sel.name] || "";
              return '<label class="xref-select-card">' +
                '<span class="xref-select-label">' + escHtml(sel.name) + "</span>" +
                '<select class="xref-select-input' + (curKey ? " is-active" : "") + '" data-select-name="' + escAttr(sel.name) + '">' +
                  '<option value="">Any</option>' +
                  sel.options.map(function (opt) {
                    return '<option value="' + escAttr(opt.key) + '"' + (opt.key === curKey ? " selected" : "") + ">" + escHtml(opt.label) + "</option>";
                  }).join("") +
                "</select>" +
              "</label>";
            }).join("") +
          "</div>"
        );
      }

      if (allowSubcats && rec.subcats.length > 1) {
        rowsHtml.push(
          '<div class="xref-req-row">' +
            '<span class="xref-req-row-label">Equipment Sub-Category</span>' +
            '<div class="xref-req-row-options">' +
              rec.subcats.map(function (sc) {
                var checked = xrefState.subcats.indexOf(sc) > -1;
                return '<label class="xref-check' + (checked ? " is-checked" : "") + '">' +
                  '<input type="checkbox" data-subcat="' + escAttr(sc) + '"' + (checked ? " checked" : "") + ">" +
                  "<span>" + escHtml(sc) + "</span>" +
                "</label>";
              }).join("") +
            "</div>" +
          "</div>"
        );
      }

      visGroups.forEach(function (g) {
        rowsHtml.push(
          '<div class="xref-req-row">' +
            '<span class="xref-req-row-label">' + escHtml(g.group) + "</span>" +
            '<div class="xref-req-row-options">' +
              g.options.map(function (opt) {
                var checked = xrefState.reqs.indexOf(opt.key) > -1;
                return '<label class="xref-check' + (checked ? " is-checked" : "") + '">' +
                  '<input type="checkbox" data-req-key="' + escAttr(opt.key) + '"' + (checked ? " checked" : "") + ">" +
                  "<span>" + escHtml(opt.label) + "</span>" +
                "</label>";
              }).join("") +
            "</div>" +
          "</div>"
        );
      });

      groupsEl.innerHTML = rowsHtml.join("");
      groupsEl.dataset.uiSig = uiSig;
    } else {
      visSliders.forEach(function (sl) {
        var curIdx = xrefState.sliders[sl.name] || 0;
        var curStep = sl.steps[curIdx] || sl.steps[0];
        var cardEl = groupsEl.querySelector('.xref-slider-card[data-slider-card="' + sl.name.replace(/"/g, '\\"') + '"]');
        if (!cardEl) return;
        var inp = cardEl.querySelector("input[data-slider-name]");
        if (inp && Number(inp.value) !== curIdx) inp.value = String(curIdx);
        var valEl = cardEl.querySelector(".xref-slider-val");
        if (valEl) {
          valEl.textContent = curStep ? curStep.label : "Any";
          valEl.classList.toggle("is-active", curIdx > 0);
        }
        cardEl.querySelectorAll(".xref-slider-tick").forEach(function (tb) {
          tb.classList.toggle("is-active", Number(tb.getAttribute("data-slider-idx")) === curIdx);
        });
      });
      groupsEl.querySelectorAll("select[data-select-name]").forEach(function (selEl) {
        var sName = selEl.getAttribute("data-select-name");
        var targetVal = xrefState.selects[sName] || "";
        if (selEl.value !== targetVal) selEl.value = targetVal;
        selEl.classList.toggle("is-active", Boolean(targetVal));
      });
      groupsEl.querySelectorAll("input[data-subcat]").forEach(function (cb) {
        var on = xrefState.subcats.indexOf(cb.getAttribute("data-subcat")) > -1;
        cb.checked = on;
        var lbl = cb.closest(".xref-check");
        if (lbl) lbl.classList.toggle("is-checked", on);
      });
      groupsEl.querySelectorAll("input[data-req-key]").forEach(function (cb) {
        var on = xrefState.reqs.indexOf(cb.getAttribute("data-req-key")) > -1;
        cb.checked = on;
        var lbl = cb.closest(".xref-check");
        if (lbl) lbl.classList.toggle("is-checked", on);
      });
    }

    var activeSliderCount = Object.keys(xrefState.sliders).length;
    var activeSelectCount = Object.keys(xrefState.selects).length;
    panel.hidden = groupsEl.children.length === 0;
    if (clearReqBtn) clearReqBtn.hidden = (xrefState.subcats.length + xrefState.reqs.length + activeSliderCount + activeSelectCount) === 0;
  }

  function renderCrossRef() {
    var grid = $("#xrefGrid"), directWrap = $("#xrefDirectWrap"), directGrid = $("#xrefDirectGrid");
    var statusEl = $("#xrefStatus");
    if (!grid) return;

    syncBoxMode();

    if (xrefState.mode === "idle") {
      renderReqPanel("", "", false);
      grid.innerHTML = "";
      if (directWrap && directGrid) { directWrap.hidden = true; directGrid.innerHTML = ""; }
      if (statusEl) {
        statusEl.textContent = "Start typing a Basis-of-Design manufacturer on the left, or select a broad product category on the right.";
      }
      return;
    }

    var results = [];
    var directSeed = "";
    var activeLevel1 = "";
    var activeLevel1Rec = null;
    var activeReqObjs = [];

    if (xrefState.mode === "bod") {
      var hasMfr = Boolean(xrefState.mfrKey && xrefMfrMap[xrefState.mfrKey]);
      if (!hasMfr) {
        renderReqPanel("", "", false);
        grid.innerHTML = "";
        if (directWrap && directGrid) { directWrap.hidden = true; directGrid.innerHTML = ""; }
        if (statusEl) {
          statusEl.textContent = "Continue typing the Basis-of-Design manufacturer name above (at least 3 characters for unique match), or click Switch / Reset.";
        }
        return;
      }

      var mfrObj = xrefMfrMap[xrefState.mfrKey];
      var qRaw = xrefState.q.trim();
      var matchedItems = [];

      if (xrefState.selectedItem && xrefLookup[xrefState.selectedItem.entryId]) {
        matchedItems.push({
          entry: xrefLookup[xrefState.selectedItem.entryId],
          bodCtx: {
            mfr: mfrObj.name,
            model: xrefState.selectedItem.model,
            desc: xrefState.selectedItem.desc,
            defaults: xrefState.selectedItem.defaults || []
          }
        });
      } else if (qRaw.length >= 2) {
        var seenE = {};
        mfrObj.items.map(function (it) {
          return { item: it, score: scoreModelFuzzy(it, qRaw) };
        }).filter(function (x) {
          return x.score >= 25;
        }).sort(function (a, b) {
          return b.score - a.score;
        }).forEach(function (x) {
          if (seenE[x.item.entryId]) return;
          seenE[x.item.entryId] = true;
          var e = xrefLookup[x.item.entryId];
          if (e && matchedItems.length < 3) {
            matchedItems.push({
              entry: e,
              bodCtx: {
                mfr: mfrObj.name,
                model: x.item.model,
                desc: x.item.desc,
                defaults: x.item.defaults || e.bodDefaults || []
              }
            });
          }
        });
      }

      if (!matchedItems.length) {
        renderReqPanel("", "", false);
        grid.innerHTML = "";
        if (directWrap && directGrid) { directWrap.hidden = true; directGrid.innerHTML = ""; }
        if (statusEl) {
          statusEl.textContent = qRaw.length >= 2
            ? "No model match found for \"" + qRaw + "\" under " + mfrObj.name + ". Refine the model keyword above or click Switch / Reset to browse by category."
            : "Manufacturer set to " + mfrObj.name + ". Enter your BOD model or series above to verify the product description, check requirements, and view DMR matches.";
        }
        return;
      }

      activeLevel1 = matchedItems[0].entry.level1;
      activeLevel1Rec = xrefCatIndex[activeLevel1] || null;
      var bodDefs = (matchedItems[0].bodCtx && matchedItems[0].bodCtx.defaults && matchedItems[0].bodCtx.defaults.length)
        ? matchedItems[0].bodCtx.defaults
        : (matchedItems[0].entry.bodDefaults || []);
      var bodScopeId = matchedItems[0].entry.id + "::" + matchedItems[0].bodCtx.model;
      var reqHeaderTitle = "Refine Requirements for " + mfrObj.name + " — " + matchedItems[0].bodCtx.model;
      renderReqPanel(activeLevel1, reqHeaderTitle, false, bodDefs, [matchedItems[0].entry], bodScopeId);
      activeReqObjs = getActiveReqObjs(activeLevel1Rec);

      results = matchedItems;
      matchedItems.forEach(function (m) {
        directSeed += " " + m.bodCtx.desc + " " + m.entry.equipmentType;
      });
      if (statusEl) {
        statusEl.textContent = "Matched " + mfrObj.name + " — " + matchedItems[0].bodCtx.model +
          (activeReqObjs.length ? " with " + activeReqObjs.length + " requirement filter" + (activeReqObjs.length === 1 ? "" : "s") + " applied." : " (verify product summary below and adjust any sliders or requirements above).");
      }
    } else if (xrefState.mode === "category") {
      activeLevel1 = xrefState.level1;
      activeLevel1Rec = xrefCatIndex[activeLevel1] || null;
      renderReqPanel(activeLevel1, "Requirements for " + activeLevel1, true);
      activeReqObjs = getActiveReqObjs(activeLevel1Rec);

      var catEntries = activeLevel1Rec ? activeLevel1Rec.entries.slice() : [];
      if (xrefState.subcats.length) {
        catEntries = catEntries.filter(function (e) { return xrefState.subcats.indexOf(e.level2) > -1; });
      }

      if (activeReqObjs.length) {
        var ranked = catEntries.map(function (e, idx) {
          var primFullCount = 0;
          var fullProdCount = 0;
          var seenPid = {};
          (e.primary || []).forEach(function (pid) {
            if (!products[pid] || seenPid[pid]) return;
            seenPid[pid] = true;
            if (activeReqObjs.every(function (ro) { return Boolean(ro.prodMap[pid]); }) && passesCatalogCombos(pid, activeReqObjs)) {
              primFullCount++;
              fullProdCount++;
            }
          });
          (e.alternates || []).forEach(function (pid) {
            if (!products[pid] || seenPid[pid]) return;
            seenPid[pid] = true;
            if (activeReqObjs.every(function (ro) { return Boolean(ro.prodMap[pid]); }) && passesCatalogCombos(pid, activeReqObjs)) {
              fullProdCount++;
            }
          });
          return { entry: e, primFullCount: primFullCount, fullProdCount: fullProdCount, idx: idx };
        }).filter(function (x) {
          return x.fullProdCount > 0;
        }).sort(function (a, b) {
          return (b.primFullCount > 0 ? 1 : 0) - (a.primFullCount > 0 ? 1 : 0) ||
            b.fullProdCount - a.fullProdCount ||
            a.idx - b.idx;
        });
        results = ranked.map(function (x) { return { entry: x.entry, bodCtx: null }; });
      } else {
        results = catEntries.map(function (e) { return { entry: e, bodCtx: null }; });
      }

      results.forEach(function (r) {
        directSeed += " " + (r.entry.level3 || "") + " " + (r.entry.level2 || "") + " " + r.entry.equipmentType;
      });
      if (statusEl) {
        var filterParts = [];
        if (xrefState.subcats.length) filterParts.push(xrefState.subcats.join(", "));
        if (activeReqObjs.length) filterParts.push(activeReqObjs.length + " requirement" + (activeReqObjs.length === 1 ? "" : "s") + " checked");
        statusEl.textContent = "DMR recommendations for " + activeLevel1 + (filterParts.length ? " — " + filterParts.join(" · ") : "") + ".";
      }
    }

    grid.innerHTML = results.length
      ? results.slice(0, 8).map(function (r) { return xrefCardHtml(r.entry, r.bodCtx, activeReqObjs, activeLevel1Rec); }).join("")
      : '<p class="empty">No single DMR family matches that exact combination. Uncheck a requirement filter above or call DMR at ' + D.company.phone + " for engineered selection assistance.</p>";

    if (directWrap && directGrid) {
      if (directSeed && results.length && results.length <= 2) {
        var direct = D.products.map(function (p) {
          return { p: p, score: scoreDirectProduct(p, directSeed) };
        }).filter(function (x) { return x.score > 0; }).sort(function (a, b) {
          return b.score - a.score;
        }).slice(0, 6);
        directWrap.hidden = direct.length === 0;
        directGrid.innerHTML = direct.map(function (x) { return card(x.p); }).join("");
      } else {
        directWrap.hidden = true;
        directGrid.innerHTML = "";
      }
    }

    document.querySelectorAll("#spec-match [data-add]").forEach(syncAddBtn);
    syncSpecCartUI(false);
    syncCompareUI();
  }

  function initCrossRef() {
    var form = $("#xrefMfrForm"), mfrInp = $("#xrefMfr"), mfrUl = $("#xrefMfrSuggest");
    var qInp = $("#xrefQ"), modUl = $("#xrefSuggest");
    var l1Sel = $("#xrefLevel1"), reqGroupsEl = $("#xrefReqGroups");
    var clearBtn = $("#clearXref"), clearReqsBtn = $("#clearXrefReqs");
    if (!form || !mfrInp || !qInp || !mfrUl || !modUl || !l1Sel) return;

    buildXrefIndexes();

    l1Sel.innerHTML = '<option value="">Select broad product category...</option>' +
      xrefCatOrder.map(function (v) { return '<option value="' + escAttr(v) + '">' + escHtml(v) + "</option>"; }).join("");

    function resetAll() {
      xrefState = { mode: "idle", mfr: "", mfrKey: "", q: "", selectedItem: null, level1: "", subcats: [], reqs: [], sliders: {}, selects: {}, reqScopeKey: "" };
      mfrInp.value = "";
      qInp.value = "";
      qInp.disabled = true;
      qInp.placeholder = "Enter manufacturer first, then type model...";
      l1Sel.value = "";
      closeListBox("#xrefMfrSuggest", "#xrefMfr");
      closeListBox("#xrefSuggest", "#xrefQ");
      renderCrossRef();
    }

    function lockMfr(mfrObj) {
      xrefState.mode = "bod";
      xrefState.level1 = "";
      l1Sel.value = "";
      xrefState.mfr = mfrObj.name;
      xrefState.mfrKey = mfrObj.key;
      xrefState.q = "";
      xrefState.selectedItem = null;
      xrefState.subcats = [];
      xrefState.reqs = [];
      xrefState.sliders = {};
      xrefState.selects = {};
      xrefState.reqScopeKey = "";
      mfrInp.value = mfrObj.name;
      qInp.value = "";
      qInp.disabled = false;
      qInp.placeholder = "Type at least 2 characters of BOD model or series...";
      closeListBox("#xrefMfrSuggest", "#xrefMfr");
      closeListBox("#xrefSuggest", "#xrefQ");
      qInp.focus();
      renderCrossRef();
    }

    mfrInp.addEventListener("input", function (e) {
      var val = e.target.value;
      if (!val.trim()) {
        resetAll();
        return;
      }
      xrefState.mode = "bod";
      xrefState.level1 = "";
      l1Sel.value = "";
      var exact = findUniqueMfr(val);
      if (exact && exact.name.toLowerCase() === val.toLowerCase().trim()) {
        lockMfr(exact);
        return;
      }
      xrefState.mfr = "";
      xrefState.mfrKey = "";
      xrefState.q = "";
      xrefState.selectedItem = null;
      xrefState.reqs = [];
      xrefState.sliders = {};
      xrefState.selects = {};
      xrefState.reqScopeKey = "";
      qInp.value = "";
      qInp.disabled = true;
      qInp.placeholder = "Enter manufacturer first, then type model...";
      closeListBox("#xrefSuggest", "#xrefQ");
      renderMfrSuggest(val);
      renderCrossRef();
    });

    mfrInp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var match = findUniqueMfr(mfrInp.value);
        if (match) lockMfr(match);
      } else if (e.key === "Escape") {
        closeListBox("#xrefMfrSuggest", "#xrefMfr");
      }
    });

    mfrUl.addEventListener("mousedown", function (e) {
      var li = e.target.closest("li[data-mfr-val]");
      if (!li) return;
      e.preventDefault();
      var match = xrefMfrMap[(li.dataset.mfrVal || "").toLowerCase()];
      if (match) lockMfr(match);
    });

    qInp.addEventListener("input", function (e) {
      xrefState.q = e.target.value;
      xrefState.selectedItem = null;
      if (!xrefState.q.trim()) {
        xrefState.reqs = [];
        xrefState.sliders = {};
        xrefState.selects = {};
        xrefState.reqScopeKey = "";
      }
      renderModelSuggest(xrefState.q);
      renderCrossRef();
    });

    qInp.addEventListener("focus", function () {
      if (xrefState.mfrKey && xrefState.q.trim().length >= 2) renderModelSuggest(xrefState.q);
    });

    function selectModelLi(li) {
      if (!li) return;
      var itemDefs = [];
      try {
        itemDefs = li.dataset.sugDefaults ? JSON.parse(li.dataset.sugDefaults) : [];
        if (!Array.isArray(itemDefs)) itemDefs = [];
      } catch (e) { itemDefs = []; }
      var item = {
        mfr: xrefState.mfr,
        model: li.dataset.sugModel || "",
        desc: li.dataset.sugDesc || "",
        entryId: li.dataset.sugEntry || "",
        defaults: itemDefs
      };
      xrefState.q = item.model;
      xrefState.selectedItem = item;
      qInp.value = item.model;
      closeListBox("#xrefSuggest", "#xrefQ");
      renderCrossRef();
    }

    qInp.addEventListener("keydown", function (e) {
      if (modUl.hidden) return;
      var items = modUl.querySelectorAll("li");
      if (!items.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        xrefActiveSug = (xrefActiveSug + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        xrefActiveSug = (xrefActiveSug - 1 + items.length) % items.length;
      } else if (e.key === "Enter" && xrefActiveSug > -1) {
        e.preventDefault();
        selectModelLi(items[xrefActiveSug]);
        return;
      } else if (e.key === "Escape") {
        closeListBox("#xrefSuggest", "#xrefQ");
        return;
      } else {
        return;
      }
      items.forEach(function (li, i) {
        var on = i === xrefActiveSug;
        li.classList.toggle("is-active", on);
        li.setAttribute("aria-selected", on);
      });
    });

    modUl.addEventListener("mousedown", function (e) {
      var li = e.target.closest("li[data-sug-entry]");
      if (!li) return;
      e.preventDefault();
      selectModelLi(li);
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".xref-autocomplete")) {
        closeListBox("#xrefMfrSuggest", "#xrefMfr");
        closeListBox("#xrefSuggest", "#xrefQ");
      }
    });

    form.addEventListener("submit", function (e) { e.preventDefault(); });

    l1Sel.addEventListener("change", function (e) {
      var val = e.target.value;
      if (!val) {
        resetAll();
        return;
      }
      xrefState = {
        mode: "category",
        mfr: "",
        mfrKey: "",
        q: "",
        selectedItem: null,
        level1: val,
        subcats: [],
        reqs: [],
        sliders: {},
        selects: {},
        reqScopeKey: ""
      };
      mfrInp.value = "";
      qInp.value = "";
      qInp.disabled = true;
      closeListBox("#xrefMfrSuggest", "#xrefMfr");
      closeListBox("#xrefSuggest", "#xrefQ");
      renderCrossRef();
    });

    if (reqGroupsEl) {
      reqGroupsEl.addEventListener("input", function (e) {
        var inp = e.target;
        if (!inp || inp.type !== "range" || !inp.hasAttribute("data-slider-name")) return;
        var sName = inp.getAttribute("data-slider-name");
        var v = parseInt(inp.value, 10) || 0;
        if (v > 0) xrefState.sliders[sName] = v;
        else delete xrefState.sliders[sName];
        renderCrossRef();
      });

      reqGroupsEl.addEventListener("change", function (e) {
        var inp = e.target;
        if (!inp) return;
        if (inp.type === "range" && inp.hasAttribute("data-slider-name")) {
          var sName = inp.getAttribute("data-slider-name");
          var v = parseInt(inp.value, 10) || 0;
          if (v > 0) xrefState.sliders[sName] = v;
          else delete xrefState.sliders[sName];
          renderCrossRef();
          return;
        }
        if (inp.tagName === "SELECT" && inp.hasAttribute("data-select-name")) {
          var selName = inp.getAttribute("data-select-name");
          if (inp.value) xrefState.selects[selName] = inp.value;
          else delete xrefState.selects[selName];
          renderCrossRef();
          return;
        }
        if (inp.type !== "checkbox") return;
        if (inp.hasAttribute("data-subcat")) {
          xrefState.subcats = Array.prototype.slice.call(reqGroupsEl.querySelectorAll("input[data-subcat]:checked"))
            .map(function (el) { return el.getAttribute("data-subcat"); });
        } else if (inp.hasAttribute("data-req-key")) {
          xrefState.reqs = Array.prototype.slice.call(reqGroupsEl.querySelectorAll("input[data-req-key]:checked"))
            .map(function (el) { return el.getAttribute("data-req-key"); });
        }
        renderCrossRef();
      });

      reqGroupsEl.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-slider-tick]");
        if (!btn) return;
        var sName = btn.getAttribute("data-slider-tick");
        var v = parseInt(btn.getAttribute("data-slider-idx"), 10) || 0;
        if (v > 0) xrefState.sliders[sName] = v;
        else delete xrefState.sliders[sName];
        renderCrossRef();
      });
    }

    if (clearReqsBtn) {
      clearReqsBtn.addEventListener("click", function () {
        xrefState.subcats = [];
        xrefState.reqs = [];
        xrefState.sliders = {};
        xrefState.selects = {};
        renderCrossRef();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", resetAll);
    }

    renderCrossRef();
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
        '<button class="btn btn-line cmp-btn" type="button" data-compare="' + p.id + '">Compare</button>' +
        '<a class="btn btn-line" href="mailto:' + D.company.email + "?subject=" + encodeURIComponent("Inquiry: " + b.name + " " + p.name) + '">Ask DMR about this</a>' +
        (b.website ? '<a class="btn btn-line" href="' + b.website + '" target="_blank" rel="noopener">Visit ' + b.name + " ↗</a>" : "") +
        '</div>' +
      '</div>';
    pd.querySelectorAll("[data-add]").forEach(syncAddBtn);
    syncCompareUI();
    if (!pd.open) pd.showModal();
    var bodyEl = pd.querySelector(".sheet-body");
    if (bodyEl) bodyEl.scrollTop = 0;
  };

  /* ---------- side-by-side product comparison ---------- */

  var cmpList = [];
  var cd = $("#compareDialog");

  function syncCompareUI() {
    document.querySelectorAll("[data-compare]").forEach(function (btn) {
      var on = cmpList.indexOf(btn.dataset.compare) > -1;
      btn.setAttribute("aria-pressed", on);
      btn.textContent = on ? "✓ Comparing" : "Compare";
    });
    var bar = $("#compareBar"), itemsEl = $("#compareBarItems"), openBtn = $("#compareOpenBtn");
    if (!bar || !itemsEl) return;
    bar.hidden = cmpList.length === 0;
    itemsEl.innerHTML = cmpList.map(function (id) {
      var p = products[id];
      return p ? '<span class="cmp-chip"><span>' + brands[p.brand].name + " · " + p.name + '</span><button type="button" data-compare="' + id + '" aria-label="Remove ' + escAttr(p.name) + '">×</button></span>' : "";
    }).join("");
    if (openBtn) openBtn.textContent = cmpList.length > 1 ? "Compare side-by-side" : "Add another line or view comparison";
  }

  function toggleCompare(id) {
    if (!products[id]) return;
    var i = cmpList.indexOf(id);
    if (i > -1) cmpList.splice(i, 1);
    else {
      if (cmpList.length >= 4) cmpList.shift();
      cmpList.push(id);
    }
    syncCompareUI();
  }

  D.openCompare = function (ids) {
    var picks = (ids || cmpList).filter(function (id, idx, arr) {
      return products[id] && arr.indexOf(id) === idx;
    }).slice(0, 4);
    if (!picks.length || !cd) return;
    var items = picks.map(function (id) { return products[id]; });
    var specKeys = [];
    items.forEach(function (p) {
      if (!p.specs) return;
      Object.keys(p.specs).forEach(function (k) {
        if (!specKeys.some(function (ek) { return ek.toLowerCase() === k.toLowerCase(); })) specKeys.push(k);
      });
    });
    function specFor(p, key) {
      if (!p.specs) return "—";
      var found = Object.keys(p.specs).filter(function (k) { return k.toLowerCase() === key.toLowerCase(); })[0];
      return found ? p.specs[found] : "—";
    }
    cd.innerHTML =
      '<div class="sheet-head">' +
        '<div class="sheet-head-titles">' +
          '<p class="card-meta">Side-by-Side Comparison</p>' +
          '<h2 id="cmpTitle">Compare Equipment Specifications</h2>' +
        '</div>' +
        '<form method="dialog"><button class="close" aria-label="Close">Close</button></form>' +
      '</div>' +
      '<div class="sheet-body">' +
        '<div class="cmp-table-wrap"><table class="cmp-table">' +
          '<thead><tr><th scope="row">Product Line</th>' + items.map(function (p) {
            return '<th><div class="cmp-col-head">' +
              D.media(p, brands[p.brand].name + " " + p.name) +
              '<span class="card-meta">' + cats[p.category].name + "</span>" +
              "<strong>" + brands[p.brand].name + " · " + p.name + "</strong>" +
              '<div class="cmp-col-acts"><button type="button" class="link" data-product="' + p.id + '">Full specs</button>' +
              '<button type="button" class="add add-mini" data-add="' + p.id + '">+ Add to project list</button></div>' +
            "</div></th>";
          }).join("") + "</tr></thead>" +
          "<tbody>" +
            "<tr><th scope=\"row\">System / Plant Loops</th>" + items.map(function (p) {
              var s = D.systemBadgesHtml(D.systemTags(p));
              return "<td>" + (s || "—") + "</td>";
            }).join("") + "</tr>" +
            "<tr><th scope=\"row\">Summary</th>" + items.map(function (p) {
              return "<td>" + p.summary + "</td>";
            }).join("") + "</tr>" +
            "<tr><th scope=\"row\">Key Engineering Points</th>" + items.map(function (p) {
              return "<td>" + (p.features.length ? '<ul class="ticks">' + p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>" : "—") + "</td>";
            }).join("") + "</tr>" +
            specKeys.map(function (k) {
              return "<tr><th scope=\"row\">" + k + "</th>" + items.map(function (p) {
                return "<td>" + specFor(p, k) + "</td>";
              }).join("") + "</tr>";
            }).join("") +
            "<tr><th scope=\"row\">Facility Applications</th>" + items.map(function (p) {
              return '<td><div class="tags">' + (p.buildings.length ? p.buildings.map(function (bId) {
                return '<button type="button" class="tag-btn" data-cmp-bld="' + bId + '">' + buildings[bId].name + "</button>";
              }).join("") : "<span>General commercial</span>") + "</div></td>";
            }).join("") + "</tr>" +
          "</tbody>" +
        "</table></div>" +
      '</div>' +
      '<div class="sheet-foot"><div class="sheet-actions">' +
        '<button type="button" class="btn btn-line" data-cmp-clear>Clear comparison queue</button>' +
        '<button type="button" class="btn btn-primary" data-cmp-schedule>Review project schedule</button>' +
      "</div></div>";
    cd.querySelectorAll("[data-add]").forEach(syncAddBtn);
    if (!cd.open) cd.showModal();
  };

  /* ---------- project list, Basis-of-Design schedule & Spec Match Cart ---------- */

  var ld = $("#listDialog");
  var scDialog = $("#specCartDialog");
  function escAttr(s) { return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  function extractSpecCtx(btn) {
    if (!btn) return null;
    var entryId = btn.dataset.entryId || btn.dataset.cartBundle || "";
    var bod = btn.dataset.bod || "";
    var reqsArr = btn.dataset.reqs ? btn.dataset.reqs.split("||").filter(Boolean) : [];
    var inSpec = Boolean(entryId || btn.closest("#spec-match"));
    if (!inSpec) return null;
    var xr = entryId ? xrefLookup[entryId] : null;
    return {
      fromSpecMatch: true,
      entryId: entryId,
      bod: bod,
      reqs: reqsArr,
      specText: (xr && xr.specText) || ""
    };
  }

  function buildScheduleText(isComplianceReview) {
    var pr = meta.proj;
    var lines = [
      "Hello DMR,",
      "",
      isComplianceReview
        ? "Please perform a full compliance review for the following project and Spec Match selections:"
        : "Please review the following Basis-of-Design equipment schedule:",
      "",
      "Project Name: " + (pr.name || "(Not specified)"),
      "Contact Name: " + (pr.contactName || "(Not specified)"),
      "Contact Email: " + (pr.contactEmail || "(Not specified)"),
      "Contact Phone: " + (pr.contactPhone || "(Not specified)"),
      "Location: " + (pr.location || "(Not specified)"),
      "Engineer / Firm: " + (pr.engineer || "(Not specified)"),
      "Project Phase / Target Date: " + (pr.phase || "(Not specified)"),
      "Additional Information: " + (pr.additionalInfo || "(None)"),
      "",
      "EQUIPMENT SCHEDULE:",
      "------------------------------------------------------------"
    ];
    list.forEach(function (id, idx) {
      var p = products[id], m = ensureItemMeta(id), sys = D.systemTags(p).map(function (t) { return t.label; }).join(" / ");
      var sp = specSummary(p);
      lines.push((m.tag || defaultTag(id, idx)) + " (Qty: " + (m.qty || 1) + ") — " + brands[p.brand].name + " · " + p.name);
      lines.push("  Category: " + cats[p.category].name + (sys ? " | System: " + sys : ""));
      if (m.role) lines.push("  Application / Role: " + m.role);
      if (m.bod) lines.push("  Basis of Design Reference: " + m.bod);
      if (m.reqs && m.reqs.length) lines.push("  Matched Spec Requirements: " + m.reqs.join("; "));
      if (sp) lines.push("  Basis Spec: " + sp);
      if (m.specText) lines.push("  Division 23 Spec Language: " + m.specText);
      if (m.notes) lines.push("  Design Notes (CFM / Capacity / Conditions): " + m.notes);
      lines.push("");
    });
    return lines.join("\n");
  }

  function syncMailLink() {
    var mailBtn = $("#scheduleMailBtn", ld);
    if (!mailBtn) return;
    var subj = "Basis-of-Design Schedule" + (meta.proj.name ? ": " + meta.proj.name : " Inquiry");
    mailBtn.href = "mailto:" + D.company.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(buildScheduleText(false));
  }

  function exportScheduleCsv() {
    var rows = [["Tag", "Qty", "Category", "Manufacturer", "Product Line", "System Type", "Application / Role", "BOD Reference", "Matched Spec Requirements", "Key Specification", "Design Notes", "Project Name", "Contact Name", "Contact Email", "Contact Phone", "Location", "Engineer / Firm", "Additional Info"]];
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
        m.bod || "",
        (m.reqs && m.reqs.length) ? m.reqs.join("; ") : "",
        specSummary(p),
        m.notes || "",
        meta.proj.name || "",
        meta.proj.contactName || "",
        meta.proj.contactEmail || "",
        meta.proj.contactPhone || "",
        meta.proj.location || "",
        meta.proj.engineer || "",
        meta.proj.additionalInfo || ""
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
            '<label><span>Contact name</span><input type="text" data-proj="contactName" placeholder="e.g., Jordan Lee, PE" value="' + escAttr(pr.contactName) + '"></label>' +
            '<label><span>Contact email</span><input type="email" data-proj="contactEmail" placeholder="e.g., jlee@smithmep.com" value="' + escAttr(pr.contactEmail) + '"></label>' +
            '<label><span>Contact phone</span><input type="tel" data-proj="contactPhone" placeholder="e.g., (301) 555-0148" value="' + escAttr(pr.contactPhone) + '"></label>' +
            '<label><span>Location (City / State)</span><input type="text" data-proj="location" placeholder="e.g., Bethesda, MD" value="' + escAttr(pr.location) + '"></label>' +
            '<label><span>Engineer / Firm</span><input type="text" data-proj="engineer" placeholder="e.g., Smith MEP Engineers" value="' + escAttr(pr.engineer) + '"></label>' +
            '<label><span>Design phase / Schedule</span><input type="text" data-proj="phase" placeholder="e.g., DD / Q3 Bid" value="' + escAttr(pr.phase) + '"></label>' +
            '<label><span>Additional info</span><input type="text" data-proj="additionalInfo" placeholder="Optional compliance notes or schedule targets" value="' + escAttr(pr.additionalInfo) + '"></label>' +
          '</div>' +
          '<ul class="pl sched-list">' + list.map(function (id, idx) {
            var p = products[id], m = ensureItemMeta(id), sys = D.systemTags(p), sp = specSummary(p);
            var reqHtml = (m.reqs && m.reqs.length)
              ? '<div class="sc-item-reqs">' + m.reqs.map(function (r) {
                  return '<span class="sc-req-pill">&#10003; ' + escHtml(r) + "</span>";
                }).join("") + "</div>"
              : "";
            return '<li class="sched-item" data-sched-id="' + id + '">' +
              '<div class="sched-head">' +
                '<div class="sched-title">' +
                  '<span class="card-meta">' + cats[p.category].name + "</span>" +
                  '<button type="button" class="link sched-prod" data-product="' + id + '"><strong>' + brands[p.brand].name + "</strong> · " + p.name + "</button>" +
                  D.systemBadgesHtml(sys) +
                  reqHtml +
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
        : '<p class="lede-sm">Your project schedule is empty. Add equipment from the 3D building walkthrough, Spec Match, or the product catalog to build a Basis-of-Design schedule.</p>') +
      '</div>' +
      (list.length
        ? '<div class="sheet-foot"><div class="sheet-actions">' +
            '<a class="btn btn-primary" id="scheduleMailBtn" href="#">Email schedule to DMR</a>' +
            '<button class="btn btn-line" type="button" data-sc-open>Spec Cart Check Out</button>' +
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

  function renderSpecCart(focusCheckout) {
    if (!scDialog) return;
    var pr = meta.proj;
    scDialog.innerHTML =
      '<div class="sheet-head">' +
        '<div class="sheet-head-titles">' +
          '<p class="card-meta">DMR Specification Compliance Review</p>' +
          '<h2 id="scTitle">Spec Match Shopping Cart &amp; Check Out</h2>' +
        "</div>" +
        '<form method="dialog"><button class="close" aria-label="Close">Close</button></form>' +
      "</div>" +
      '<div class="sheet-body">' +
      (list.length
        ? '<p class="lede-sm">Review your queued Spec Match equipment below, then complete required Project Name and Contact Info to submit to DMR for a full compliance review.</p>' +
          '<ul class="pl sched-list">' + list.map(function (id, idx) {
            var p = products[id], m = ensureItemMeta(id), sys = D.systemTags(p), sp = specSummary(p);
            var reqHtml = (m.reqs && m.reqs.length)
              ? '<div class="sc-item-reqs">' + m.reqs.map(function (r) {
                  return '<span class="sc-req-pill">&#10003; ' + escHtml(r) + "</span>";
                }).join("") + "</div>"
              : "";
            return '<li class="sched-item" data-sc-id="' + id + '">' +
              '<div class="sched-head">' +
                '<div class="sched-title">' +
                  '<span class="card-meta">' + escHtml(cats[p.category].name) + "</span>" +
                  '<button type="button" class="link sched-prod" data-product="' + id + '"><strong>' + escHtml(brands[p.brand].name) + "</strong> · " + escHtml(p.name) + "</button>" +
                  (m.bod ? '<p class="sc-item-bod">Basis of Design: <strong>' + escHtml(m.bod) + "</strong></p>" : "") +
                  D.systemBadgesHtml(sys) +
                  reqHtml +
                  (sp ? '<p class="sched-spec">' + escHtml(sp) + "</p>" : "") +
                "</div>" +
                '<button class="link sched-rm" type="button" data-sc-remove="' + id + '">Remove</button>' +
              "</div>" +
              '<div class="sched-fields">' +
                '<label class="sched-tag"><span>Tag / Mark</span><input type="text" data-sc-item-field="tag" value="' + escAttr(m.tag || defaultTag(id, idx)) + '" placeholder="AHU-1"></label>' +
                '<label class="sched-qty"><span>Qty</span><input type="number" min="1" max="999" data-sc-item-field="qty" value="' + escAttr(m.qty || 1) + '"></label>' +
                '<label class="sched-role"><span>Application / Role</span><input type="text" data-sc-item-field="role" value="' + escAttr(m.role) + '" placeholder="e.g., Matched AHU replacement"></label>' +
                '<label class="sched-notes"><span>Design conditions / Notes</span><input type="text" data-sc-item-field="notes" value="' + escAttr(m.notes) + '" placeholder="e.g., CFM, ESP, coil entering/leaving temps"></label>' +
              "</div>" +
            "</li>";
          }).join("") + "</ul>" +
          '<form class="sc-checkout-box" data-sc-form novalidate>' +
            '<div class="sc-checkout-head">' +
              "<h3>Check Out — Request Full DMR Compliance Review</h3>" +
              '<p class="sc-checkout-note">Fields marked with <span class="sc-req-star">*</span> are required (Project Name, Contact Name, and Contact Email or Phone).</p>' +
            "</div>" +
            '<div class="sc-alert sc-alert-error" data-sc-error hidden role="alert"></div>' +
            '<div class="sc-alert sc-alert-success" data-sc-success hidden role="status"></div>' +
            '<div class="sc-checkout-grid">' +
              '<label><span>Project Name <span class="sc-req-star">*</span></span><input type="text" required data-sc-proj="name" placeholder="e.g., Bethesda Medical Center Wing B" value="' + escAttr(pr.name) + '"></label>' +
              '<label><span>Contact Name <span class="sc-req-star">*</span></span><input type="text" required data-sc-proj="contactName" placeholder="e.g., Jordan Lee, PE" value="' + escAttr(pr.contactName) + '"></label>' +
              '<label><span>Contact Email <span class="sc-req-star">*</span></span><input type="email" data-sc-proj="contactEmail" placeholder="e.g., jlee@smithmep.com (or enter phone)" value="' + escAttr(pr.contactEmail) + '"></label>' +
              '<label><span>Contact Phone</span><input type="tel" data-sc-proj="contactPhone" placeholder="e.g., (301) 555-0148" value="' + escAttr(pr.contactPhone) + '"></label>' +
              '<label><span>Company / Engineering Firm</span><input type="text" data-sc-proj="engineer" placeholder="e.g., Smith MEP Engineers" value="' + escAttr(pr.engineer) + '"></label>' +
              '<label><span>Location (City / State)</span><input type="text" data-sc-proj="location" placeholder="e.g., Bethesda, MD" value="' + escAttr(pr.location) + '"></label>' +
              '<label class="sc-full"><span>Additional Information for Full Compliance Review</span><textarea rows="3" data-sc-proj="additionalInfo" placeholder="Share airflow/CFM, ESP, electrical constraints, control sequence, acoustic targets, or project schedule...">' + escHtml(pr.additionalInfo) + "</textarea></label>" +
            "</div>" +
            '<div class="sheet-actions sc-form-acts">' +
              '<button class="btn btn-primary" type="submit" data-sc-checkout>Check Out — Submit for Full Compliance Review</button>' +
              '<button class="btn btn-line" type="button" data-sc-copy>Copy Review Request</button>' +
              '<button class="btn btn-line" type="button" data-export-csv>Download CSV Schedule</button>' +
              '<button class="btn btn-line" type="button" data-sc-clear>Clear Cart</button>' +
            "</div>" +
          "</form>"
        : '<p class="lede-sm">Your Spec Match Cart is empty. Select a Basis-of-Design model or product category in Spec Match and click <strong>+ Add Spec Match to Cart</strong> or <strong>+ Add to Spec Cart</strong> on any DMR match.</p>' +
          '<div class="sc-empty-acts"><button type="button" class="btn btn-primary" data-sc-goto-spec>Go to Spec Match</button></div>') +
      "</div>";
    if (focusCheckout && list.length) {
      var box = scDialog.querySelector("[data-sc-form]");
      var target = scDialog.querySelector('[data-sc-proj="name"]');
      if (box && box.scrollIntoView) box.scrollIntoView({ block: "nearest" });
      if (target) setTimeout(function () { target.focus(); }, 30);
    }
  }

  function openSpecCart(focusCheckout) {
    if (!scDialog) return;
    if (ld && ld.open) ld.close();
    renderSpecCart(focusCheckout);
    if (!scDialog.open) scDialog.showModal();
    else if (focusCheckout) renderSpecCart(true);
  }

  if (scDialog) {
    scDialog.addEventListener("input", function (e) {
      var t = e.target;
      if (t.dataset.scProj) {
        meta.proj[t.dataset.scProj] = t.value;
        saveMeta();
        t.classList.remove("is-invalid");
        if ((t.dataset.scProj === "contactEmail" || t.dataset.scProj === "contactPhone") && t.value.trim()) {
          var em = scDialog.querySelector('[data-sc-proj="contactEmail"]');
          var ph = scDialog.querySelector('[data-sc-proj="contactPhone"]');
          if (em && t.dataset.scProj === "contactPhone") em.classList.remove("is-invalid");
          if (ph && t.dataset.scProj === "contactEmail") ph.classList.remove("is-invalid");
        }
        var errBox = scDialog.querySelector("[data-sc-error]");
        if (errBox) errBox.hidden = true;
      } else if (t.dataset.scItemField) {
        var row = t.closest("[data-sc-id]");
        if (row) {
          var m = ensureItemMeta(row.dataset.scId);
          m[t.dataset.scItemField] = t.dataset.scItemField === "qty" ? Math.max(1, parseInt(t.value, 10) || 1) : t.value;
          saveMeta();
        }
      }
    });
    scDialog.addEventListener("submit", function (e) {
      if (!e.target.closest("[data-sc-form]")) return;
      e.preventDefault();
      var pr = meta.proj;
      var nameEl = scDialog.querySelector('[data-sc-proj="name"]');
      var cnameEl = scDialog.querySelector('[data-sc-proj="contactName"]');
      var emailEl = scDialog.querySelector('[data-sc-proj="contactEmail"]');
      var phoneEl = scDialog.querySelector('[data-sc-proj="contactPhone"]');
      var errBox = scDialog.querySelector("[data-sc-error]");
      var okBox = scDialog.querySelector("[data-sc-success]");
      scDialog.querySelectorAll(".is-invalid").forEach(function (el) { el.classList.remove("is-invalid"); });
      if (okBox) { okBox.hidden = true; okBox.innerHTML = ""; }
      var errs = [];
      var firstBad = null;
      var nameVal = (pr.name || "").trim();
      var cnameVal = (pr.contactName || "").trim();
      var emailVal = (pr.contactEmail || "").trim();
      var phoneVal = (pr.contactPhone || "").trim();
      if (!nameVal) {
        errs.push("Project Name");
        if (nameEl) { nameEl.classList.add("is-invalid"); firstBad = firstBad || nameEl; }
      }
      if (!cnameVal) {
        errs.push("Contact Name");
        if (cnameEl) { cnameEl.classList.add("is-invalid"); firstBad = firstBad || cnameEl; }
      }
      if (!emailVal && !phoneVal) {
        errs.push("Contact Email or Phone");
        if (emailEl) { emailEl.classList.add("is-invalid"); firstBad = firstBad || emailEl; }
        if (phoneEl) phoneEl.classList.add("is-invalid");
      } else if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        errs.push("a valid Contact Email address");
        if (emailEl) { emailEl.classList.add("is-invalid"); firstBad = firstBad || emailEl; }
      }
      if (errs.length) {
        if (errBox) {
          errBox.textContent = "Please complete required fields before checking out: " + errs.join(", ") + ".";
          errBox.hidden = false;
        }
        if (firstBad) firstBad.focus();
        return;
      }
      if (errBox) errBox.hidden = true;
      var subj = "Full Compliance Review Request: " + nameVal;
      var body = buildScheduleText(true);
      var mailUrl = "mailto:" + D.company.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
      if (okBox) {
        okBox.innerHTML =
          "<strong>Compliance review request ready!</strong> Your inquiry for <strong>" + escHtml(nameVal) +
          "</strong> (Contact: " + escHtml(cnameVal) + ") is prepared for DMR engineering review at " +
          escHtml(D.company.email) + '. <a class="link" href="' + escAttr(mailUrl) + '">Open email draft</a>';
        okBox.hidden = false;
      }
      try {
        var mailA = document.createElement("a");
        mailA.href = mailUrl;
        mailA.style.display = "none";
        document.body.appendChild(mailA);
        mailA.click();
        document.body.removeChild(mailA);
      } catch (err) { /* fallback link shown in okBox */ }
    });
  }

  /* ---------- global events ---------- */

  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-add]"))) { toggleList(t.dataset.add, t.dataset.role || "", extractSpecCtx(t)); return; }
    if ((t = e.target.closest("[data-cart-bundle]"))) { if (t.dataset.cartPid) { toggleList(t.dataset.cartPid, t.dataset.role || "", extractSpecCtx(t)); } return; }
    if ((t = e.target.closest("[data-cart-remove]"))) { toggleList(t.dataset.cartRemove); if (scDialog && scDialog.open) renderSpecCart(); return; }
    if ((t = e.target.closest("[data-sc-remove]"))) { toggleList(t.dataset.scRemove); renderSpecCart(); return; }
    if (e.target.closest("[data-sc-clear]")) {
      if (!list.length || !confirm("Clear all items from your Spec Match Cart?")) return;
      list = []; saveList(true); renderSpecCart(); return;
    }
    if (e.target.closest("[data-sc-open]")) { openSpecCart(false); return; }
    if (e.target.closest("[data-sc-goto-spec]")) {
      if (scDialog && scDialog.open) scDialog.close();
      var sm = $("#spec-match");
      if (sm && sm.scrollIntoView) sm.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if ((t = e.target.closest("[data-compare]"))) { toggleCompare(t.dataset.compare); return; }
    if ((t = e.target.closest("[data-compare-role]"))) { D.openCompare(t.dataset.compareRole.split(",")); return; }
    if ((t = e.target.closest("[data-home-compare]"))) { D.openCompare(t.dataset.homeCompare.split(",")); return; }
    if ((t = e.target.closest("[data-home-bld]"))) { if (D.showBuilding) D.showBuilding(t.dataset.homeBld, true); return; }
    if ((t = e.target.closest("[data-home-sys]"))) { D.filterCatalog({ system: t.dataset.homeSys }, true); return; }
    if ((t = e.target.closest("[data-filter-app]"))) { D.filterCatalog({ app: t.dataset.filterApp }, true); return; }
    if ((t = e.target.closest("[data-cmp-bld]"))) {
      if (cd && cd.open) cd.close();
      if (D.showBuilding) D.showBuilding(t.dataset.cmpBld, true);
      return;
    }
    if (e.target.closest("[data-cmp-clear]")) { cmpList = []; syncCompareUI(); if (cd && cd.open) cd.close(); return; }
    if (e.target.closest("[data-cmp-schedule]")) { if (cd && cd.open) cd.close(); openList(); return; }
    if ((t = e.target.closest("[data-remove]"))) { toggleList(t.dataset.remove); renderList(); return; }
    if (e.target.closest("[data-clear]")) {
      if (!list.length || !confirm("Clear all items from your project schedule?")) return;
      list = []; saveList(true); renderList(); return;
    }
    if (e.target.closest("[data-export-csv]")) { exportScheduleCsv(); return; }
    if ((t = e.target.closest("[data-copy-spec]"))) {
      var xr = xrefLookup[t.dataset.copySpec];
      if (xr && xr.specText) {
        var markCopied = function () {
          var orig = t.textContent;
          t.textContent = "✓ Spec text copied!";
          setTimeout(function () { t.textContent = orig; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(xr.specText).then(markCopied, function () {
            var ta = document.createElement("textarea");
            ta.value = xr.specText;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); markCopied(); } catch (err) { /* ignore */ }
            document.body.removeChild(ta);
          });
        } else {
          var ta2 = document.createElement("textarea");
          ta2.value = xr.specText;
          document.body.appendChild(ta2);
          ta2.select();
          try { document.execCommand("copy"); markCopied(); } catch (err2) { /* ignore */ }
          document.body.removeChild(ta2);
        }
      }
      return;
    }
    if ((t = e.target.closest("[data-copy-schedule]"))) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(buildScheduleText(false)).then(function () {
          var orig = t.textContent;
          t.textContent = "Copied!";
          setTimeout(function () { t.textContent = orig; }, 1800);
        });
      }
      return;
    }
    if ((t = e.target.closest("[data-sc-copy]"))) {
      var reqText = buildScheduleText(true);
      var markReqCopied = function () {
        var orig = t.textContent;
        t.textContent = "✓ Request copied!";
        setTimeout(function () { t.textContent = orig; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(reqText).then(markReqCopied, function () {
          var ta = document.createElement("textarea");
          ta.value = reqText;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); markReqCopied(); } catch (err3) { /* ignore */ }
          document.body.removeChild(ta);
        });
      } else {
        var ta3 = document.createElement("textarea");
        ta3.value = reqText;
        document.body.appendChild(ta3);
        ta3.select();
        try { document.execCommand("copy"); markReqCopied(); } catch (err4) { /* ignore */ }
        document.body.removeChild(ta3);
      }
      return;
    }
    if ((t = e.target.closest("[data-shot]"))) { showShot(t.closest(".pgal"), Number(t.dataset.shot)); return; }
    if ((t = e.target.closest("[data-shot-step]"))) { var gal = t.closest(".pgal"); showShot(gal, Number(gal.dataset.at) + Number(t.dataset.shotStep)); return; }
    if ((t = e.target.closest("[data-product]"))) { D.openProduct(t.dataset.product); return; }
    if ((t = e.target.closest("dialog [data-stop]"))) {
      if (pd && pd.open) pd.close();
      if (cd && cd.open) cd.close();
      if (scDialog && scDialog.open) scDialog.close();
      D.goToStop(t.dataset.stop, true, Number(t.dataset.item) || 0);
      return;
    }
    // Click on the backdrop closes a dialog.
    if (e.target.tagName === "DIALOG") e.target.close();
  });
  $("#listBtn").addEventListener("click", openList);
  $("#contactList").addEventListener("click", openList);
  if ($("#homeScheduleBtn")) $("#homeScheduleBtn").addEventListener("click", openList);
  if ($("#compareOpenBtn")) $("#compareOpenBtn").addEventListener("click", function () { D.openCompare(cmpList); });
  if ($("#compareClearBtn")) $("#compareClearBtn").addEventListener("click", function () { cmpList = []; syncCompareUI(); });
  if ($("#xrefCartBtn")) $("#xrefCartBtn").addEventListener("click", function () { openSpecCart(false); });
  if ($("#xrefCheckoutBtn")) $("#xrefCheckoutBtn").addEventListener("click", function () { openSpecCart(true); });
  if ($("#xrefCartClearBtn")) $("#xrefCartClearBtn").addEventListener("click", function () {
    if (!list.length || !confirm("Clear all items from your Spec Match Cart?")) return;
    list = []; saveList(true); if (scDialog && scDialog.open) renderSpecCart();
  });

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
    if (!pages[id]) id = "home";
    if (id === curPage) { window.scrollTo({ top: 0, behavior: "instant" }); return; }
    setPage(id);
    if (location.hash !== "#" + id) location.hash = id;
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
  initCrossRef();
  saveList();

  // Deep link: #product/<id>
  function route() {
    var m = location.hash.match(/^#product\/(.+)$/);
    if (m) D.openProduct(m[1]);
  }
  window.addEventListener("hashchange", route);
  route();
})();
