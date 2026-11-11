/*
 * Fine Arts Center — building model.
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
  id: "fine-arts-center",
  name: "Fine Arts Center",
  use: "institutional",
  size: { width: 24, depth: 16, floors: 1, floorHeight: 10, bays: 2, extraHeight: 9 },
  model: null,
  facade: { style: "glass", color: "#5b4a8a" },
  walls: "#e6e1ee",
  intro: "A performance hall needs air that the audience cannot hear.",
  challenges: ["Very low background noise", "Stage and audience loads", "Instrument humidity"],
  stops: [
    { id: "fine-arts-center-1", at: { floor: "roof", x: 0.35 }, title: "Auditorium air handling", room: "",
      text: "Fan arrays produce less low-frequency noise than a single large fan.",
      products: ["temtrol-ahu", "huntair-fanwall"] },
    { id: "fine-arts-center-2", at: { floor: 0, x: 0.3 }, title: "Auditorium", room: "Auditorium",
      text: "Steam humidifiers protect instruments and finishes.",
      products: ["steamovap-humid", "nortek-ahu"] }
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
