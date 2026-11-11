/*
 * Industrial Manufacturing — building model.
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
  id: "industrial-manufacturing",
  name: "Industrial Manufacturing",
  use: "industrial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 10, bays: 2 },
  model: null,
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
  ]
});
