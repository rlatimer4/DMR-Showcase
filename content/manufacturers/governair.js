/*
 * Governair — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "governair" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "governair",
  name: "Governair",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Governair.jpg",
  website: "https://www.nortekair.com/about/our-brands/governair/",
  blurb: "Custom and knockdown air handlers, and FANWALL retrofit systems.",
  products: [
    { id: "governair-ahu", category: "ahu", shape: "ahu" },
    { id: "governair-knockdown", category: "ahu", shape: "ahu" },
    { id: "governair-fanwall", category: "fanwall", shape: "fanwall" }
  ]
});
