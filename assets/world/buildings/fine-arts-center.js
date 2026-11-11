/*
 * Fine Arts Center — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "fine-arts-center",
  name: "Fine Arts Center",
  use: "institutional",
  size: { width: 24, depth: 16, floors: 1, floorHeight: 10, bays: 2 },
  model: null,
  intro: "A performance hall needs air that the audience cannot hear.",
  challenges: ["Very low background noise", "Stage and audience loads", "Instrument humidity"],
  stops: [
    { id: "fine-arts-center-1", at: { floor: "roof", x: 0.35 }, title: "Auditorium air handling", room: "",
      text: "Fan arrays produce less low-frequency noise than a single large fan.",
      products: ["temtrol-ahu", "huntair-fanwall"] },
    { id: "fine-arts-center-2", at: { floor: 0, x: 0.3 }, title: "Auditorium", room: "Auditorium",
      text: "Steam humidifiers protect instruments and finishes.",
      products: ["steamovap-humid", "nortek-ahu"] }
  ]
});
