/*
 * DMR Showcase — installations map.
 *
 * Two renderers share one data set (DMR.installs, each with lat/lng):
 *   - "leaflet": a real, pannable map (Leaflet + the tile server in DMR.mapConfig)
 *   - "schematic": a self-contained SVG drawing, used when tiles cannot load
 * Swapping tile providers (Mapbox, MapTiler, Esri) only means changing
 * DMR.mapConfig.tiles and .attribution in data.js.
 */
(function () {
  "use strict";
  var D = window.DMR, L = D.lookup, cfg = D.mapConfig;
  var el = document.getElementById("map");
  var listEl = document.getElementById("installList");
  var note = document.getElementById("mapNote");
  var btnLive = document.getElementById("mapLive"), btnSch = document.getElementById("mapSchematic");
  var filter = "", selected = null, mode = null;
  var lmap = null, lmarkers = {}, tilesOk = false;

  var COLORS = { healthcare: "#e11d48", labs: "#7c3aed", datacenter: "#0284c7", education: "#059669", office: "#475569", industrial: "#d97706", government: "#4338ca", residential: "#be185d" };
  function visible() { return D.installs.filter(function (i) { return !filter || i.market === filter; }); }
  function popup(i) {
    return "<strong>" + i.name + "</strong><br>" + i.city + " · " + L.markets[i.market].name + " · " + i.year + "<br>" +
      i.products.map(function (p) { return L.brands[L.products[p].brand].name + " " + L.products[p].name; }).join("<br>");
  }

  /* ---------- schematic renderer ---------- */

  var b = cfg.bounds;
  // The drawing uses its own wider frame so it fills a landscape panel.
  var W = 1000, H = 600, sb = { minLat: 36.55, maxLat: 39.8, minLng: -80.47, maxLng: -73.53 };
  function px(lat, lng) {
    return [((lng - sb.minLng) / (sb.maxLng - sb.minLng)) * W, ((sb.maxLat - lat) / (sb.maxLat - sb.minLat)) * H];
  }
  function path(pts) { return pts.map(function (p, i) { return (i ? "L" : "M") + px(p[0], p[1]).map(Math.round).join(" "); }).join(" "); }
  // Rough centre lines, for orientation only.
  var BAY = [[36.95, -76.05], [37.5, -76.15], [38.0, -76.27], [38.45, -76.4], [38.9, -76.4], [39.2, -76.3], [39.45, -76.08], [39.58, -76.0]];
  var POTOMAC = [[38.0, -76.4], [38.25, -76.9], [38.35, -77.27], [38.62, -77.2], [38.87, -77.03], [39.0, -77.25], [39.18, -77.5], [39.32, -77.74]];

  var COAST = [[36.55, -75.87], [36.93, -76.0], [37.12, -75.95], [37.9, -75.35], [38.45, -75.05], [38.8, -75.09], [39.2, -75.4], [39.6, -75.58]];

  function drawSchematic() {
    var o = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" class="sch" role="img" aria-label="Schematic map of sample installations in Maryland, Virginia and Washington DC">' +
      '<defs><pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" class="sch-dot"/></pattern></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#dots)"/>' +
      '<path class="sch-water wide" d="' + path(BAY) + '"/><path class="sch-water" d="' + path(POTOMAC) + '"/><path class="sch-coast" d="' + path(COAST) + '"/>' +
      '<text class="sch-water-label" x="' + (px(37.6, -75.0)[0]) + '" y="' + px(37.6, -75.0)[1] + '">Atlantic Ocean</text>' +
      '<text class="sch-water-label" x="' + (px(38.2, -76.2)[0] + 16) + '" y="' + px(38.2, -76.2)[1] + '">Chesapeake Bay</text>';
    D.cities.forEach(function (c) {
      var p = px(c.lat, c.lng);
      o += '<rect class="sch-city" x="' + (p[0] - 2.5) + '" y="' + (p[1] - 2.5) + '" width="5" height="5"/><text class="sch-city-label" x="' + (p[0] + 8) + '" y="' + (p[1] + 4) + '">' + c.name + "</text>";
    });
    var hq = px(D.company.hq.lat, D.company.hq.lng);
    o += '<g class="sch-hq"><path d="M' + hq[0] + " " + (hq[1] - 9) + "l8 15h-16z" + '"/><text x="' + (hq[0] - 10) + '" y="' + (hq[1] - 13) + '" text-anchor="end">DMR office</text></g>';
    visible().forEach(function (i) {
      var p = px(i.lat, i.lng);
      o += '<g class="pin' + (selected === i.id ? " on" : "") + '" data-install="' + i.id + '" tabindex="0" role="button" aria-label="' + i.name + ", " + i.city + '">' +
        '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (selected === i.id ? 11 : 7) + '" fill="' + COLORS[i.market] + '"/></g>';
    });
    var s = selected && D.installs.filter(function (i) { return i.id === selected; })[0];
    el.innerHTML = o + "</svg>" + (s ? '<div class="sch-pop">' + popup(s) + "</div>" : "");
  }

  /* ---------- leaflet renderer ---------- */

  function drawLeaflet() {
    if (!lmap) {
      el.innerHTML = "";
      lmap = window.L.map(el, { scrollWheelZoom: false }).fitBounds([[b.minLat + 0.9, b.minLng + 1.2], [b.maxLat - 0.1, b.maxLng - 0.4]]);
      var layer = window.L.tileLayer(cfg.tiles, { attribution: cfg.attribution, maxZoom: 17 });
      layer.on("tileload", function () { tilesOk = true; });
      // If no tile has ever loaded, the network or provider is unavailable: use the drawing instead.
      layer.on("tileerror", function () { if (!tilesOk && mode === "leaflet") setMode("schematic", "The live map could not load, so this is a schematic view."); });
      layer.addTo(lmap);
      window.L.marker([D.company.hq.lat, D.company.hq.lng], {
        icon: window.L.divIcon({ className: "hq-icon", html: "<span>DMR</span>", iconSize: [40, 22] }), keyboard: false
      }).addTo(lmap).bindPopup("<strong>" + D.company.name + "</strong><br>" + D.company.address.join("<br>"));
    }
    Object.keys(lmarkers).forEach(function (k) { lmarkers[k].remove(); });
    lmarkers = {};
    visible().forEach(function (i) {
      lmarkers[i.id] = window.L.circleMarker([i.lat, i.lng], { radius: 8, color: "#fff", weight: 2, fillColor: COLORS[i.market], fillOpacity: 1 })
        .addTo(lmap).bindPopup(popup(i)).on("click", function () { select(i.id, true); });
    });
    if (selected && lmarkers[selected]) lmarkers[selected].openPopup();
  }

  /* ---------- shared ---------- */

  function drawList() {
    var v = visible();
    listEl.innerHTML = v.length ? v.map(function (i) {
      return '<li><button type="button" data-install="' + i.id + '" aria-pressed="' + (selected === i.id) + '">' +
        '<span class="dot" style="background:' + COLORS[i.market] + '"></span>' +
        "<span><strong>" + i.name + "</strong><em>" + i.city + " · " + L.markets[i.market].name + " · " + i.year + "</em></span></button></li>";
    }).join("") : '<li class="empty">No sample installations for this building type yet.</li>';
  }
  function draw() {
    if (mode === "leaflet") drawLeaflet(); else drawSchematic();
    drawList();
  }
  function select(id, fromMap) {
    selected = id;
    if (mode === "leaflet") {
      if (!fromMap && lmarkers[id]) { lmap.panTo(lmarkers[id].getLatLng()); lmarkers[id].openPopup(); }
      drawList();
    } else draw();
  }
  function setMode(m, msg) {
    if (m === "leaflet" && !window.L) { m = "schematic"; msg = "The live map could not load, so this is a schematic view."; }
    if (mode === "leaflet" && m !== "leaflet" && lmap) { lmap.remove(); lmap = null; lmarkers = {}; }
    mode = m;
    el.classList.toggle("is-schematic", m === "schematic");
    btnLive.setAttribute("aria-pressed", m === "leaflet");
    btnSch.setAttribute("aria-pressed", m === "schematic");
    note.hidden = !msg;
    note.textContent = msg || "";
    draw();
  }

  var chips = document.getElementById("mapChips");
  var used = D.markets.filter(function (m) { return D.installs.some(function (i) { return i.market === m.id; }); });
  chips.innerHTML = '<button type="button" data-m="" aria-pressed="true">All</button>' + used.map(function (m) {
    return '<button type="button" data-m="' + m.id + '" aria-pressed="false"><span class="dot" style="background:' + COLORS[m.id] + '"></span>' + m.name + "</button>";
  }).join("");
  chips.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    filter = t.dataset.m; selected = null;
    chips.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === t); });
    draw();
  });
  listEl.addEventListener("click", function (e) {
    var t = e.target.closest("[data-install]");
    if (t) select(t.dataset.install);
  });
  el.addEventListener("click", function (e) {
    if (mode !== "schematic") return;
    var t = e.target.closest("[data-install]");
    selected = t ? t.dataset.install : null;
    draw();
  });
  el.addEventListener("keydown", function (e) {
    var t = e.target.closest && e.target.closest("[data-install]");
    if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(t.dataset.install); }
  });
  btnLive.addEventListener("click", function () { tilesOk = false; setMode("leaflet"); });
  btnSch.addEventListener("click", function () { setMode("schematic"); });

  setMode(cfg.provider === "leaflet" ? "leaflet" : "schematic");
})();
