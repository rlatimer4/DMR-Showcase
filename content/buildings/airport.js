/*
 * Airport — building model.
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
  id: "airport",
  name: "Airport",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 2, floorHeight: 6, bays: 2 },
  model: null,
  intro: "Terminals are large, open and busy around the clock.",
  challenges: ["Very large open volumes", "Doors that are always opening", "Jet fumes and outdoor air quality"],
  stops: [
    { id: "airport-1", at: { floor: "roof", x: 0.3 }, title: "Terminal air handling", room: "",
      text: "Custom air handlers with fan arrays serve the concourse and keep running through a fan failure.",
      products: ["temtrol-ahu", "huntair-fanwall"] },
    { id: "airport-2", at: { floor: 1, x: 0.7 }, title: "Concourse", room: "Concourse",
      text: "Trench units along the glass and UV-C in the air stream keep gate areas comfortable.",
      products: ["kampmann-trench", "uvr-air"] },
    { id: "airport-3", at: { floor: 0, x: 0.25 }, title: "Baggage hall", room: "Baggage",
      text: "Air curtains hold conditioned air at the doors and unit heaters cover the back-of-house.",
      products: ["kampmann-curtain", "sterling-unit"] }
  ],
  build: function (kit, d) {
    kit.cyl(1.4, 1.8, 16, d.width / 2 - 4, d.height + 8, -3, "wall");
    kit.cyl(3, 2.2, 2.4, d.width / 2 - 4, d.height + 17, -3, "glass");
  }
});
