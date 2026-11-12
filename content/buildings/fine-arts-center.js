/*
 * Fine Arts Center — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/fine-arts-center.txt.
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
  id: "fine-arts-center",
  name: "Fine Arts Center",
  use: "institutional",
  size: { width: 24, depth: 16, floors: 1, floorHeight: 10, bays: 2, extraHeight: 9 },
  model: null,
  facade: { style: "glass", color: "#5b4a8a" },
  walls: "#e6e1ee",
  stops: [
    { id: "fine-arts-center-1", at: { floor: "roof", x: 0.35 }, space: "plant" },
    { id: "fine-arts-center-2", at: { floor: 0, x: 0.3 }, space: "auditorium" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // stage fly tower
    kit.box(11, 8, 7, 6.5, h + 4.2, -4.2, "#5b4a8a");
    // marquee
    kit.front(kit.box(12, 1.6, 2.4, 0, 4.6, f + 1.3, "dark"));
    kit.front(kit.sign("FINE ARTS", 11, 1.3, 0, 4.6, f + 2.55, "#282c39", "#ffa500"));
  }
});
