/*
 * Industrial Manufacturing — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/industrial-manufacturing.txt.
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
  id: "industrial-manufacturing",
  name: "Industrial Manufacturing",
  use: "industrial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 10, bays: 2, extraHeight: 17 },
  model: null,
  facade: { style: "solid", color: "#5b6673", stripe: "#d62828", doors: 3 },
  walls: "#667280",
  stops: [
    { id: "industrial-manufacturing-1", at: { floor: "roof", x: 0.3 }, space: "plant" },
    { id: "industrial-manufacturing-2", at: { floor: 0, x: 0.3 }, space: "production" },
    { id: "industrial-manufacturing-3", at: { floor: 0, x: 0.8 }, space: "dock" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // smokestacks
    [8, 12.5].forEach(function (x) {
      kit.cyl(1, 1.3, 16, x, h + 8, -5, "#c9ced4");
      kit.cyl(1.08, 1.12, 1.6, x, h + 14, -5, "#d62828");
    });
    // sawtooth roof lights
    for (var k = 0; k < 3; k++) kit.gable(4.6, 2.4, 7, 3 + k * 4.6, h + 0.3, 3.5, "#7d8894");
  }
});
