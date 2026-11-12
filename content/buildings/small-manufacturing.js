/*
 * Small Manufacturing — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/small-manufacturing.txt.
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
  id: "small-manufacturing",
  name: "Small Manufacturing",
  use: "industrial",
  size: { width: 24, depth: 16, floors: 1, floorHeight: 7, bays: 2, extraHeight: 7 },
  model: null,
  facade: { style: "solid", color: "#7d8791", stripe: "#ffa500", doors: 2 },
  walls: "#8a949e",
  stops: [
    { id: "small-manufacturing-1", at: { floor: "yard", x: 0.3 }, space: "plant" },
    { id: "small-manufacturing-2", at: { floor: 0, x: 0.6 }, space: "shop-floor" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // sawtooth factory roof and a stack
    for (var k = 0; k < 4; k++) kit.gable(w / 4, 2.6, d.depth, -w / 2 + (k + 0.5) * w / 4, h + 0.3, 0, "#9aa4ad");
    kit.cyl(0.5, 0.5, 7, 9, h + 3.5, -5, "dark");
    // forklift and pallets
    kit.box(1.4, 1.6, 2.2, 8, 0.9, f + 5, "#ffa500"); kit.box(1.6, 1, 1.6, 4.5, 0.6, f + 5, "#b98a5a");
  }
});
