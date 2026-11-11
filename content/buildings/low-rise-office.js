/*
 * Low-Rise Office — building model.
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
  id: "low-rise-office",
  name: "Low-Rise Office",
  use: "commercial",
  size: { width: 24, depth: 16, floors: 2, floorHeight: 4, bays: 3 },
  model: null,
  facade: { style: "windows", color: "#9a8266" },
  walls: "#e8dccb",
  intro: "Small office buildings need simple systems that are easy to maintain.",
  challenges: ["Simple maintenance", "Low first cost", "Comfort at the perimeter"],
  stops: [
    { id: "low-rise-office-1", at: { floor: "roof", x: 0.5 }, title: "Packaged rooftop units", room: "",
      text: "Packaged rooftop units provide heating, cooling and ventilation from one cabinet.",
      products: ["mammoth-rtu", "uvr-coil"] },
    { id: "low-rise-office-2", at: { floor: 1, x: 0.5 }, title: "Office suites", room: "Suite",
      text: "VRF gives each suite its own control without large ductwork.",
      products: ["gree-vrf", "gree-mini"] },
    { id: "low-rise-office-3", at: { floor: 0, x: 0.17 }, title: "Perimeter", room: "Entry",
      text: "Finned tube and panel radiators offset heat loss at the glass.",
      products: ["sterling-hydronic", "runtal-radiator"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // car park
    var cars = ["#c0392b", "#f4f6f8", "#1779ba", "#3f4854", "#f7b500"];
    kit.box(20, 0.1, 6, 3, 0.12, f + 8, "#8a929a");
    for (var c = 0; c < 5; c++) kit.box(1.9, 1.2, 4, -5 + c * 4, 0.75, f + 8, cars[c]);
  }
});
