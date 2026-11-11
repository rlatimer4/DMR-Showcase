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
  document.getElementById("stopTotal").textContent = stops.length;
  document.getElementById("bldTotal").textContent = buildings.length;

  var cur = { use: null, building: null, stop: null };
  function useName(id) { return D.useTypes.filter(function (u) { return u.id === id; })[0].name; }

  function chip(id) {
    var p = L.products[id];
    return '<li><button type="button" class="p-chip" data-product="' + id + '"><strong>' + L.brands[p.brand].name + "</strong><span>" + p.name + "</span></button></li>";
  }

  function render() {
    var b = cur.building, s = cur.stop, h;
    if (s) {
      h = '<button type="button" class="back" data-bld="' + b.id + '">' + b.name + "</button>" +
        '<p class="panel-step">Stop ' + s.n + " of " + b.stops.length + "</p>" +
        "<h3>" + s.title + "</h3><p>" + s.text + "</p>" +
        '<h4>Equipment at this stop</h4><ul class="p-chips">' + s.products.map(chip).join("") + "</ul>" +
        '<div class="panel-nav"><button type="button" class="btn btn-line" data-step="-1"' + (s.seq === 0 ? " disabled" : "") + ">Previous</button>" +
        '<button type="button" class="btn btn-primary" data-step="1">' + (s.seq === stops.length - 1 ? "Finish tour" : "Next stop") + "</button></div>";
    } else if (b) {
      h = '<button type="button" class="back" data-use="' + b.use + '">' + useName(b.use) + " buildings</button>" +
        '<p class="panel-step">' + useName(b.use) + "</p><h3>" + b.name + "</h3><p>" + b.intro + "</p>" +
        "<h4>Building challenges</h4><ul class='ticks'>" + b.challenges.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
        "<h4>Equipment locations</h4>" +
        '<ol class="stop-list">' + b.stops.map(function (x) {
          return '<li><button type="button" data-goto="' + x.id + '"><span class="num">' + x.n + "</span><span><strong>" + x.title + "</strong><em>" + x.products.length + (x.products.length === 1 ? " product" : " products") + "</em></span></button></li>";
        }).join("") + "</ol>" +
        '<button type="button" class="link" data-catalog="' + b.id + '">See all products for this building type</button>';
    } else {
      var list = buildings.filter(function (x) { return !cur.use || x.use === cur.use; });
      h = '<p class="panel-step">' + list.length + " building types</p><h3>" + (cur.use ? useName(cur.use) : "The DMR world") + "</h3>" +
        "<p>Select a building to open it up and see where the equipment goes. Blue ducts carry supply air and amber ducts carry return air.</p>" +
        '<button type="button" class="btn btn-primary" data-goto="' + (list[0] ? list[0].stops[0].id : "") + '">Start guided tour</button>' +
        '<ul class="bld-list">' + list.map(function (x) {
          return '<li><button type="button" data-bld="' + x.id + '"><strong>' + x.name + "</strong><em>" + (cur.use ? x.stops.length + " stops" : useName(x.use)) + "</em></button></li>";
        }).join("") + "</ul>";
    }
    panel.innerHTML = h;
    panel.scrollTop = 0;
    var active = b ? b.use : (cur.use || "");
    tabs.querySelectorAll("button").forEach(function (t) { t.setAttribute("aria-pressed", t.dataset.use === active); });
  }

  function show(use, building, stop) {
    cur = { use: building ? building.use : use, building: building, stop: stop };
    if (D.view3d) D.view3d.focus(cur);
    render();
  }
  function findStop(id) { return stops.filter(function (s) { return s.id === id; })[0]; }
  function findBuilding(id) { return buildings.filter(function (b) { return b.id === id; })[0] || null; }

  D.goToStop = function (id, scroll) {
    var s = findStop(id);
    if (!s) return;
    show(null, s.building, s);
    if (scroll) document.getElementById("walkthrough").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };
  D.showBuilding = function (id) { show(null, findBuilding(id), null); };
  D.tourState = function () { return cur; };

  tabs.innerHTML = '<button type="button" data-use="">Whole world</button>' + D.useTypes.map(function (u) {
    var n = buildings.filter(function (b) { return b.use === u.id; }).length;
    return n ? '<button type="button" data-use="' + u.id + '">' + u.name + ' <span class="tab-n">' + n + "</span></button>" : "";
  }).join("");
  tabs.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (t) show(t.dataset.use || null, null, null);
  });

  panel.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-goto]"))) D.goToStop(t.dataset.goto);
    else if ((t = e.target.closest("[data-bld]"))) D.showBuilding(t.dataset.bld);
    else if ((t = e.target.closest("[data-use]"))) show(t.dataset.use, null, null);
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
