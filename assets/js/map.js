/*
 * DMR Showcase — installations map (Google Maps).
 *
 * Pins come from DMR.installs (assets/js/installs.js). Each pin lists the
 * manufacturers installed there, which drives the manufacturer filter.
 *
 * Pin editor: open the page with ?edit=1 to add, edit and delete pins, then
 * download an updated installs.js. Edits are kept in this browser until then.
 */
(function () {
  "use strict";
  var D = window.DMR, L = D.lookup, cfg = D.mapConfig;
  var el = document.getElementById("map");
  var listEl = document.getElementById("installList");
  var note = document.getElementById("mapNote");
  var fBrand = document.getElementById("mapBrand"), fMarket = document.getElementById("mapMarket");
  var editing = /[?&]edit(=1)?(&|$)/.test(location.search);
  var DRAFT = "dmr-pin-drafts";
  var gmap = null, info = null, markers = {}, selected = null, pendingClick = null;

  if (editing) {
    try {
      var saved = JSON.parse(localStorage.getItem(DRAFT) || "null");
      if (Array.isArray(saved)) D.installs = saved;
    } catch (e) { /* ignore unreadable drafts */ }
  }
  function saveDraft() { try { localStorage.setItem(DRAFT, JSON.stringify(D.installs)); } catch (e) { /* storage unavailable */ } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function find(id) { return D.installs.filter(function (i) { return i.id === id; })[0]; }
  function brandsOf(i) { return (i.manufacturers || []).filter(function (b) { return L.brands[b]; }); }
  function visible() {
    return D.installs.filter(function (i) {
      return (!fBrand.value || brandsOf(i).indexOf(fBrand.value) > -1) && (!fMarket.value || i.building === fMarket.value);
    });
  }

  /* ---------- pin content ---------- */

  function infoHtml(i) {
    var photos = (i.photos || []).filter(Boolean);
    var prods = (i.products || []).filter(function (p) { return L.products[p]; });
    return '<div class="pin-info">' +
      (photos.length ? '<div class="pin-photos">' + photos.map(function (p) { return '<img src="' + esc(p) + '" alt="' + esc(i.name) + '" loading="lazy">'; }).join("") + "</div>" : "") +
      "<strong>" + esc(i.name) + "</strong>" +
      "<span>" + esc(i.city) + (L.buildings[i.building] ? " · " + L.buildings[i.building].name : "") + (i.year ? " · " + esc(i.year) : "") + "</span>" +
      '<p class="tags">' + brandsOf(i).map(function (b) { return "<span>" + L.brands[b].name + "</span>"; }).join("") + "</p>" +
      (prods.length ? "<ul>" + prods.map(function (p) { return "<li>" + L.brands[L.products[p].brand].name + " " + L.products[p].name + "</li>"; }).join("") + "</ul>" : "") +
      (i.notes ? "<p>" + esc(i.notes) + "</p>" : "") +
      (editing ? '<p><button type="button" class="link" data-edit-pin="' + i.id + '">Edit pin</button> · <button type="button" class="link" data-delete-pin="' + i.id + '">Delete</button></p>' : "") +
      "</div>";
  }
  function icon(on) {
    return {
      path: "M12 2C7.6 2 4 5.6 4 10c0 5.6 8 12 8 12s8-6.4 8-12c0-4.4-3.600-8-8-8z",
      fillColor: on ? "#ffa500" : "#1779ba", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 2,
      scale: on ? 1.9 : 1.5, anchor: new google.maps.Point(12, 22)
    };
  }

  /* ---------- drawing ---------- */

  function drawMarkers() {
    if (!gmap) return;
    Object.keys(markers).forEach(function (k) { markers[k].setMap(null); });
    markers = {};
    visible().forEach(function (i) {
      var m = new google.maps.Marker({ map: gmap, position: { lat: i.lat, lng: i.lng }, title: i.name, icon: icon(i.id === selected), draggable: editing });
      m.addListener("click", function () { select(i.id); });
      if (editing) m.addListener("dragend", function (e) { i.lat = +e.latLng.lat().toFixed(5); i.lng = +e.latLng.lng().toFixed(5); saveDraft(); });
      markers[i.id] = m;
    });
  }
  function drawList() {
    var v = visible();
    document.getElementById("pinCount").textContent = v.length + (v.length === 1 ? " installation" : " installations");
    listEl.innerHTML = v.length ? v.map(function (i) {
      return '<li><button type="button" data-install="' + i.id + '" aria-pressed="' + (selected === i.id) + '">' +
        "<strong>" + esc(i.name) + "</strong><em>" + esc(i.city) + (i.year ? " · " + esc(i.year) : "") + "</em>" +
        '<span class="mini-tags">' + brandsOf(i).map(function (b) { return "<span>" + L.brands[b].name + "</span>"; }).join("") + "</span></button></li>";
    }).join("") : '<li class="empty">No installations match these filters yet.</li>';
  }
  function draw() { drawMarkers(); drawList(); }
  function select(id) {
    selected = id;
    var i = find(id);
    Object.keys(markers).forEach(function (k) { markers[k].setIcon(icon(k === id)); });
    if (gmap && i && markers[id]) {
      info.setContent(infoHtml(i));
      info.open({ map: gmap, anchor: markers[id] });
      gmap.panTo(markers[id].getPosition());
    }
    drawList();
  }

  /* ---------- filters ---------- */

  function fillFilters() {
    var b = fBrand.value, m = fMarket.value;
    fBrand.innerHTML = '<option value="">All manufacturers</option>' + D.brands.filter(function (x) {
      return editing || D.installs.some(function (i) { return brandsOf(i).indexOf(x.id) > -1; });
    }).map(function (x) { return '<option value="' + x.id + '">' + x.name + "</option>"; }).join("");
    fMarket.innerHTML = '<option value="">All building types</option>' + D.buildingOptions();
    fBrand.value = b; fMarket.value = m;
  }
  fBrand.addEventListener("change", function () { selected = null; if (info) info.close(); draw(); });
  fMarket.addEventListener("change", function () { selected = null; if (info) info.close(); draw(); });
  listEl.addEventListener("click", function (e) {
    var t = e.target.closest("[data-install]");
    if (t) select(t.dataset.install);
  });

  /* ---------- pin editor (?edit=1) ---------- */

  var form = document.getElementById("pinForm");
  function openForm(i, latLng) {
    var isNew = !i;
    i = i || { id: "", name: "", city: "", lat: latLng.lat, lng: latLng.lng, building: "", year: new Date().getFullYear(), manufacturers: [], products: [], photos: [], notes: "" };
    form.hidden = false;
    form.innerHTML =
      "<h3>" + (isNew ? "New pin" : "Edit pin") + "</h3>" +
      '<input type="hidden" name="id" value="' + esc(i.id) + '">' +
      '<label>Project name<input name="name" required value="' + esc(i.name) + '"></label>' +
      '<label>City, state<input name="city" value="' + esc(i.city) + '" placeholder="Bethesda, MD"></label>' +
      '<div class="row"><label>Latitude<input name="lat" required inputmode="decimal" value="' + i.lat + '"></label><label>Longitude<input name="lng" required inputmode="decimal" value="' + i.lng + '"></label></div>' +
      '<div class="row"><label>Building type<select name="building"><option value="">Not set</option>' + D.buildingOptions() + "</select></label>" +
      '<label>Year<input name="year" inputmode="numeric" value="' + esc(i.year) + '"></label></div>' +
      "<fieldset><legend>Manufacturers at this site</legend>" + D.brands.map(function (b) {
        return '<label class="check"><input type="checkbox" name="manufacturers" value="' + b.id + '"' + ((i.manufacturers || []).indexOf(b.id) > -1 ? " checked" : "") + "> " + b.name + "</label>";
      }).join("") + "</fieldset>" +
      '<label>Photos (optional, one image path or URL per line)<textarea name="photos" rows="2" placeholder="assets/photos/project-1.jpg">' + esc((i.photos || []).join("\n")) + "</textarea></label>" +
      '<label>Notes (optional)<textarea name="notes" rows="2">' + esc(i.notes) + "</textarea></label>" +
      '<div class="row"><button class="btn btn-primary" type="submit">Save pin</button><button class="btn btn-line" type="button" data-cancel-pin>Cancel</button></div>';
    form.elements.building.value = i.building || "";
    form.scrollIntoView({ block: "nearest" });
    form.elements.name.focus();
  }
  function closeForm() { form.hidden = true; form.innerHTML = ""; if (pendingClick) { pendingClick.setMap(null); pendingClick = null; } }

  function exportFile() {
    return "/*\n * DMR Showcase — map pins. Generated by the pin editor (?edit=1).\n * `manufacturers` are brand ids from data.js; `photos` are optional image paths or URLs.\n */\n" +
      "window.DMR = window.DMR || {};\nDMR.installs = [\n" + D.installs.map(function (i) { return "  " + JSON.stringify(i); }).join(",\n") + "\n];\n";
  }

  if (editing) {
    document.getElementById("pinEditor").hidden = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, lat = parseFloat(f.lat.value), lng = parseFloat(f.lng.value);
      if (isNaN(lat) || isNaN(lng)) { f.lat.focus(); return; }
      var rec = find(f.id.value);
      if (!rec) { rec = { id: "p" + Date.now().toString(36), products: [] }; D.installs.push(rec); }
      rec.name = f.name.value.trim(); rec.city = f.city.value.trim(); rec.lat = lat; rec.lng = lng;
      rec.building = f.building.value; rec.year = parseInt(f.year.value, 10) || "";
      rec.manufacturers = Array.prototype.filter.call(form.querySelectorAll("[name=manufacturers]"), function (c) { return c.checked; }).map(function (c) { return c.value; });
      rec.photos = f.photos.value.split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
      rec.notes = f.notes.value.trim();
      saveDraft(); closeForm(); fillFilters(); draw(); select(rec.id);
    });
    document.getElementById("pinEditor").addEventListener("click", function (e) {
      if (e.target.closest("[data-cancel-pin]")) closeForm();
      if (e.target.closest("#pinNew")) openForm(null, gmap ? { lat: +gmap.getCenter().lat().toFixed(5), lng: +gmap.getCenter().lng().toFixed(5) } : cfg.center);
      if (e.target.closest("#pinDownload")) {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([exportFile()], { type: "text/javascript" }));
        a.download = "installs.js"; a.click(); URL.revokeObjectURL(a.href);
      }
      if (e.target.closest("#pinReset") && confirm("Discard all unsaved pin changes in this browser?")) {
        try { localStorage.removeItem(DRAFT); } catch (err) { /* ignore */ }
        location.reload();
      }
    });
    document.addEventListener("click", function (e) {
      var t;
      if ((t = e.target.closest("[data-edit-pin]"))) openForm(find(t.dataset.editPin));
      if ((t = e.target.closest("[data-delete-pin]")) && confirm("Delete this pin?")) {
        D.installs = D.installs.filter(function (i) { return i.id !== t.dataset.deletePin; });
        selected = null; info.close(); saveDraft(); fillFilters(); draw();
      }
    });
  }

  /* ---------- Google Maps loader ---------- */

  function fail(msg) { el.classList.add("map-off"); note.hidden = false; note.textContent = msg; }
  window.__dmrMapReady = function () {
    gmap = new google.maps.Map(el, {
      center: cfg.center, zoom: cfg.zoom, mapTypeControl: true, streetViewControl: false, fullscreenControl: true,
      gestureHandling: "cooperative"
    });
    info = new google.maps.InfoWindow({ maxWidth: 320 });
    new google.maps.Marker({
      map: gmap, position: D.company.hq, title: D.company.name, zIndex: 999,
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: "#282c39", fillOpacity: 1, strokeColor: "#ffa500", strokeWeight: 3 }
    }).addListener("click", function () {
      info.setContent('<div class="pin-info"><strong>' + D.company.name + "</strong><span>" + D.company.address.join(", ") + "</span></div>");
      info.setPosition(D.company.hq); info.open({ map: gmap });
    });
    if (editing) gmap.addListener("click", function (e) {
      if (pendingClick) pendingClick.setMap(null);
      pendingClick = new google.maps.Marker({ map: gmap, position: e.latLng, icon: icon(true) });
      openForm(null, { lat: +e.latLng.lat().toFixed(5), lng: +e.latLng.lng().toFixed(5) });
    });
    draw();
  };
  window.gm_authFailure = function () {
    note.hidden = false;
    note.textContent = "Google Maps rejected the API key. Check the key and its allowed websites in DMR.mapConfig.";
  };

  fillFilters();
  drawList();
  var s = document.createElement("script");
  s.src = "https://maps.googleapis.com/maps/api/js?v=weekly&loading=async&callback=__dmrMapReady" + (cfg.googleMapsApiKey ? "&key=" + encodeURIComponent(cfg.googleMapsApiKey) : "");
  s.async = true;
  s.onerror = function () { fail("Google Maps could not load. The list on the right still shows every installation."); };
  document.head.appendChild(s);
})();
