/*
 * Temtrol — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "temtrol" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "temtrol",
  name: "Temtrol",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Temtrol.jpg",
  website: null,
  blurb: "Custom air handlers for institutional and healthcare projects.",
  products: [
    { id: "temtrol-ahu", category: "ahu", shape: "ahu" }
  ]
});
