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
  website: null,
  blurb: "Water-source heat pumps and custom packaged HVAC.",
  products: [
    { id: "mammoth-rtu", category: "packaged", shape: "rooftop" },
    { id: "mammoth-wshp", category: "wshp", shape: "wshp" }
  ]
});
