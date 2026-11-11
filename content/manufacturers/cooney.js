/*
 * Cooney Technologies — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "cooney" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "cooney",
  name: "Cooney Technologies",
  active: true,
  family: "Independent",
  logo: "assets/logos/Cooney-Logo.jpg",
  website: null,
  blurb: "Freeze-resistant heating and cooling coils.",
  products: [
    {
      id: "cooney-coil",
      category: "hydronic",
      name: "Freeze-Resistant Coils",
      summary: "Heating and cooling coils designed to relieve the pressure that bursts tubes when a coil freezes.",
      features: [
        "Freeze Block technology for hydronic coils",
        "Steam and hot water preheat coils for outdoor air",
        "Custom sizes for replacement in existing air handlers"
      ],
      photo: null
    }
  ]
});
