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
  size: { width: 33, depth: 16, floors: 1, floorHeight: 8, bays: 3, extraHeight: 5 },
  model: null,
  facade: { style: "glass", color: "#2f86c2" },
  stops: [
    { id: "recreation-center-1", at: { floor: 0, x: 0.17 }, space: "pool" },
    { id: "recreation-center-4", at: { floor: 0, x: 0.5 }, space: "ice-rink" },
    { id: "recreation-center-2", at: { floor: 0, x: 0.83 }, space: "gym" },
    { id: "recreation-center-3", at: { floor: "yard", x: 0.5 }, space: "plant" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, bw = w / 3;
    for (var k = -1; k <= 1; k++) {
      kit.barrel(bw - 0.3, 4.2, d.depth, k * bw, h + 0.3, 0, "slab");
    }
  }
});
