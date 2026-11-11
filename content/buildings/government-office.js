/*
 * Government Office — building model.
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
  id: "government-office",
  name: "Government Office",
  use: "institutional",
  size: { width: 24, depth: 16, floors: 4, floorHeight: 4, bays: 3, extraHeight: 7 },
  model: null,
  facade: { style: "windows", color: "#8d8674" },
  walls: "#ece7db",
  intro: "Public buildings are built to last decades and are often renovated while occupied.",
  challenges: ["Long service life", "Renovation in occupied buildings", "Energy targets"],
  stops: [
    { id: "government-office-1", at: { floor: "roof", x: 0.4 }, title: "Custom air handlers", room: "",
      text: "Air handlers built in sections fit through existing openings for replacement work.",
      products: ["ventrol-ahu", "temtrol-ahu"] },
    { id: "government-office-2", at: { floor: 2, x: 0.5 }, title: "Office floors", room: "Office",
      text: "Chilled beams and VAV terminals serve the floors with low fan energy.",
      products: ["nuclimate-beam", "envirotec-vav"] },
    { id: "government-office-3", at: { floor: 0, x: 0.83 }, title: "Mechanical room", room: "Mech",
      text: "Freeze-resistant coils and drives modernize the existing plant.",
      products: ["cooney-coil", "fuji-vfd", "sterling-hydronic"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // columns, pediment and steps
    for (var k = 0; k < 6; k++) kit.front(kit.cyl(0.55, 0.55, h, -7.5 + k * 3, h / 2, f + 1.6, "#f4f1ea"));
    kit.front(kit.gable(18, 3.5, 2.8, 0, h, f + 1.3, "#f4f1ea"));
    kit.box(18, 0.5, 3.4, 0, 0.25, f + 1.9, "#f4f1ea");
    // dome
    kit.cyl(3.2, 3.2, 2, 7, h + 1.3, -3, "#f4f1ea");
    kit.dome(3.2, 7, h + 2.3, -3, "#b9a15a");
    // flag
    kit.cyl(0.12, 0.12, 9, 10.5, 4.5, f + 6, "dark"); kit.box(2.4, 1.4, 0.08, 11.8, 8.2, f + 6, "#c0392b");
  }
});
