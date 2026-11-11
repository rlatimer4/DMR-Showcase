/*
 * Klingenburg — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "klingenburg" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "klingenburg",
  name: "Klingenburg",
  active: true,
  family: "Independent",
  logo: "assets/logos/klingenburg.png",
  website: null,
  blurb: "Rotary and plate heat exchangers for energy recovery.",
  products: [
    {
      id: "klingenburg-wheel",
      category: "recovery",
      name: "Rotary Heat Exchangers",
      summary: "Energy recovery wheels supplied as components for air handling units.",
      features: [
        "Sensible and enthalpy wheels",
        "Wide range of diameters",
        "Supplied to air handler manufacturers and for replacement"
      ],
      photo: null
    },
    {
      id: "klingenburg-plate",
      category: "recovery",
      name: "Plate Heat Exchangers",
      summary: "Fixed-plate exchangers that recover energy with supply and exhaust air streams kept separate.",
      features: [
        "No moving parts",
        "Separated air streams for exhaust that must not recirculate",
        "Cross-flow and counter-flow designs"
      ],
      photo: null
    }
  ]
});
