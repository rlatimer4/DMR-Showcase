/*
 * Kampmann — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "kampmann" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "kampmann",
  name: "Kampmann",
  active: true,
  family: "Independent",
  logo: "assets/logos/Kampmann.png",
  website: null,
  blurb: "Trench heating and cooling, air curtains and unit heaters.",
  products: [
    { id: "kampmann-trench", category: "hydronic", shape: "trench" },
    { id: "kampmann-curtain", category: "heaters", shape: "aircurtain" }
  ]
});
