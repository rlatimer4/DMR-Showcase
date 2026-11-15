/*
 * DMR Showcase — walkthrough state and side panel.
 * The 3D drawing is in scene3d.js; this file works on its own if WebGL is unavailable.
 */
(function () {
  "use strict";
  var D = window.DMR, L = D.lookup;
  var panel = document.getElementById("tourPanel");
  var tabs = document.getElementById("tourTabs");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tour order: district by district, building by building.
  var buildings = D.buildings, stops = [];
  buildings.forEach(function (b) {
    b.stops.forEach(function (s, i) { s.building = b; s.n = i + 1; s.seq = stops.length; stops.push(s); });
  });

  var cur = { use: null, building: null, stop: null };
  var bldQuery = "";
  function useName(id) { return D.useTypes.filter(function (u) { return u.id === id; })[0].name; }
  function escAttr(s) { return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  // Deduplicated system tags across all equipment in a stop.
  function stopSystems(s) {
    var seen = {}, out = [];
    s.equipment.forEach(function (e) {
      var p = L.products[e.product];
      D.systemTags(p, (e.role || "") + " " + (e.note || "") + " " + s.title).forEach(function (t) {
        if (!seen[t.id]) { seen[t.id] = true; out.push(t); }
      });
    });
    return out;
  }

  // One piece of equipment at a stop: what it is here, who makes it, why it suits.
  function chip(e, n) {
    var p = L.products[e.product], sys = D.systemTags(p, (e.role || "") + " " + (e.note || ""));
    var roleCtx = (cur.building ? cur.building.name + " — " : "") + (e.role || p.name);
    var cmpIds = e.also.length ? [e.product].concat(e.also.slice(0, 3).map(function (a) { return a.product; })).join(",") : "";
    return '<li><button type="button" class="p-chip' + (n === cur.item ? " is-shown" : "") + '" data-item="' + n + '" data-product="' + e.product + '">' +
      "<span class='role'>" + (e.role || p.name) + "</span>" +
      "<strong>" + L.brands[p.brand].name + " · " + p.name + "</strong>" +
      D.systemBadgesHtml(sys) +
      (e.note ? "<em>" + e.note + "</em>" : "") + "</button>" +
      '<div class="p-chip-bar"><button type="button" class="link" data-open="' + e.product + '">View specs</button>' +
      (cmpIds ? '<button type="button" class="link" data-compare-role="' + cmpIds + '">Compare options</button>' : "") +
      '<button type="button" class="add add-mini" data-add="' + e.product + '" data-role="' + escAttr(roleCtx) + '">+ Add to project list</button></div>' +
      // other product lines that fit the same role share this model
      (e.also.length ? '<div class="p-also"><span>Other lines that fit here</span>' + e.also.map(function (a) {
        var q = L.products[a.product];
        return '<button type="button" data-open="' + a.product + '"' + (a.note ? ' title="' + escAttr(a.note) + '"' : "") + "><b>" + L.brands[q.brand].name + "</b> " + q.name + "</button>";
      }).join("") + "</div>" : "") + "</li>";
  }

  // Product lines that suit the building type but have no model in it, grouped by product type.
  function alsoHtml(b) {
    if (!b.also.length) return "";
    return "<h4>More product lines for this building type</h4>" + D.categories.map(function (c) {
      var list = b.also.filter(function (id) { return L.products[id].category === c.id; });
      return list.length ? '<div class="p-also p-also-b"><span>' + c.name + "</span>" + list.map(function (id) {
        var q = L.products[id];
        return '<button type="button" data-open="' + id + '"><b>' + L.brands[q.brand].name + "</b> " + q.name + "</button>";
      }).join("") + "</div>" : "";
    }).join("");
  }

  function filteredBuildings() {
    var list = buildings.filter(function (x) { return !cur.use || x.use === cur.use; });
    if (!bldQuery) return list;
    var terms = bldQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return list.filter(function (x) {
      var hay = (x.name + " " + useName(x.use) + " " + (x.intro || "") + " " + x.stops.map(function (st) { return st.title; }).join(" ")).toLowerCase();
      return terms.every(function (w) { return hay.indexOf(w) > -1; });
    });
  }
  function bldListItemsHtml(list) {
    return list.length ? list.map(function (x) {
      return '<li><button type="button" data-bld="' + x.id + '"><strong>' + x.name + "</strong><em>" + useName(x.use) + "</em></button></li>";
    }).join("") : '<li class="empty">No matching building types. Try a broader keyword.</li>';
  }

  function render() {
    var b = cur.building, s = cur.stop, h;
    if (s) {
      var sSys = stopSystems(s);
      h = '<div class="panel-top"><button type="button" class="back" data-bld="' + b.id + '">' + b.name + '</button><span class="panel-step">' + useName(b.use) + "</span></div>" +
        "<h3>" + s.title + "</h3><p>" + s.text + "</p>" +
        (sSys.length ? '<div class="stop-sys">' + D.systemBadgesHtml(sSys, "Broader system:") + "</div>" : "") +
        '<div class="zone-pack-bar"><button type="button" class="btn btn-line btn-sm" data-add-zone="' + s.id + '">+ Add zone package to project list</button></div>' +
        '<h4>Equipment here</h4><ul class="p-chips">' + s.equipment.map(chip).join("") + "</ul>" +
        '<div class="panel-nav"><button type="button" class="btn btn-line" data-step="-1"' + (s.seq === 0 ? " disabled" : "") + ">Previous</button>" +
        '<button type="button" class="btn btn-primary" data-step="1">' + (s.seq === stops.length - 1 ? "Finish tour" : "Next") + "</button></div>";
    } else if (b) {
      h = '<div class="panel-top"><button type="button" class="back" data-use="' + b.use + '">' + useName(b.use) + ' buildings</button><span class="panel-step">' + useName(b.use) + "</span></div>" +
        "<h3>" + b.name + "</h3><p>" + b.intro + "</p>" +
        (b.advantages.length ? "<h4>What a DMR package brings</h4><ul class='adv'>" + b.advantages.map(function (a) {
          return "<li>" + (a.title ? "<strong>" + a.title + "</strong>" : "") + "<span>" + a.text + "</span></li>";
        }).join("") + "</ul>" : "") +
        (b.challenges.length ? "<details><summary>Typical challenges in this building type</summary><ul class='ticks'>" + b.challenges.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></details>" : "") +
        "<h4>Where the equipment goes</h4>" +
        '<ol class="stop-list">' + b.stops.map(function (x) {
          return '<li><button type="button" data-goto="' + x.id + '"><span class="stop-arrow" aria-hidden="true">→</span><span><strong>' + x.title + "</strong><em>" +
            x.equipment.map(function (e) { return e.role || L.products[e.product].name; }).join(" · ") + "</em>" +
            D.systemBadgesHtml(stopSystems(x)) + "</span></button></li>";
        }).join("") + "</ol>" + alsoHtml(b) +
        '<button type="button" class="link" data-catalog="' + b.id + '">See all products for this building type</button>';
    } else {
      var list = filteredBuildings();
      h = "<h3>" + (cur.use ? useName(cur.use) + " buildings" : "The DMR world") + "</h3>" +
        "<p>Select a building to see what a DMR equipment package brings to it, then open it up to see where each piece goes.</p>" +
        '<button type="button" class="btn btn-primary" data-goto="' + (list[0] ? list[0].stops[0].id : (buildings[0] ? buildings[0].stops[0].id : "")) + '">Start guided tour</button>' +
        '<input type="search" class="tour-search" id="tourSearch" value="' + escAttr(bldQuery) + '" placeholder="Filter buildings, e.g. hospital, lab, data center…" autocomplete="off" aria-label="Filter buildings">' +
        '<ul class="bld-list">' + bldListItemsHtml(list) + "</ul>";
    }
    panel.innerHTML = h;
    panel.scrollTop = 0;
    if (D.syncAddBtns) D.syncAddBtns(panel);
    var active = b ? b.use : (cur.use || "");
    tabs.querySelectorAll("button").forEach(function (t) { t.setAttribute("aria-pressed", t.dataset.use === active); });
  }

  function show(use, building, stop, item) {
    cur = { use: building ? building.use : use, building: building, stop: stop, item: stop ? item || 0 : 0 };
    if (D.view3d) D.view3d.focus(cur);
    render();
  }
  function findStop(id) { return stops.filter(function (s) { return s.id === id; })[0]; }
  function findBuilding(id) { return buildings.filter(function (b) { return b.id === id; })[0] || null; }

  D.goToStop = function (id, scroll, item) {
    var s = findStop(id);
    if (!s) return;
    if (scroll) {
      D.showPage("walkthrough");
      if (D.view3d && D.view3d.resize) D.view3d.resize();
    }
    show(null, s.building, s, item);
  };
  // Called when a 3D model is selected: point at it, list its room, and open its product window.
  D.selectEquipment = function (stopId, n, open) {
    var s = findStop(stopId);
    if (!s || !s.equipment[n]) return;
    if (cur.stop !== s) show(null, s.building, s, n);
    else { cur.item = n; if (D.view3d) D.view3d.point(s.id, n); render(); }
    if (open) D.openProduct(s.equipment[n].product);
  };
  D.showBuilding = function (id, scroll) {
    var b = findBuilding(id);
    if (!b) return;
    if (scroll) {
      D.showPage("walkthrough");
      if (D.view3d && D.view3d.resize) D.view3d.resize();
    }
    show(null, b, null);
  };
  D.tourState = function () { return cur; };

  tabs.innerHTML = '<button type="button" data-use="">Whole world</button>' + D.useTypes.map(function (u) {
    var hasAny = buildings.some(function (b) { return b.use === u.id; });
    return hasAny ? '<button type="button" data-use="' + u.id + '">' + u.name + "</button>" : "";
  }).join("");
  tabs.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (t) { bldQuery = ""; show(t.dataset.use || null, null, null); }
  });

  panel.addEventListener("input", function (e) {
    if (e.target && e.target.id === "tourSearch") {
      bldQuery = e.target.value.trim();
      var ul = panel.querySelector(".bld-list");
      if (ul) ul.innerHTML = bldListItemsHtml(filteredBuildings());
    }
  });

  // Hovering or focusing an equipment entry moves the pointer to its model.
  function hover(e) {
    var t = e.target.closest && e.target.closest("[data-item]");
    if (t && cur.stop && D.view3d) D.view3d.point(cur.stop.id, Number(t.dataset.item));
  }
  panel.addEventListener("mouseover", hover);
  panel.addEventListener("focusin", hover);
  panel.addEventListener("mouseleave", function () { if (cur.stop && D.view3d) D.view3d.point(cur.stop.id, cur.item); });
  panel.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-item]")) && cur.stop) { cur.item = Number(t.dataset.item); if (D.view3d) D.view3d.point(cur.stop.id, cur.item); panel.querySelectorAll("[data-item]").forEach(function (c) { c.classList.toggle("is-shown", c === t); }); }
    if ((t = e.target.closest("[data-open]"))) D.openProduct(t.dataset.open);
    else if ((t = e.target.closest("[data-add-zone]")) && cur.stop && D.addZoneToList) {
      D.addZoneToList(cur.stop);
      t.textContent = "✓ Zone package added to project list";
      setTimeout(function () { if (t.isConnected) t.textContent = "+ Add zone package to project list"; }, 2000);
    }
    else if ((t = e.target.closest("[data-goto]"))) D.goToStop(t.dataset.goto);
    else if ((t = e.target.closest("[data-bld]"))) D.showBuilding(t.dataset.bld);
    else if ((t = e.target.closest("[data-use]"))) { bldQuery = ""; show(t.dataset.use, null, null); }
    else if ((t = e.target.closest("[data-catalog]"))) D.filterCatalog({ building: t.dataset.catalog }, true);
    else if ((t = e.target.closest("[data-step]"))) {
      var next = stops[cur.stop.seq + Number(t.dataset.step)];
      if (next) D.goToStop(next.id); else show(null, null, null);
    }
  });

  document.getElementById("walkthrough").addEventListener("keydown", function (e) {
    if (!cur.stop || e.target.closest("input, select")) return;
    var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    var next = d && stops[cur.stop.seq + d];
    if (next) { e.preventDefault(); D.goToStop(next.id); }
  });

  render();
})();
