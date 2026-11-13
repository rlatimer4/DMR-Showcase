/*
 * GREE — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "gree" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "gree",
  name: "GREE",
  active: true,
  family: "Independent",
  logo: "assets/logos/GREE-logo-v4.png",
  website: "https://www.greecommercial.com/",
  blurb: "GMV VRF systems, MultiPRO, mini-splits, central heat pumps and PTACs.",
  products: [
    { id: "gree-gmv6", category: "vrf", shape: "vrf" },
    { id: "gree-gmv6-ultra", category: "vrf", shape: "vrf" },
    { id: "gree-gmv6-mini", category: "vrf", shape: "vrf" },
    { id: "gree-gmv5", category: "vrf", shape: "vrf" },
    { id: "gree-gmv5-hr", category: "vrf", shape: "vrf" },
    { id: "gree-gmv5-mini", category: "vrf", shape: "vrf" },
    { id: "gree-mtac", category: "vrf", shape: "ptac" },
    { id: "gree-multipro", category: "vrf", shape: "vrf" },
    { id: "gree-cassette", category: "vrf", shape: "cassette" },
    { id: "gree-ducted", category: "vrf", shape: "fancoil" },
    { id: "gree-wall", category: "vrf", shape: "minisplit" },
    { id: "gree-floor-ceiling", category: "vrf", shape: "fancoil-floor" },
    { id: "gree-fresh-air", category: "vrf", shape: "blowercoil" },
    { id: "gree-ahu-kit", category: "vrf", shape: "blowercoil-vertical" },
    { id: "gree-livo", category: "vrf", shape: "minisplit" },
    { id: "gree-vireo", category: "vrf", shape: "minisplit" },
    { id: "gree-envo", category: "vrf", shape: "minisplit" },
    { id: "gree-sapphire", category: "vrf", shape: "minisplit" },
    { id: "gree-zeno", category: "vrf", shape: "minisplit" },
    { id: "gree-multi", category: "vrf", shape: "vrf" },
    { id: "gree-multi-eco", category: "vrf", shape: "vrf" },
    { id: "gree-flexx-ultra", category: "vrf", shape: "vrf" },
    { id: "gree-flexx-eco", category: "vrf", shape: "vrf" },
    { id: "gree-xpac", category: "packaged", shape: "rooftop" },
    { id: "gree-ptac", category: "packaged", shape: "ptac" },
    { id: "gree-etac", category: "packaged", shape: "ptac" },
    { id: "gree-ttw", category: "packaged", shape: "ptac" }
  ]
});
