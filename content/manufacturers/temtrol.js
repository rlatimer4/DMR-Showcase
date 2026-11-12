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
  website: "https://www.nortekair.com/about/our-brands/temtrol/",
  blurb: "Custom, knockdown and Temtrol LC air handlers, and FANWALL systems.",
  products: [
    { id: "temtrol-ahu", category: "ahu", shape: "ahu" },
    { id: "temtrol-knockdown", category: "ahu", shape: "ahu" },
    { id: "temtrol-fanwall", category: "fanwall", shape: "fanwall" },
    { id: "temtrol-lc", category: "ahu", shape: "ahu" }
  ]
});
