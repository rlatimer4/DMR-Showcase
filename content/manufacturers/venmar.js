/*
 * Venmar CES — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "venmar" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "venmar",
  name: "Venmar CES",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Venmar.jpg",
  website: null,
  blurb: "Energy recovery ventilators and dedicated outdoor air systems.",
  products: [
    { id: "venmar-erv", category: "recovery", shape: "erv" },
    { id: "venmar-doas", category: "recovery", shape: "erv" }
  ]
});
