/*
 * Greenhouse — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/greenhouse.txt.
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
  id: "greenhouse",
  name: "Greenhouse",
  use: "industrial",
  size: { width: 26, depth: 16, floors: 1, floorHeight: 6, bays: 1, extraHeight: 4 },
  model: null,
  facade: { style: "glass", color: "#bfe3d0", entrance: false },
  walls: "glass",
  roof: "open",
  stops: [
    { id: "greenhouse-1", at: { floor: "yard", x: 0.25 }, space: "plant" },
    { id: "greenhouse-2", at: { floor: 0, x: 0.6 }, space: "grow" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // glass roof spans
    for (var k = 0; k < 3; k++) kit.gable(w / 3, 3.2, d.depth, -w / 2 + (k + 0.5) * w / 3, h, 0, "glass");
    // growing beds
    for (var r = 0; r < 4; r++) { kit.box(w - 4, 0.5, 1.6, 0, 0.55, -5 + r * 3.4, "#8a7560"); kit.box(w - 4.4, 0.7, 1.2, 0, 1.1, -5 + r * 3.4, "#4caf50"); }
  }
});
