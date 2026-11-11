/*
 * Fuji Electric — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "fuji" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "fuji",
  name: "Fuji Electric",
  active: true,
  family: "Independent",
  logo: null,
  website: null,
  blurb: "FRENIC variable frequency drives for HVAC.",
  products: [
    {
      id: "fuji-vfd",
      category: "drives",
      name: "FRENIC-HVAC Drives",
      summary: "Variable frequency drives made for HVAC fans and pumps, including FRENIC-HPAQ packaged drives.",
      features: [
        "Packaged drives with disconnect and bypass options",
        "Built-in HVAC functions and BACnet",
        "Slim enclosures for mechanical rooms"
      ],
      photo: null
    }
  ]
});
