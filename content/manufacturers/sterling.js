/*
 * Sterling — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "sterling" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "sterling",
  name: "Sterling",
  active: true,
  family: "Independent",
  logo: "assets/logos/sterling-hvac.png",
  website: null,
  blurb: "Unit heaters and hydronic heating products.",
  products: [
    {
      id: "sterling-hydronic",
      category: "hydronic",
      name: "Finned Tube & Convectors",
      summary: "Perimeter hydronic heating: commercial finned tube, convectors and cabinet unit heaters.",
      features: [
        "Commercial finned tube radiation",
        "Convectors and cabinet unit heaters",
        "Hot water and steam"
      ],
      photo: null
    },
    {
      id: "sterling-unit",
      category: "industrial",
      name: "Unit Heaters",
      summary: "Gas-fired and hydronic unit heaters for warehouses, garages, shops and mechanical spaces.",
      features: [
        "Gas-fired, hot water and steam models",
        "Horizontal and vertical discharge",
        "Wide capacity range"
      ],
      photo: null
    }
  ]
});
