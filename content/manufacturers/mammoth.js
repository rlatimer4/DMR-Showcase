/*
 * Mammoth — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "mammoth" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "mammoth",
  name: "Mammoth",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Mammoth.jpg",
  website: null,
  blurb: "Water-source heat pumps and custom packaged HVAC.",
  products: [
    {
      id: "mammoth-rtu",
      category: "packaged",
      name: "Custom Packaged HVAC",
      summary: "Packaged rooftop and vertical self-contained units configured for the project's capacity and layout.",
      features: [
        "Rooftop and indoor self-contained configurations",
        "Water-cooled and air-cooled options",
        "Suited to schools and floor-by-floor office systems"
      ],
      photo: null
    },
    {
      id: "mammoth-wshp",
      category: "heatpump",
      name: "Water-Source Heat Pumps",
      summary: "Zone heat pumps on a shared water loop. Each zone heats or cools independently and the loop moves heat between them.",
      features: [
        "Vertical, horizontal and console cabinets",
        "Works with boiler/tower and geothermal loops",
        "Individual zone control"
      ],
      photo: null
    }
  ]
});
