/*
 * Convention Center — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/convention-center.txt.
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
  id: "convention-center",
  name: "Convention Center",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 10, bays: 2, extraHeight: 6 },
  model: null,
  facade: { style: "glass", color: "#3a7ca8" },
  stops: [
    { id: "convention-center-1", at: { floor: "yard", x: 0.35 }, space: "plant" },
    { id: "convention-center-2", at: { floor: 0, x: 0.7 }, space: "exhibit-hall" },
    { id: "convention-center-3", at: { floor: 0, x: 0.25 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.barrel(w, 5.5, d.depth, 0, h + 0.3, 0, "slab");
    // banners on the front
    var colors = ["#c0392b", "#ffa500", "#1779ba"];
    for (var k = 0; k < 3; k++) kit.front(kit.sign("EXPO", 3, 6, -9 + k * 9, h - 4, f + 0.5, colors[k], "#ffffff"));
  }
});
