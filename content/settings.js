/*
 * DMR Showcase — site settings: company details, map, and the 3D world's use types.
 */
window.DMR = window.DMR || {};

DMR.company = {
  name: "DMR Associates, Inc.",
  tagline: "HVAC manufacturers' representative for DC, Maryland & Virginia",
  founded: 1969,
  address: ["15892-B Gaither Drive","Gaithersburg, MD 20877"],
  phone: "301-556-0700",
  email: "info@dmr-hvac.com",
  website: "https://dmr-hvac.com",
  lineCard: "https://dmr-hvac.com/products",
  hq: { lat: 39.1434, lng: -77.2014 }
};

/*
 * googleMapsApiKey: a Google Maps JavaScript API key. Restrict it to this
 * site's domain in the Google Cloud console. With no key the map still loads,
 * but Google overlays a "for development purposes only" watermark.
 */
DMR.mapConfig = {
  googleMapsApiKey: "",
  center: { lat: 38.75, lng: -77.1 },
  zoom: 8
};

/*
 * Use types are the districts of the 3D world and the groups in every
 * "Building type" filter. A use type with no buildings is hidden. Each
 * building file names its use type with `use`.
 */
DMR.useTypes = [
  { id: "commercial", name: "Commercial", color: "#1779ba" },
  { id: "institutional", name: "Institutional", color: "#4f7f9e" },
  { id: "industrial", name: "Industrial", color: "#5b6673" },
  { id: "residential", name: "Residential", color: "#2a8a8a" }
];

/*
 * The 3D world's grid, in metres. Districts sit side by side until a row would
 * be wider than maxWidth, then start a new row in front.
 */
DMR.world = {
  cell: { width: 40, depth: 44 },   // spacing between building centres
  columns: 3,                       // buildings per row inside a district
  districtGap: 30,                  // space between districts
  bandGap: 26,                      // space between rows of districts
  maxWidth: 290
};
