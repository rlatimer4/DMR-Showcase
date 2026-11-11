/*
 * DMR Showcase — the world model.
 *
 * The world is assembled from separate building models. Each building lives in
 * its own file in assets/world/buildings/ and registers itself here with
 * DMR.registerBuilding(). To add a building: copy one of those files, change
 * its id and contents, and add a <script> tag for it in index.html.
 *
 * Buildings are grouped into districts by use type and placed on a grid
 * automatically. Give a building `position: { x: .., z: .. }` to place it by hand.
 *
 * Kit helpers available to a building's optional build(kit, d) function
 * (positions are relative to the building's centre at ground level):
 *   kit.box(w, h, d, x, y, z, material)       kit.cyl(rTop, rBottom, h, x, y, z, material)
 *   kit.cone(r, h, x, y, z, material)          kit.ring(rInner, rOuter, h, x, y, z, material)
 *   kit.gable(w, h, d, x, y, z, material)
 * Materials: "wall", "slab", "glass", "accent", "unit", "equip", "dark", "supply", "return".
 * `d` is { width, depth, height, floors, floorHeight, bays }.
 *
 * Artist-made models: set `model: "assets/world/models/<file>.glb"` in a
 * building file. The .glb replaces the generated shell; the stops still come
 * from the building file. Name any mesh that should disappear when the
 * building opens with a name starting "Cutaway" (for example the front wall).
 * Model units are metres, origin at the centre of the footprint at ground level,
 * front of the building facing +Z.
 */
window.DMR = window.DMR || {};

DMR.useTypes = [
  { id: "commercial", name: "Commercial", color: "#1779ba" },
  { id: "institutional", name: "Institutional", color: "#4f7f9e" },
  { id: "industrial", name: "Industrial", color: "#5b6673" },
  { id: "residential", name: "Residential", color: "#2a8a8a" }
];

DMR.world = {
  cell: { width: 40, depth: 44 },   // grid spacing between building centres
  columns: 3,                       // buildings per row inside a district
  districtGap: 30
};

DMR.buildings = [];
DMR.registerBuilding = function (def) {
  def.size.height = def.size.floors * def.size.floorHeight;
  DMR.buildings.push(def);
};

/*
 * Works out where every building stands. Within a district the shortest
 * buildings go in the front row so they do not hide the ones behind.
 * Returns { districts: { id: { x, z, width, depth } }, width, depth } and sets
 * building.pos = { x, z } on each building.
 */
DMR.layoutWorld = function () {
  var W = DMR.world, x0 = 0, districts = {}, maxRows = 0;
  DMR.useTypes.forEach(function (u) {
    var list = DMR.buildings.filter(function (b) { return b.use === u.id; })
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
  var width = x0 - W.districtGap, shift = width / 2;
  DMR.buildings.forEach(function (b) { if (!b.position) b.pos.x -= shift; });
  Object.keys(districts).forEach(function (k) { districts[k].x -= shift; });
  return { districts: districts, width: width, depth: maxRows * W.cell.depth };
};
