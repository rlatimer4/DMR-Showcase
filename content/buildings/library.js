/*
 * Library — building model.
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
  id: "library",
  name: "Library",
  use: "institutional",
  size: { width: 22, depth: 16, floors: 2, floorHeight: 5, bays: 2 },
  model: null,
  facade: { style: "brick", color: "#a5573a" },
  walls: "#b0623f",
  intro: "Collections need stable humidity and readers need quiet.",
  challenges: ["Humidity control for collections", "Quiet reading rooms", "Daylit perimeter spaces"],
  stops: [
    { id: "library-1", at: { floor: "roof", x: 0.45 }, title: "Outdoor air system", room: "",
      text: "A dedicated outdoor air system delivers dry ventilation air so humidity stays stable.",
      products: ["venmar-doas"] },
    { id: "library-2", at: { floor: 1, x: 0.25 }, title: "Reading room", room: "Reading",
      text: "Chilled beams have no fan in the room. Panel radiators heat the perimeter.",
      products: ["nuclimate-beam", "runtal-radiator"] },
    { id: "library-3", at: { floor: 0, x: 0.75 }, title: "Archive", room: "Archive",
      text: "Desiccant dehumidifiers and humidifiers hold the archive within a narrow humidity range.",
      products: ["fisair-dehum", "fisair-humid"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // portico
    for (var k = 0; k < 4; k++) kit.front(kit.cyl(0.45, 0.45, 6, -4.5 + k * 3, 3, f + 2.2, "#f4f1ea"));
    kit.front(kit.box(11.5, 1.1, 2.6, 0, 6.5, f + 1.5, "#f4f1ea"));
    kit.front(kit.gable(11.5, 2.2, 2.6, 0, 7.05, f + 1.5, "#f4f1ea"));
    kit.front(kit.sign("LIBRARY", 8, 0.9, 0, 6.5, f + 2.85, "#f4f1ea", "#5a2f20"));
    kit.box(12, 0.4, 3.4, 0, 0.2, f + 1.9, "#f4f1ea");
  }
});
