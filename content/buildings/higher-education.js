/*
 * Higher Education — building model.
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
  id: "higher-education",
  name: "Higher Education",
  use: "institutional",
  size: { width: 26, depth: 16, floors: 3, floorHeight: 4.4, bays: 3, extraHeight: 14 },
  model: null,
  facade: { style: "brick", color: "#9c4f35" },
  walls: "#a85a3c",
  intro: "Campus buildings mix classrooms, labs and offices under one roof.",
  challenges: ["Lab exhaust energy", "Mixed uses in one building", "Deferred maintenance"],
  stops: [
    { id: "higher-education-1", at: { floor: "roof", x: 0.4 }, title: "Lab exhaust energy recovery", room: "",
      text: "Plate exchangers recover energy from lab exhaust while keeping it separate from the supply air.",
      products: ["klingenburg-plate", "ventrol-ahu"] },
    { id: "higher-education-2", at: { floor: 2, x: 0.17 }, title: "Teaching labs", room: "Lab",
      text: "Custom air handlers and fan arrays supply the high air change rates labs need.",
      products: ["nortek-ahu", "huntair-fanwall"] },
    { id: "higher-education-3", at: { floor: 1, x: 0.5 }, title: "Lecture halls", room: "Lecture",
      text: "Chilled beams and water-source heat pumps keep lecture halls quiet.",
      products: ["nuclimate-beam", "mammoth-wshp"] },
    { id: "higher-education-4", at: { floor: 0, x: 0.83 }, title: "Mechanical room", room: "Mech",
      text: "Freeze-resistant coils replace failed preheat coils in existing air handlers.",
      products: ["cooney-coil", "fuji-vfd"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // clock tower
    kit.box(4, 9, 4, 9, h + 4.6, -4.5, "#a85a3c");
    kit.cone(3.3, 4, 9, h + 11.1, -4.5, "#4f6b5a");
    var face = kit.cyl(1.3, 1.3, 0.15, 9, h + 6.6, -2.42, "wall"); face.rotation.x = Math.PI / 2;
    kit.box(0.14, 1, 0.1, 9, h + 7, -2.3, "dark"); kit.box(0.7, 0.14, 0.1, 9.3, h + 6.6, -2.3, "dark");
    // quad
    kit.box(16, 0.12, 6, 3, 0.14, f + 8, "#7cb87c"); kit.box(1.5, 0.14, 6, 3, 0.16, f + 8, "wall"); kit.box(16, 0.14, 1.2, 3, 0.16, f + 8, "wall");
  }
});
