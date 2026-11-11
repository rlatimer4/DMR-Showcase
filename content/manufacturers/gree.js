/*
 * GREE — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "gree" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "gree",
  name: "GREE",
  active: true,
  family: "Independent",
  logo: "assets/logos/GREE-logo-v4.png",
  website: null,
  blurb: "GMV VRF systems and ductless mini-split heat pumps.",
  products: [
    {
      id: "gree-vrf",
      category: "heatpump",
      name: "GMV Variable Refrigerant Flow",
      summary: "VRF heat pump and heat recovery systems that serve many indoor units from one outdoor unit.",
      features: [
        "Heat pump and heat recovery systems",
        "GMV5 Mini for smaller buildings",
        "Ducted, cassette and wall-mounted indoor units"
      ],
      photo: null
    },
    {
      id: "gree-mini",
      category: "heatpump",
      name: "Mini-Split Heat Pumps",
      summary: "Single-zone and multi-zone ductless heat pumps for rooms a central system does not reach.",
      features: [
        "Single-zone and multi-zone systems",
        "Suited to server closets, additions and renovations",
        "Inverter-driven compressors"
      ],
      photo: null
    }
  ]
});
