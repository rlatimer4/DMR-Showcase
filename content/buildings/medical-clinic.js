/*
 * Medical Clinic — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/medical-clinic.txt.
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
  id: "medical-clinic",
  name: "Medical Clinic",
  use: "institutional",
  size: { width: 22, depth: 16, floors: 2, floorHeight: 4, bays: 3, extraHeight: 3 },
  model: null,
  facade: { style: "windows", color: "#2a8a8a" },
  walls: "#ffffff",
  stops: [
    { id: "medical-clinic-1", at: { floor: "roof", x: 0.5 }, space: "plant" },
    { id: "medical-clinic-2", at: { floor: 1, x: 0.5 }, space: "exam-room" },
    { id: "medical-clinic-3", at: { floor: 0, x: 0.83 }, space: "operating-room" },
    { id: "medical-clinic-4", at: { floor: 1, x: 0.17 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.front(kit.sign("+ CLINIC", 9, 2, -5.5, h + 1.3, f - 0.4, "#ffffff", "#1a9a5a"));
    kit.front(kit.box(6, 0.35, 3, 0, 3.4, f + 1.6, "#2a8a8a"));
    kit.front(kit.cyl(0.2, 0.2, 3.4, -2.6, 1.7, f + 2.9, "wall")); kit.front(kit.cyl(0.2, 0.2, 3.4, 2.6, 1.7, f + 2.9, "wall"));
  }
});
