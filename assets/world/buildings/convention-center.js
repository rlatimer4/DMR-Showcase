/*
 * Convention Center — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "convention-center",
  name: "Convention Center",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 10, bays: 2 },
  model: null,
  intro: "Exhibit halls go from empty to thousands of people in an hour.",
  challenges: ["Huge swings in occupancy", "Long air throws in high spaces", "Large outdoor air volumes"],
  stops: [
    { id: "convention-center-1", at: { floor: "roof", x: 0.35 }, title: "Hall air handling", room: "",
      text: "Custom rooftop systems are sized for peak crowds and turn down when the hall is empty.",
      products: ["governair-rtu", "huntair-fanwall", "fuji-vfd"] },
    { id: "convention-center-2", at: { floor: 0, x: 0.7 }, title: "Exhibit hall", room: "Exhibit hall",
      text: "Energy recovery wheels cut the cost of the outdoor air a full hall needs.",
      products: ["klingenburg-wheel", "nortek-ahu"] }
  ]
});
