/*
 * Recreation Center — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/recreation-center.txt.
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
  id: "recreation-center",
  name: "Recreation Center",
  use: "commercial",
  size: { width: 26, depth: 16, floors: 1, floorHeight: 8, bays: 2, extraHeight: 5 },
  model: null,
  facade: { style: "glass", color: "#2f86c2" },
  stops: [
    { id: "recreation-center-1", at: { floor: "yard", x: 0.35 }, space: "pool" },
    { id: "recreation-center-2", at: { floor: 0, x: 0.75 }, space: "gym" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.barrel(w, 4.5, d.depth, 0, h + 0.3, 0, "slab");
    // outdoor pool
    kit.box(11, 0.25, 5.5, 7, 0.2, f + 8.5, "#ffffff");
    kit.box(9.6, 0.3, 4.3, 7, 0.25, f + 8.5, "#38b6e8");
  }
});
