/*
 * SteamOVap Technologies — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "steamovap" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "steamovap",
  name: "SteamOVap Technologies",
  active: true,
  family: "Independent",
  logo: "assets/logos/SteamOVap-logo.jpg",
  website: null,
  blurb: "Steam humidification systems.",
  products: [
    {
      id: "steamovap-humid",
      category: "humidity",
      name: "Steam Humidifiers",
      summary: "Steam humidification for air handlers and ducts, with gas, electric and steam-to-steam generators.",
      features: [
        "Electric, gas-fired and steam-to-steam generators",
        "Short-absorption dispersion panels",
        "Clean steam for healthcare and labs"
      ],
      photo: null
    }
  ]
});
