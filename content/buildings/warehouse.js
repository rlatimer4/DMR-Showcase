/*
 * Warehouse — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/warehouse.txt.
 * This file controls the 3D model:
 *  - size:    overall dimensions in metres
 *  - facade, walls: the look of the outside
 *  - stops:   where each equipment location sits. `at.floor` is "roof", "yard"
 *             or a floor number (0 = ground); `at.x` is the position across
 *             the width, 0 to 1; `space` picks how the room is furnished
 *  - model:   optional path to a .glb file that replaces the generated shell
 *  - build:   shapes that make the building recognizable
 * CONTENT.md lists the facade styles, space types and kit helpers.
 */
DMR.registerBuilding({
  id: "warehouse",
  name: "Warehouse",
  use: "industrial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 11, bays: 1 },
  model: null,
  facade: { style: "solid", color: "#8b949c", stripe: "#ffa500", doors: 6 },
  walls: "#98a1a9",
  stops: [
    { id: "warehouse-1", at: { floor: "roof", x: 0.3 }, space: "plant" },
    { id: "warehouse-2", at: { floor: 0, x: 0.35 }, space: "high-bay" },
    { id: "warehouse-3", at: { floor: 0, x: 0.85 }, space: "dock" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // trucks at the dock doors
    [-2.5, 7.5].forEach(function (x, i) {
      kit.box(2.6, 2.9, 8, x, 2.2, f + 5.2, "wall");
      kit.box(2.4, 2.4, 2.2, x, 1.5, f + 10.5, i ? "#c0392b" : "#1779ba");
    });
  }
});
