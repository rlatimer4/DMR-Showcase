/*
 * Mid-Rise Office — building model.
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
  id: "mid-rise-office",
  name: "Mid-Rise Office",
  use: "commercial",
  size: { width: 20, depth: 16, floors: 5, floorHeight: 3.8, bays: 2, extraHeight: 3 },
  model: null,
  facade: { style: "bands", color: "#cfd8df" },
  walls: "#cfd8df",
  intro: "Mid-rise offices balance first cost against energy use.",
  challenges: ["Energy code compliance", "Zone control on every floor", "Mechanical space on each floor"],
  stops: [
    { id: "mid-rise-office-1", at: { floor: "roof", x: 0.4 }, title: "Outdoor air and recovery", room: "",
      text: "Energy recovery ventilators pre-condition outdoor air using the building's exhaust.",
      products: ["venmar-erv", "ventrol-ahu"] },
    { id: "mid-rise-office-2", at: { floor: 3, x: 0.7 }, title: "Office floor", room: "Office",
      text: "Water-source heat pumps or VAV terminals serve each zone.",
      products: ["mammoth-wshp", "envirotec-vav"] },
    { id: "mid-rise-office-3", at: { floor: 1, x: 0.25 }, title: "Floor-by-floor units", room: "Mech",
      text: "Vertical self-contained units serve one floor each, driven by variable frequency drives.",
      products: ["mammoth-rtu", "fuji-vfd"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // entrance canopy, roof screen and planters
    kit.front(kit.box(7, 0.35, 3, 0, 3.6, f + 1.6, "dark"));
    kit.box(8, 2, 0.3, 5.5, h + 1.3, 4, "equip"); kit.box(0.3, 2, 5, 9.5, h + 1.3, 1.5, "equip");
    kit.box(4, 0.8, 1.6, 6, 0.4, f + 4.5, "#7cb87c"); kit.box(4, 0.8, 1.6, 0.5, 0.4, f + 4.5, "#7cb87c");
  }
});
