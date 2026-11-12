/*
 * Huntair — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "huntair" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "huntair",
  name: "Huntair",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Huntair.jpg",
  website: null,
  blurb: "FANWALL fan arrays, cleanroom systems and operating room air delivery.",
  products: [
    { id: "huntair-fanwall", category: "fanwall", shape: "fanwall" },
    { id: "huntair-cleansuite", category: "critical", shape: "orceiling" },
    { id: "huntair-cleanroom", category: "critical", shape: "ffu" }
  ]
});
