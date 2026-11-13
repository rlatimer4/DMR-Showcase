/*
 * Hi-Tech Manufacturing — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/hi-tech-manufacturing.txt.
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
  id: "hi-tech-manufacturing",
  name: "Hi-Tech Manufacturing",
  use: "industrial",
  size: { width: 28, depth: 16, floors: 2, floorHeight: 6, bays: 2, extraHeight: 6 },
  model: null,
  facade: { style: "bands", color: "#f4f6f8" },
  walls: "#f4f6f8",
  stops: [
    { id: "hi-tech-manufacturing-1", at: { floor: "roof", x: 0.35 }, space: "plant" },
    { id: "hi-tech-manufacturing-2", at: { floor: 1, x: 0.5 }, space: "cleanroom" },
    { id: "hi-tech-manufacturing-3", at: { floor: 0, x: 0.25 }, space: "mechanical" },
    { id: "hi-tech-manufacturing-4", at: { floor: 1, x: 0.25 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // exhaust fans and scrubber on the roof
    for (var k = 0; k < 6; k++) kit.cyl(0.5, 0.5, 1.6, 2 + k * 2, h + 1.1, -5.5, "#b8c2ca");
    kit.box(3, 3, 3, 10, h + 1.8, 3, "#dfe5ea"); kit.cyl(0.4, 0.4, 5, 10, h + 5.5, 3, "#b8c2ca");
    // bulk gas tanks behind
    [-10, -6.4].forEach(function (x) { kit.cyl(1.5, 1.5, 12, x, 6, -f - 3, "wall"); kit.dome(1.5, x, 12, -f - 3, "wall"); });
    kit.front(kit.sign("FAB 1", 5, 1.4, -9, h - 1, f + 0.45, "#1779ba", "#ffffff"));
  }
});
