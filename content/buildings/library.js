/*
 * Library — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/library.txt.
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
  id: "library",
  name: "Library",
  use: "institutional",
  size: { width: 22, depth: 16, floors: 2, floorHeight: 5, bays: 2 },
  model: null,
  facade: { style: "brick", color: "#a5573a" },
  walls: "#b0623f",
  stops: [
    { id: "library-1", at: { floor: "roof", x: 0.45 }, space: "plant" },
    { id: "library-2", at: { floor: 1, x: 0.25 }, space: "reading-room" },
    { id: "library-3", at: { floor: 0, x: 0.75 }, space: "archive" },
    { id: "library-4", at: { floor: 0, x: 0.25 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // portico
    for (var k = 0; k < 4; k++) kit.front(kit.cyl(0.45, 0.45, 6, -4.5 + k * 3, 3, f + 2.2, "#f4f1ea"));
    kit.front(kit.box(11.5, 1.1, 2.6, 0, 6.5, f + 1.5, "#f4f1ea"));
    kit.front(kit.gable(11.5, 2.2, 2.6, 0, 7.05, f + 1.5, "#f4f1ea"));
    kit.front(kit.sign("LIBRARY", 8, 0.9, 0, 6.5, f + 2.85, "#f4f1ea", "#5a2f20"));
    kit.box(12, 0.4, 3.4, 0, 0.2, f + 1.9, "#f4f1ea");
  }
});
