/*
 * Pharma Manufacturing — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/pharma-manufacturing.txt.
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
  id: "pharma-manufacturing",
  name: "Pharma Manufacturing",
  use: "industrial",
  size: { width: 26, depth: 16, floors: 2, floorHeight: 5.5, bays: 2, extraHeight: 5 },
  model: null,
  facade: { style: "bands", color: "#ffffff" },
  walls: "#ffffff",
  stops: [
    { id: "pharma-manufacturing-1", at: { floor: "roof", x: 0.4 }, space: "plant" },
    { id: "pharma-manufacturing-2", at: { floor: 1, x: 0.25 }, space: "cleanroom" },
    { id: "pharma-manufacturing-3", at: { floor: 0, x: 0.75 }, space: "dry-room" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // exhaust stacks
    for (var k = 0; k < 5; k++) kit.cyl(0.3, 0.3, 4, 3 + k * 2, h + 2.3, -5, "#b8c2ca");
    // process tanks behind
    [-9, -4.5].forEach(function (x) { kit.cyl(1.8, 1.8, 10, x, 5, -f - 3, "wall"); kit.dome(1.8, x, 10, -f - 3, "wall"); });
    kit.front(kit.sign("Rx PHARMA", 9, 1.5, 6, h - 1.1, f + 0.45, "#1779ba", "#ffffff"));
  }
});
