/*
 * Religious Center — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see CONTENT.md)
 * Products listed in a stop that are no longer offered are skipped automatically.
 */
DMR.registerBuilding({
  id: "religious-center",
  name: "Religious Center",
  use: "institutional",
  size: { width: 18, depth: 16, floors: 1, floorHeight: 9, bays: 1 },
  model: null,
  intro: "A sanctuary is a tall, quiet room that is full a few hours a week.",
  challenges: ["Very low noise", "Tall spaces", "Intermittent occupancy"],
  stops: [
    { id: "religious-center-1", at: { floor: "roof", x: 0.3 }, title: "Sanctuary air", room: "",
      text: "Energy recovery ventilators bring in outdoor air for a full congregation at low operating cost.",
      products: ["venmar-erv", "mammoth-rtu"] },
    { id: "religious-center-2", at: { floor: 0, x: 0.6 }, title: "Sanctuary", room: "Sanctuary",
      text: "Panel radiators and trench units heat quietly, with no fan noise in the room.",
      products: ["runtal-radiator", "kampmann-trench"] }
  ],
  build: function (kit, d) {
    kit.box(3.2, 9, 3.2, -d.width / 2 + 3, d.height + 4.5, 3, "wall");
    kit.cone(2.6, 7, -d.width / 2 + 3, d.height + 12.5, 3, "accent");
  }
});
