/*
 * Hospital — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/hospital.txt.
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
  id: "hospital",
  name: "Hospital",
  use: "institutional",
  size: { width: 27, depth: 16, floors: 4, floorHeight: 4.4, bays: 3, extraHeight: 5 },
  model: null,
  facade: { style: "windows", color: "#3f88b5" },
  walls: "#ffffff",
  stops: [
    { id: "hospital-1", at: { floor: "roof", x: 0.38 }, space: "plant" },
    { id: "hospital-2", at: { floor: 2, x: 0.17 }, space: "operating-room" },
    { id: "hospital-3", at: { floor: 1, x: 0.83 }, space: "patient-room" },
    { id: "hospital-5", at: { floor: 1, x: 0.5 }, space: "patient-room" },
    { id: "hospital-4", at: { floor: 0, x: 0.5 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // helipad
    kit.disc(3, -9.5, h + 0.4, 4, "#3f4854");
    var pad = kit.sign("H", 3.2, 3.2, -9.5, h + 0.5, 4, "#3f4854", "#ffffff"); pad.rotation.x = -Math.PI / 2;
    // red cross on the roof
    kit.box(4, 4, 4, 9.5, h + 2.3, 4, "wall");
    kit.sign("+", 3.4, 3.4, 9.5, h + 2.3, 6.05, "#ffffff", "#d62828");
    var side = kit.sign("+", 3.4, 3.4, 11.55, h + 2.3, 4, "#ffffff", "#d62828"); side.rotation.y = Math.PI / 2;
    // emergency entrance and ambulance
    kit.front(kit.box(8, 0.4, 4, 7, 3.6, f + 2.1, "#d62828"));
    kit.front(kit.sign("EMERGENCY", 7.5, 1, 7, 4.4, f + 4.15, "#d62828", "#ffffff"));
    kit.box(2.2, 2.2, 5, 9, 1.3, f + 8.5, "wall"); kit.box(2.25, 0.5, 5.05, 9, 1.3, f + 8.5, "#d62828");
  }
});
