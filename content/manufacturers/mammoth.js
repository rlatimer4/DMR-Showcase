/*
 * Mammoth — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "mammoth" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "mammoth",
  name: "Mammoth",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Mammoth.jpg",
  website: "https://www.nortekair.com/about/our-brands/mammoth/",
  blurb: "UltraLine custom packaged rooftops, V-Cube vertical self-contained systems and air-source heat pumps.",
  products: [
    { id: "mammoth-ultraline", category: "packaged", shape: "rooftop" },
    { id: "mammoth-vcube", category: "packaged", shape: "vcube" },
    { id: "mammoth-vcube-slim", category: "packaged", shape: "vcube" },
    { id: "mammoth-ashp", category: "heatpump", shape: "rooftop" }
  ]
});
