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
  website: "https://steamovap.com/",
  blurb: "Steam, evaporative, ultrasonic and atomizing humidifiers, controls and water treatment.",
  products: [
    { id: "steamovap-ier", category: "humid", shape: "humidifier" },
    { id: "steamovap-res", category: "humid", shape: "humidifier" },
    { id: "steamovap-ise", category: "humid", shape: "humidifier" },
    { id: "steamovap-ils", category: "humid", shape: "humidifier" },
    { id: "steamovap-distribution", category: "humid", shape: "humidifier" },
    { id: "steamovap-aem", category: "humid", shape: "humidifier" },
    { id: "steamovap-aul", category: "humid", shape: "humidifier" },
    { id: "steamovap-aca", category: "humid", shape: "humidifier" },
    { id: "steamovap-controls", category: "controls", shape: "box" },
    { id: "steamovap-safety", category: "controls", shape: "box" },
    { id: "steamovap-water-filter", category: "controls", shape: "box" },
    { id: "steamovap-wro", category: "controls", shape: "box" }
  ]
});
