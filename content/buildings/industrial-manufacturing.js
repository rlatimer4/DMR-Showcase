/*
 * Industrial Manufacturing — building model.
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
  id: "industrial-manufacturing",
  name: "Industrial Manufacturing",
  use: "industrial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 10, bays: 2, extraHeight: 17 },
  model: null,
  facade: { style: "solid", color: "#5b6673", stripe: "#d62828", doors: 3 },
  walls: "#667280",
  intro: "Heavy manufacturing exhausts large air volumes and generates its own heat.",
  challenges: ["Large exhaust volumes", "Process heat", "Harsh environment for equipment"],
  stops: [
    { id: "industrial-manufacturing-1", at: { floor: "roof", x: 0.3 }, title: "Make-up air", room: "",
      text: "Direct-fired make-up air units replace exhaust air and pressurize the plant.",
      products: ["rapid-mua", "fuji-vfd"] },
    { id: "industrial-manufacturing-2", at: { floor: 0, x: 0.3 }, title: "Production floor", room: "Production",
      text: "Air turnover units and unit heaters keep the floor even from end to end.",
      products: ["rapid-turnover", "sterling-unit"] },
    { id: "industrial-manufacturing-3", at: { floor: 0, x: 0.8 }, title: "Dock doors", room: "Dock",
      text: "Air curtains protect the dock doors.",
      products: ["kampmann-curtain"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // smokestacks
    [8, 12.5].forEach(function (x) {
      kit.cyl(1, 1.3, 16, x, h + 8, -5, "#c9ced4");
      kit.cyl(1.08, 1.12, 1.6, x, h + 14, -5, "#d62828");
    });
    // sawtooth roof lights
    for (var k = 0; k < 3; k++) kit.gable(4.6, 2.4, 7, 3 + k * 4.6, h + 0.3, 3.5, "#7d8894");
  }
});
