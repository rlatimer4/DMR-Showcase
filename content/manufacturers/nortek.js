/*
 * Nortek Air Solutions — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "nortek" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "nortek",
  name: "Nortek Air Solutions",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/nortek.png",
  website: null,
  blurb: "Parent of the Governair, Huntair, Mammoth, Temtrol, Venmar CES and Ventrol brands, with custom air handling and data center cooling.",
  products: [
    { id: "nortek-ahu", category: "ahu", shape: "ahu" },
    { id: "nortek-dc", category: "datacenter", shape: "crah" }
  ]
});
