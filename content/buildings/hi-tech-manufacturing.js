/*
 * Hi-Tech Manufacturing — building model.
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
  id: "hi-tech-manufacturing",
  name: "Hi-Tech Manufacturing",
  use: "industrial",
  size: { width: 28, depth: 16, floors: 2, floorHeight: 6, bays: 2 },
  model: null,
  intro: "Semiconductor and electronics production runs in cleanrooms that never shut down.",
  challenges: ["Cleanroom recirculation volumes", "Tight temperature and humidity", "Continuous operation"],
  stops: [
    { id: "hi-tech-manufacturing-1", at: { floor: "roof", x: 0.35 }, title: "Chilled water plant", room: "",
      text: "A packaged chiller plant supplies process and comfort cooling from one enclosure.",
      products: ["governair-chiller", "fuji-vfd"] },
    { id: "hi-tech-manufacturing-2", at: { floor: 1, x: 0.5 }, title: "Cleanroom", room: "Cleanroom",
      text: "Fan arrays and cleanroom air systems recirculate filtered air continuously.",
      products: ["huntair-cleanroom", "huntair-fanwall"] },
    { id: "hi-tech-manufacturing-3", at: { floor: 0, x: 0.25 }, title: "Make-up air", room: "MAU",
      text: "Make-up air units with humidifiers supply the cleanroom with conditioned outdoor air.",
      products: ["nortek-ahu", "steamovap-humid", "cooney-coil"] }
  ]
});
