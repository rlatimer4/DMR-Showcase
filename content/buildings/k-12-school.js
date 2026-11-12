/*
 * K-12 School — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/k-12-school.txt.
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
  id: "k-12-school",
  name: "K-12 School",
  use: "institutional",
  size: { width: 28, depth: 16, floors: 2, floorHeight: 4.2, bays: 4, extraHeight: 3 },
  model: null,
  facade: { style: "brick", color: "#b5533c" },
  walls: "#c0603f",
  stops: [
    { id: "k-12-school-1", at: { floor: "roof", x: 0.5 }, space: "plant" },
    { id: "k-12-school-2", at: { floor: 1, x: 0.4 }, space: "classroom" },
    { id: "k-12-school-3", at: { floor: 0, x: 0.12 }, space: "lobby" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // entrance porch
    kit.front(kit.box(7, 5, 2, 0, 2.5, f + 1.2, "#f4efe6"));
    kit.front(kit.gable(8, 2.4, 2.4, 0, 5, f + 1.2, "#8a3b2a"));
    kit.front(kit.sign("SCHOOL", 6, 1, 0, 4.2, f + 2.25, "#f4efe6", "#8a3b2a"));
    // flag
    kit.cyl(0.12, 0.12, 9, -12.5, 4.5, f + 7, "dark"); kit.box(2.4, 1.4, 0.08, -11.2, 8.2, f + 7, "#c0392b");
    // school bus
    kit.box(8, 2.4, 2.4, 7, 1.7, f + 8.5, "#f7b500"); kit.box(8.05, 0.7, 2.45, 7, 2.3, f + 8.5, "dark");
    [4.5, 9.5].forEach(function (x) { var wheel = kit.cyl(0.55, 0.55, 2.6, x, 0.55, f + 8.5, "dark"); wheel.rotation.x = Math.PI / 2; });
  }
});
