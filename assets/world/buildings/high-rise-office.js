/*
 * High-Rise Office — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "high-rise-office",
  name: "High-Rise Office",
  use: "commercial",
  size: { width: 18, depth: 16, floors: 10, floorHeight: 3.8, bays: 2 },
  model: null,
  intro: "Tall office buildings are leased by the floor and refit often.",
  challenges: ["Limited ceiling and shaft space", "Tenant-by-tenant flexibility", "Replacing rooftop plant on an occupied building"],
  stops: [
    { id: "high-rise-office-1", at: { floor: "roof", x: 0.45 }, title: "Rooftop plant", room: "",
      text: "A custom rooftop unit matches the existing curb and structure, so replacement does not require roof rework.",
      products: ["governair-rtu", "klingenburg-wheel"] },
    { id: "high-rise-office-2", at: { floor: 7, x: 0.25 }, title: "Open office", room: "Open office",
      text: "Chilled beams and VAV terminals condition the floor with small ducts and shallow ceilings.",
      products: ["nuclimate-beam", "envirotec-vav", "uvr-coil"] },
    { id: "high-rise-office-3", at: { floor: 4, x: 0.75 }, title: "Tenant fit-out", room: "Tenant",
      text: "VRF and mini-splits add cooling for a tenant's server closet without changing the base building system.",
      products: ["gree-vrf", "gree-mini"] },
    { id: "high-rise-office-4", at: { floor: 0, x: 0.3 }, title: "Lobby", room: "Lobby",
      text: "Trench units sit in the floor along the glass. Panel radiators and air curtains handle the entrance.",
      products: ["kampmann-trench", "runtal-radiator", "kampmann-curtain"] }
  ]
});
