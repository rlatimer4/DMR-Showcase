/*
 * Rapid Engineering — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "rapid" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "rapid",
  name: "Rapid Engineering",
  active: true,
  family: "Independent",
  logo: "assets/logos/Rapid-Engineering.png",
  website: null,
  blurb: "Direct-fired make-up air and industrial space heating.",
  products: [
    {
      id: "rapid-mua",
      category: "industrial",
      name: "Direct-Fired Make-Up Air",
      summary: "Gas-fired units that heat outdoor air to replace what exhaust systems remove.",
      features: [
        "Direct gas-fired heating",
        "Rooftop and indoor arrangements",
        "Building pressurization control"
      ],
      photo: null
    },
    {
      id: "rapid-turnover",
      category: "industrial",
      name: "Air Turnover Systems",
      summary: "Floor-mounted units that circulate large air volumes to keep temperature even from floor to ceiling in high-bay buildings.",
      features: [
        "Reduces temperature stratification",
        "Little or no ductwork",
        "Suited to warehouses and distribution centers"
      ],
      photo: null
    }
  ]
});
