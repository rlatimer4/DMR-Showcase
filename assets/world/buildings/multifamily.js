/*
 * Multifamily Residential — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "multifamily",
  name: "Multifamily Residential",
  use: "residential",
  size: { width: 20, depth: 16, floors: 6, floorHeight: 3.4, bays: 2 },
  model: null,
  intro: "Apartments need individual control and individual billing in every unit.",
  challenges: ["Individual control in each unit", "Ventilation for corridors", "Limited space for equipment"],
  stops: [
    { id: "multifamily-1", at: { floor: "roof", x: 0.45 }, title: "Corridor ventilation", room: "",
      text: "Energy recovery ventilators supply corridors and units with fresh air.",
      products: ["venmar-erv", "novelaire-wheel"] },
    { id: "multifamily-2", at: { floor: 3, x: 0.25 }, title: "Apartments", room: "Apartment",
      text: "VRF, mini-splits or fan coils give each apartment its own system.",
      products: ["gree-vrf", "gree-mini", "envirotec-fancoil"] },
    { id: "multifamily-3", at: { floor: 0, x: 0.7 }, title: "Amenity level", room: "Amenity",
      text: "Water-source heat pumps and trench units serve the lobby and amenity spaces.",
      products: ["mammoth-wshp", "kampmann-trench"] }
  ]
});
