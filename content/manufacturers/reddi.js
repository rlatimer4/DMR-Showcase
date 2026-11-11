/*
 * Redd-i — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "reddi" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "reddi",
  name: "Redd-i",
  active: true,
  family: "Independent",
  logo: "assets/logos/reddi.png",
  website: null,
  blurb: "Duct heaters, VAV systems and electric unit and wall heaters, built in the USA.",
  products: [
    {
      id: "reddi-line",
      category: "industrial",
      name: "Electric Duct & Unit Heaters",
      summary: "Electric duct heaters, hazardous-location unit heaters and wall heaters, plus VAV systems.",
      features: [
        "Electric duct heaters for air handlers and terminal units",
        "Unit heaters rated for hazardous locations",
        "Residential and commercial wall heaters"
      ],
      photo: null
    }
  ]
});
