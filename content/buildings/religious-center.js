/*
 * Religious Center — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - facade, walls: the look of the outside (styles are listed in CONTENT.md)
 *  - stops:  the numbered points visitors select. `at.floor` is "roof", "yard"
 *            (a unit on the ground in front) or a floor number (0 = ground);
 *            `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  the shapes that make this building recognizable (kit helpers are in CONTENT.md)
 * Products listed in a stop that are no longer offered are skipped automatically.
 */
DMR.registerBuilding({
  id: "religious-center",
  name: "Religious Center",
  use: "institutional",
  size: { width: 18, depth: 16, floors: 1, floorHeight: 9, bays: 1, extraHeight: 15 },
  model: null,
  facade: { style: "tall", color: "#e9e2d5" },
  walls: "#f4efe6",
  intro: "A sanctuary is a tall, quiet room that is full a few hours a week.",
  challenges: ["Very low noise", "Tall spaces", "Intermittent occupancy"],
  stops: [
    { id: "religious-center-1", at: { floor: "yard", x: 0.3 }, title: "Sanctuary air", room: "",
      text: "Energy recovery ventilators bring in outdoor air for a full congregation at low operating cost.",
      products: ["venmar-erv", "mammoth-rtu"] },
    { id: "religious-center-2", at: { floor: 0, x: 0.6 }, title: "Sanctuary", room: "Sanctuary",
      text: "Panel radiators and trench units heat quietly, with no fan noise in the room.",
      products: ["runtal-radiator", "kampmann-trench"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.gable(w + 1, 5, d.depth + 1, 0, h + 0.3, 0, "#8a5a44");
    // steeple with a cross
    var x = -w / 2 + 1.7, z = f - 1.7;
    kit.front(kit.box(3.4, h + 6, 3.4, x, (h + 6) / 2, z, "#f4efe6"));
    kit.front(kit.cone(2.6, 6, x, h + 9, z, "#8a5a44"));
    kit.front(kit.box(0.3, 2.6, 0.3, x, h + 13.3, z, "#b9a15a"));
    kit.front(kit.box(1.5, 0.3, 0.3, x, h + 13.6, z, "#b9a15a"));
  }
});
