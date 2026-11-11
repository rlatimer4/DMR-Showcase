/*
 * Retail Strip — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "retail-strip",
  name: "Retail Strip",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 5, bays: 4 },
  model: null,
  intro: "Each tenant pays its own utility bill and wants its own system.",
  challenges: ["Separate systems for each tenant", "Frequent door openings", "Low maintenance budgets"],
  stops: [
    { id: "retail-strip-1", at: { floor: "roof", x: 0.4 }, title: "Tenant rooftop units", room: "",
      text: "Packaged rooftop units serve each storefront.",
      products: ["mammoth-rtu"] },
    { id: "retail-strip-2", at: { floor: 0, x: 0.12 }, title: "Storefront", room: "Shop",
      text: "Air curtains keep conditioned air in at the door. Mini-splits handle small shops and stock rooms.",
      products: ["kampmann-curtain", "gree-mini", "reddi-line"] }
  ]
});
