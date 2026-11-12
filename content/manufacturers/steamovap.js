/*
 * SteamOVap Technologies — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "steamovap" from content/manifest.js.
 * To retire one product line, delete its line here.
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
    { id: "steamovap-humid", category: "humid", shape: "humidifier" }
  ]
});
