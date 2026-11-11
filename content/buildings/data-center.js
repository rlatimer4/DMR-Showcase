/*
 * Data Center — building model.
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
  id: "data-center",
  name: "Data Center",
  use: "commercial",
  size: { width: 28, depth: 16, floors: 1, floorHeight: 7, bays: 1, extraHeight: 3 },
  model: null,
  facade: { style: "solid", color: "#56606c", stripe: "#1e9be8", entrance: false },
  walls: "#6b7580",
  intro: "Data halls reject heat every hour of the year, so the equipment is chosen for efficiency and uptime.",
  challenges: ["Cooling that never stops, including during maintenance", "Rising rack densities", "Short construction schedules"],
  stops: [
    { id: "data-center-1", at: { floor: "roof", x: 0.3 }, title: "Chilled water plant", room: "",
      text: "A packaged chiller plant arrives piped, wired and tested, which shortens the construction schedule.",
      products: ["governair-chiller", "fuji-vfd"] },
    { id: "data-center-2", at: { floor: 0, x: 0.55 }, title: "Data hall", room: "Data hall",
      text: "Computer room air handlers and liquid cooling remove heat from the racks. Fan arrays keep air moving during maintenance.",
      products: ["nortek-dc", "huntair-fanwall", "steamovap-humid"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // server racks inside
    for (var r = 0; r < 2; r++) for (var k = 0; k < 8; k++) kit.box(1.6, 5.5, 3.4, -w / 2 + 3.2 + k * 2.9, 3.05, -3.5 + r * 6, "dark");
    // row of rooftop condensers
    for (var n = 0; n < 5; n++) { kit.box(2.6, 1.6, 2.8, 1 + n * 3, h + 1.1, -5, "equip"); kit.cyl(0.9, 0.9, 0.3, 1 + n * 3, h + 2.05, -5, "dark"); }
    // standby generators in the yard
    for (var g = 0; g < 3; g++) { kit.box(2.4, 2.6, 5, 5 + g * 3.2, 1.4, f + 7.5, "#3f4854"); kit.cyl(0.2, 0.2, 2, 5 + g * 3.2, 3.6, f + 6, "dark"); }
    kit.front(kit.sign("DATA CENTER", 9, 1.5, -7, h - 2.6, f + 0.45, "#56606c", "#ffffff"));
  }
});
