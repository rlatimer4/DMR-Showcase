/*
 * Low-Rise Office — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/low-rise-office.txt.
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
  id: "low-rise-office",
  name: "Low-Rise Office",
  use: "commercial",
  size: { width: 24, depth: 16, floors: 2, floorHeight: 4, bays: 3 },
  model: null,
  facade: { style: "windows", color: "#9a8266" },
  walls: "#e8dccb",
  stops: [
    { id: "low-rise-office-1", at: { floor: "roof", x: 0.5 }, space: "plant" },
    { id: "low-rise-office-2", at: { floor: 1, x: 0.5 }, space: "office" },
    { id: "low-rise-office-3", at: { floor: 0, x: 0.17 }, space: "lobby" },
    { id: "low-rise-office-4", at: { floor: 1, x: 0.83 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // car park
    var cars = ["#c0392b", "#f4f6f8", "#1779ba", "#3f4854", "#f7b500"];
    kit.box(20, 0.1, 6, 3, 0.12, f + 8, "#8a929a");
    for (var c = 0; c < 5; c++) kit.box(1.9, 1.2, 4, -5 + c * 4, 0.75, f + 8, cars[c]);
  }
});
