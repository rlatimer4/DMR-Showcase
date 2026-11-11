/*
 * Runtal — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "runtal" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "runtal",
  name: "Runtal",
  active: true,
  family: "Independent",
  logo: "assets/logos/runtal.png",
  website: null,
  blurb: "Hydronic, electric and steam panel radiators.",
  products: [
    {
      id: "runtal-radiator",
      category: "hydronic",
      name: "Panel Radiators",
      summary: "Flat-tube steel radiators in wall panel, baseboard and vertical styles, with hydronic, electric and steam versions.",
      features: [
        "Wall panels, baseboards and vertical columns",
        "Hydronic, electric and steam",
        "Wide range of sizes and colors",
        "Easy-to-clean flat surfaces"
      ],
      photo: null
    }
  ]
});
