/*
 * UV Resources — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "uvr" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "uvr",
  name: "UV Resources",
  active: true,
  family: "Independent",
  logo: "assets/logos/UVR-logo-for-website.jpg",
  website: null,
  blurb: "UV-C fixtures for coil and air-stream disinfection.",
  products: [
    {
      id: "uvr-coil",
      category: "iaq",
      name: "UV-C Coil Disinfection",
      summary: "UV-C fixtures that keep cooling coils and drain pans free of biological growth, which holds airflow and heat transfer at design levels.",
      features: [
        "Fixtures for new and existing air handlers",
        "Reduces coil cleaning",
        "Maintains coil pressure drop and capacity"
      ],
      photo: null
    },
    {
      id: "uvr-air",
      category: "iaq",
      name: "Air-Stream & Upper-Room UV-C",
      summary: "UV-C for disinfecting moving air in ducts and occupied rooms.",
      features: [
        "In-duct air-stream fixtures",
        "Upper-room fixtures for occupied spaces",
        "Sized to the airflow or room"
      ],
      photo: null
    }
  ]
});
