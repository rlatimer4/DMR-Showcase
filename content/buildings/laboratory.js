/*
 * Research Laboratory — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/laboratory.txt.
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
  id: "laboratory",
  name: "Research Laboratory",
  use: "institutional",
  size: { width: 27, depth: 16, floors: 3, floorHeight: 4.6, bays: 3, extraHeight: 7 },
  model: null,
  facade: { style: "bands", color: "#4f7f9e" },
  walls: "#f2f5f7",
  stops: [
    { id: "laboratory-1", at: { floor: "roof", x: 0.35 }, space: "plant" },
    { id: "laboratory-2", at: { floor: 2, x: 0.17 }, space: "lab" },
    { id: "laboratory-3", at: { floor: 2, x: 0.5 }, space: "dry-lab" },
    { id: "laboratory-4", at: { floor: 1, x: 0.5 }, space: "vivarium" },
    { id: "laboratory-5", at: { floor: 1, x: 0.17 }, space: "cleanroom" },
    { id: "laboratory-6", at: { floor: 0, x: 0.83 }, space: "mechanical" },
    { id: "laboratory-7", at: { floor: 0, x: 0.17 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // fume hood exhaust stacks on a plenum
    kit.box(7, 1.2, 2, 9, h + 0.9, -5, "#b8c2ca");
    for (var k = 0; k < 4; k++) { kit.cyl(0.35, 0.35, 5, 6.6 + k * 1.6, h + 4, -5, "#b8c2ca"); kit.cyl(0.25, 0.4, 0.8, 6.6 + k * 1.6, h + 6.9, -5, "#8d99a3"); }
    // liquid nitrogen tank beside the entrance
    kit.cyl(1.1, 1.1, 5, 11, 2.7, f + 4, "#ffffff"); kit.dome(1.1, 11, 5.2, f + 4, "#ffffff"); kit.box(2.8, 0.2, 2.8, 11, 0.2, f + 4, "#b8c2ca");
    // entrance canopy and sign
    kit.front(kit.box(6, 0.3, 2.4, -2, 3.4, f + 1.3, "#282c39"));
    kit.front(kit.sign("RESEARCH LABS", 9, 1.3, -2, h - 1, f + 0.45, "#282c39", "#ffffff"));
  }
});
