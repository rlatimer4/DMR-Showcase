/*
 * Museum — building model.
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
  id: "museum",
  name: "Museum",
  use: "institutional",
  size: { width: 26, depth: 16, floors: 2, floorHeight: 6, bays: 2, extraHeight: 5 },
  model: null,
  facade: { style: "solid", color: "#e6dfd0", stripe: "#b9a15a" },
  walls: "#ece7db",
  intro: "Galleries hold temperature and humidity within a narrow band all year.",
  challenges: ["Tight humidity tolerance", "Protection of collections", "Variable visitor loads"],
  stops: [
    { id: "museum-1", at: { floor: "roof", x: 0.4 }, title: "Gallery air handling", room: "",
      text: "Custom air handlers with close humidity control serve the galleries.",
      products: ["temtrol-ahu", "uvr-coil"] },
    { id: "museum-2", at: { floor: 1, x: 0.3 }, title: "Galleries", room: "Gallery",
      text: "Humidifiers and desiccant systems hold the galleries at setpoint in every season.",
      products: ["fisair-humid", "novelaire-desiccant"] },
    { id: "museum-3", at: { floor: 0, x: 0.7 }, title: "Collection storage", room: "Storage",
      text: "Steam humidification and dehumidifiers protect stored collections.",
      products: ["steamovap-humid", "fisair-dehum"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // grand steps, colonnade and pediment
    for (var s = 0; s < 3; s++) kit.box(24 - s * 2, 0.4, 5 - s * 1.2, 0, 0.2 + s * 0.4, f + 2.8 - s * 0.6, "#f4f1ea");
    for (var k = 0; k < 8; k++) kit.front(kit.cyl(0.6, 0.6, h - 1.2, -10.5 + k * 3, 1.2 + (h - 1.2) / 2, f + 1.5, "#f4f1ea"));
    kit.front(kit.gable(24, 4, 2.8, 0, h, f + 1.3, "#f4f1ea"));
    kit.front(kit.sign("ART", 2, 5.5, -4.5, h / 2 + 0.6, f + 0.5, "#c0392b", "#ffffff"));
    kit.front(kit.sign("HISTORY", 2, 5.5, 4.5, h / 2 + 0.6, f + 0.5, "#1779ba", "#ffffff"));
  }
});
