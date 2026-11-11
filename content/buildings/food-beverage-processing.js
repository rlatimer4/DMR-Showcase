/*
 * Food & Beverage Processing — building model.
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
  id: "food-beverage-processing",
  name: "Food & Beverage Processing",
  use: "industrial",
  size: { width: 28, depth: 16, floors: 1, floorHeight: 8, bays: 2, extraHeight: 10 },
  model: null,
  facade: { style: "solid", color: "#f1f3f5", stripe: "#2e9e5b", doors: 2 },
  walls: "#f4f6f7",
  intro: "Processing rooms are washed down daily and must stay dry and clean.",
  challenges: ["Wash-down humidity", "Sanitation", "Temperature-controlled process rooms"],
  stops: [
    { id: "food-beverage-processing-1", at: { floor: "roof", x: 0.3 }, title: "Process air handling", room: "",
      text: "Custom air handlers with UV-C keep coils clean in sanitary applications.",
      products: ["nortek-ahu", "uvr-coil"] },
    { id: "food-beverage-processing-2", at: { floor: 0, x: 0.7 }, title: "Processing room", room: "Process",
      text: "Desiccant dehumidifiers dry the room after wash-down and prevent condensation.",
      products: ["fisair-dehum", "novelaire-desiccant"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // storage silos behind the plant
    for (var k = 0; k < 4; k++) {
      kit.cyl(2.2, 2.2, 15, -2 + k * 4.8, 7.5, -f - 3.2, "#dfe5ea");
      kit.cone(2.3, 2, -2 + k * 4.8, 16, -f - 3.2, "#b8c2ca", 16);
    }
    kit.box(17, 0.3, 1, 5.2, 15.2, -f - 3.2, "dark");
    // tanker truck
    var tank = kit.cyl(1.2, 1.2, 7, 6, 2, f + 8.5, "#cfd8df"); tank.rotation.z = Math.PI / 2;
    kit.box(2.2, 2.4, 2.4, 11, 1.5, f + 8.5, "#2e9e5b");
  }
});
