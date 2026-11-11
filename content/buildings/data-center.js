/*
 * Data Center — building model.
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
  id: "data-center",
  name: "Data Center",
  use: "commercial",
  size: { width: 28, depth: 16, floors: 1, floorHeight: 7, bays: 1 },
  model: null,
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
  build: function (kit, d) {
    for (var r = 0; r < 2; r++) for (var k = 0; k < 8; k++) kit.box(1.6, 5.5, 3.4, -d.width / 2 + 3.2 + k * 2.9, 3.05, -3.5 + r * 6, "dark");
  }
});
