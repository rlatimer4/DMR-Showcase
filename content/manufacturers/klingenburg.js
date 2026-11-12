/*
 * Klingenburg — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "klingenburg" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "klingenburg",
  name: "Klingenburg",
  active: true,
  family: "Independent",
  logo: "assets/logos/klingenburg.png",
  website: null,
  blurb: "Rotary and plate heat exchangers for energy recovery.",
  products: [
    { id: "klingenburg-wheel", category: "recovery", shape: "wheel" },
    { id: "klingenburg-plate", category: "recovery", shape: "plate" }
  ]
});
