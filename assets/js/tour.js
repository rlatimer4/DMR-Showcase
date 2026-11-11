/* DMR Showcase — interactive campus walkthrough (generated SVG cross-section). */
(function () {
  "use strict";
  var D = window.DMR, L = D.lookup;
  var svg = document.getElementById("scene");
  var panel = document.getElementById("tourPanel");
  var tabs = document.getElementById("tourTabs");
  var G = 560;                       // ground line
  var FULL = [-10, 20, 1630, 600];    // whole-campus viewBox
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var buildings = D.tour.buildings;
  var stops = [];                    // flat tour order
  buildings.forEach(function (b) {
    b.top = G - b.floors * b.fh;
    b.stops.forEach(function (s) {
      s.building = b;
      s.n = stops.length + 1;
      s.px = b.x + s.at.x * b.w;
      s.py = s.at.floor === "roof" ? b.top - 17 : G - (s.at.floor + 0.5) * b.fh;
      stops.push(s);
    });
  });
  document.getElementById("stopTotal").textContent = stops.length;

  var cur = { building: null, stop: null };

  /* ---------- scene ---------- */

  function buildingSvg(b) {
    var o = '<g class="bld" data-building="' + b.id + '">';
    o += '<rect class="bld-hit" x="' + (b.x - 10) + '" y="' + (b.top - 50) + '" width="' + (b.w + 20) + '" height="' + (G - b.top + 50) + '"/>';
    // highlighted rooms + room labels
    b.stops.forEach(function (s) {
      if (s.at.floor === "roof") return;
      var cw = b.w / b.cols, col = Math.min(b.cols - 1, Math.floor(s.at.x * b.cols));
      var ry = G - (s.at.floor + 1) * b.fh;
      o += '<rect class="room" data-room="' + s.id + '" x="' + (b.x + col * cw) + '" y="' + ry + '" width="' + cw + '" height="' + b.fh + '"/>';
      if (s.room) o += '<text class="room-label" x="' + (b.x + col * cw + 6) + '" y="' + (ry + 13) + '">' + s.room.toUpperCase() + "</text>";
    });
    o += '<rect class="shell" x="' + b.x + '" y="' + b.top + '" width="' + b.w + '" height="' + (G - b.top) + '"/>';
    var i;
    for (i = 1; i < b.floors; i++) o += '<line class="thin" x1="' + b.x + '" x2="' + (b.x + b.w) + '" y1="' + (G - i * b.fh) + '" y2="' + (G - i * b.fh) + '"/>';
    for (i = 1; i < b.cols; i++) o += '<line class="thin dim" x1="' + (b.x + i * b.w / b.cols) + '" x2="' + (b.x + i * b.w / b.cols) + '" y1="' + b.top + '" y2="' + G + '"/>';
    // interior detail
    if (b.id === "datacenter") {
      for (i = 0; i < 9; i++) o += '<rect class="rack" x="' + (b.x + 22 + i * 25) + '" y="' + (G - 62) + '" width="15" height="62"/>';
      o += '<line class="thin dim" x1="' + b.x + '" x2="' + (b.x + b.w) + '" y1="' + (G - 14) + '" y2="' + (G - 14) + '"/>';
    }
    if (b.id === "industrial") {
      var pts = [];
      for (i = 0; i <= 10; i++) pts.push((b.x + i * b.w / 10) + "," + (b.top + (i % 2 ? 22 : 4)));
      o += '<polyline class="thin dim" fill="none" points="' + pts.join(" ") + '"/>';
      o += '<rect class="rack" x="' + (b.x + b.w - 50) + '" y="' + (G - 70) + '" width="50" height="70"/>';
      for (i = 0; i < 3; i++) o += '<rect class="rack" x="' + (b.x + 30 + i * 34) + '" y="' + (G - 44 - (i % 2) * 14) + '" width="26" height="' + (44 + (i % 2) * 14) + '"/>';
    }
    // rooftop equipment + supply riser with moving air
    b.stops.forEach(function (s) {
      if (s.at.floor !== "roof") return;
      var ux = s.px - 38, uy = b.top - 34;
      o += '<rect class="unit" x="' + ux + '" y="' + uy + '" width="76" height="34" rx="2"/>' +
        '<circle class="fan" cx="' + (ux + 14) + '" cy="' + (uy + 17) + '" r="7"/><circle class="fan" cx="' + (ux + 62) + '" cy="' + (uy + 17) + '" r="7"/>' +
        '<path class="air" d="M' + (ux + 68) + " " + b.top + " V" + (G - 12) + '"/>' +
        '<path class="air return" d="M' + (ux + 8) + " " + (G - 12) + " V" + b.top + '"/>';
    });
    o += '<text class="bld-label" x="' + (b.x + b.w / 2) + '" y="' + (G + 30) + '">' + b.name.toUpperCase() + "</text>";
    o += "</g>";
    return o;
  }

  function hotspotSvg(s) {
    return '<g class="hs" data-stop="' + s.id + '" tabindex="0" role="button" aria-label="Stop ' + s.n + ": " + s.building.name + ", " + s.title + '">' +
      '<circle class="hs-pulse" cx="' + s.px + '" cy="' + s.py + '" r="12"/>' +
      '<circle class="hs-dot" cx="' + s.px + '" cy="' + s.py + '" r="12"/>' +
      '<text x="' + s.px + '" y="' + (s.py + 4) + '">' + s.n + "</text></g>";
  }

  svg.setAttribute("viewBox", FULL.join(" "));
  svg.innerHTML =
    '<defs><pattern id="bp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" class="bp-line"/></pattern></defs>' +
    '<rect x="-400" y="-200" width="2400" height="1200" fill="url(#bp)"/>' +
    '<line class="ground" x1="-400" x2="2000" y1="' + G + '" y2="' + G + '"/>' +
    buildings.map(buildingSvg).join("") + stops.map(hotspotSvg).join("");

  /* ---------- camera ---------- */

  var vb = FULL.slice(), raf;
  function flyTo(target) {
    cancelAnimationFrame(raf);
    if (reduce) { vb = target.slice(); svg.setAttribute("viewBox", vb.join(" ")); return; }
    var from = vb.slice(), t0 = performance.now();
    (function step(now) {
      var t = Math.min(1, (now - t0) / 650), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      vb = from.map(function (v, i) { return v + (target[i] - v) * e; });
      svg.setAttribute("viewBox", vb.join(" "));
      if (t < 1) raf = requestAnimationFrame(step);
    })(t0);
  }
  function frame(b) {
    if (!b) return FULL;
    var y = b.top - 80, h = G + 50 - y, w = Math.max(b.w + 120, h * 1.5);
    return [b.x + b.w / 2 - w / 2, y, w, h];
  }

  /* ---------- panel ---------- */

  function chip(id) {
    var p = L.products[id];
    return '<li><button type="button" class="p-chip" data-product="' + id + '"><strong>' + L.brands[p.brand].name + "</strong><span>" + p.name + "</span></button></li>";
  }
  function stopList(list) {
    return '<ol class="stop-list">' + list.map(function (s) {
      return '<li><button type="button" data-goto="' + s.id + '"><span class="num">' + s.n + "</span><span><strong>" + s.title + "</strong><em>" + s.building.name + "</em></span></button></li>";
    }).join("") + "</ol>";
  }

  function render() {
    var b = cur.building, s = cur.stop, h;
    if (s) {
      h = '<p class="panel-step">Stop ' + s.n + " of " + stops.length + " · " + s.building.name + "</p>" +
        "<h3>" + s.title + "</h3><p>" + s.text + "</p>" +
        '<h4>Equipment at this stop</h4><ul class="p-chips">' + s.products.map(chip).join("") + "</ul>" +
        '<div class="panel-nav"><button type="button" class="btn btn-line-dark" data-step="-1"' + (s.n === 1 ? " disabled" : "") + ">Previous</button>" +
        '<button type="button" class="btn btn-primary" data-step="1">' + (s.n === stops.length ? "Finish tour" : "Next stop") + "</button></div>";
    } else if (b) {
      h = '<p class="panel-step">' + b.stops.length + " stops</p><h3>" + b.name + "</h3><p>" + b.intro + "</p>" + stopList(b.stops) +
        '<button type="button" class="link on-dark" data-market="' + b.id + '">See all products for this building type</button>';
    } else {
      h = '<p class="panel-step">' + buildings.length + " buildings · " + stops.length + " stops</p><h3>The campus</h3>" +
        "<p>Each building is drawn in cross-section. Blue lines show supply air and amber lines show return air.</p>" +
        '<button type="button" class="btn btn-primary" data-goto="' + stops[0].id + '">Start guided tour</button>' +
        '<ul class="bld-list">' + buildings.map(function (x) {
          return '<li><button type="button" data-bld="' + x.id + '"><strong>' + x.name + "</strong><em>" + x.stops.length + " stops</em></button></li>";
        }).join("") + "</ul>";
    }
    panel.innerHTML = h;
    tabs.querySelectorAll("button").forEach(function (t) { t.setAttribute("aria-pressed", t.dataset.bld === (b ? b.id : "")); });
    svg.querySelectorAll(".hs").forEach(function (g) { g.classList.toggle("active", !!s && g.dataset.stop === s.id); });
    svg.querySelectorAll(".room").forEach(function (r) { r.classList.toggle("active", !!s && r.dataset.room === s.id); });
    svg.querySelectorAll(".bld").forEach(function (g) { g.classList.toggle("dimmed", !!b && g.dataset.building !== b.id); });
    svg.classList.toggle("zoomed", !!b);
  }

  function show(building, stop) {
    cur = { building: building, stop: stop };
    flyTo(frame(building));
    render();
  }
  function findStop(id) { return stops.filter(function (s) { return s.id === id; })[0]; }
  function findBuilding(id) { return buildings.filter(function (b) { return b.id === id; })[0] || null; }

  D.goToStop = function (id, scroll) {
    var s = findStop(id);
    if (!s) return;
    show(s.building, s);
    if (scroll) document.getElementById("walkthrough").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  /* ---------- events ---------- */

  tabs.innerHTML = '<button type="button" data-bld="">Whole campus</button>' + buildings.map(function (b) {
    return '<button type="button" data-bld="' + b.id + '">' + b.name + "</button>";
  }).join("");
  tabs.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (t) show(findBuilding(t.dataset.bld), null);
  });

  svg.addEventListener("click", function (e) {
    var hs = e.target.closest(".hs"), bl = e.target.closest(".bld");
    if (hs) D.goToStop(hs.dataset.stop);
    else if (bl) show(findBuilding(bl.dataset.building), null);
    else show(null, null);
  });
  svg.addEventListener("keydown", function (e) {
    var hs = e.target.closest(".hs");
    if (hs && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); D.goToStop(hs.dataset.stop); }
  });

  panel.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-goto]"))) D.goToStop(t.dataset.goto);
    else if ((t = e.target.closest("[data-bld]"))) show(findBuilding(t.dataset.bld), null);
    else if ((t = e.target.closest("[data-market]"))) D.filterCatalog({ market: t.dataset.market }, true);
    else if ((t = e.target.closest("[data-step]"))) {
      var next = stops[cur.stop.n - 1 + Number(t.dataset.step)];
      if (next) D.goToStop(next.id); else show(null, null);
    }
  });

  document.getElementById("walkthrough").addEventListener("keydown", function (e) {
    if (!cur.stop || e.target.closest("input, select")) return;
    var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    var next = d && stops[cur.stop.n - 1 + d];
    if (next) { e.preventDefault(); D.goToStop(next.id); }
  });

  render();
})();
