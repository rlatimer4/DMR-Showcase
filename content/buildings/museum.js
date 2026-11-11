/*
 * Museum — building model.
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
  id: "museum",
  name: "Museum",
  use: "institutional",
  size: { width: 26, depth: 16, floors: 2, floorHeight: 6, bays: 2 },
  model: null,
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
  ]
});
