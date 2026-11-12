/*
 * Ventrol — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "ventrol" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "ventrol",
  name: "Ventrol",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Ventrol.jpg",
  website: null,
  blurb: "Custom air handling units for commercial and institutional buildings.",
  products: [
    { id: "ventrol-ahu", category: "ahu", shape: "ahu" }
  ]
});
