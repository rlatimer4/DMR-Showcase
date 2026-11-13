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
  website: "https://www.nortekair.com/about/our-brands/huntair/",
  blurb: "Custom air handlers, FANWALL systems, CleanPak fan filter units and cleanroom ceiling grids.",
  products: [
    { id: "huntair-ahu", category: "ahu", shape: "ahu" },
    { id: "huntair-knockdown", category: "ahu", shape: "ahu-knockdown" },
    { id: "huntair-fanwall", category: "fanwall", shape: "fanwall" },
    { id: "huntair-ffu", category: "critical", shape: "ffu" },
    { id: "huntair-ceiling-grid", category: "critical", shape: "ceiling-grid" },
    { id: "huntair-flex-trak", category: "critical", shape: "ceiling-grid" },
    { id: "huntair-light-grid", category: "critical", shape: "ceiling-grid" },
    { id: "huntair-plenums", category: "critical", shape: "ffu" }
  ]
});
