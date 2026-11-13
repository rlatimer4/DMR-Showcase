/*
 * Government Office — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/government-office.txt.
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
  id: "government-office",
  name: "Government Office",
  use: "institutional",
  size: { width: 24, depth: 16, floors: 4, floorHeight: 4, bays: 3, extraHeight: 7 },
  model: null,
  facade: { style: "windows", color: "#8d8674" },
  walls: "#ece7db",
  stops: [
    { id: "government-office-1", at: { floor: "roof", x: 0.4 }, space: "plant" },
    { id: "government-office-2", at: { floor: 2, x: 0.5 }, space: "open-office" },
    { id: "government-office-4", at: { floor: 2, x: 0.17 }, space: "open-office" },
    { id: "government-office-3", at: { floor: 0, x: 0.83 }, space: "mechanical" },
    { id: "government-office-5", at: { floor: 3, x: 0.83 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // columns, pediment and steps
    for (var k = 0; k < 6; k++) kit.front(kit.cyl(0.55, 0.55, h, -7.5 + k * 3, h / 2, f + 1.6, "#f4f1ea"));
    kit.front(kit.gable(18, 3.5, 2.8, 0, h, f + 1.3, "#f4f1ea"));
    kit.box(18, 0.5, 3.4, 0, 0.25, f + 1.9, "#f4f1ea");
    // dome
    kit.cyl(3.2, 3.2, 2, 7, h + 1.3, -3, "#f4f1ea");
    kit.dome(3.2, 7, h + 2.3, -3, "#b9a15a");
    // flag
    kit.cyl(0.12, 0.12, 9, 10.5, 4.5, f + 6, "dark"); kit.box(2.4, 1.4, 0.08, 11.8, 8.2, f + 6, "#c0392b");
  }
});
