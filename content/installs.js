/*
 * DMR Showcase — map pins.
 *
 * One record per installation. `manufacturers` lists brand ids from data.js and
 * drives the manufacturer filter on the map. `photos` is optional: add image
 * paths or URLs and they appear in the pin's info window. `building` is a
 * building id from content/buildings/.
 *
 * To add pins without editing this file by hand, open the site with ?edit=1
 * (e.g. index.html?edit=1#installations), drop pins on the map, then use
 * "Download installs.js" and replace this file.
 *
 * These are SAMPLE records, not real DMR projects.
 */
DMR.installs = [
  {"id": "s01", "name": "Sample hospital pavilion", "city": "Bethesda, MD", "lat": 38.9847, "lng": -77.0947, "building": "hospital", "year": 2024, "manufacturers": ["temtrol", "huntair"], "products": ["temtrol-ahu", "huntair-fanwall", "huntair-cleansuite"], "photos": [], "notes": ""},
  {"id": "s02", "name": "Sample data center campus", "city": "Ashburn, VA", "lat": 39.0438, "lng": -77.4874, "building": "data-center", "year": 2025, "manufacturers": ["nortek", "governair"], "products": ["nortek-dc", "governair-chiller"], "photos": [], "notes": ""},
  {"id": "s03", "name": "Sample research laboratory", "city": "Rockville, MD", "lat": 39.084, "lng": -77.1528, "building": "higher-education", "year": 2023, "manufacturers": ["huntair", "klingenburg"], "products": ["huntair-cleanroom", "klingenburg-plate"], "photos": [], "notes": ""},
  {"id": "s04", "name": "Sample university science hall", "city": "College Park, MD", "lat": 38.9897, "lng": -76.9378, "building": "higher-education", "year": 2022, "manufacturers": ["venmar", "nuclimate"], "products": ["venmar-doas", "nuclimate-beam"], "photos": [], "notes": ""},
  {"id": "s05", "name": "Sample office tower", "city": "Arlington, VA", "lat": 38.8816, "lng": -77.091, "building": "high-rise-office", "year": 2024, "manufacturers": ["governair", "envirotec"], "products": ["governair-rtu", "envirotec-vav"], "photos": [], "notes": ""},
  {"id": "s06", "name": "Sample medical center", "city": "Baltimore, MD", "lat": 39.2904, "lng": -76.6122, "building": "hospital", "year": 2021, "manufacturers": ["huntair", "steamovap", "uvr"], "products": ["huntair-fanwall", "steamovap-humid", "uvr-coil"], "photos": [], "notes": ""},
  {"id": "s07", "name": "Sample colocation facility", "city": "Manassas, VA", "lat": 38.7509, "lng": -77.4753, "building": "data-center", "year": 2025, "manufacturers": ["nortek", "fuji"], "products": ["nortek-dc", "fuji-vfd"], "photos": [], "notes": ""},
  {"id": "s08", "name": "Sample biomanufacturing plant", "city": "Frederick, MD", "lat": 39.4143, "lng": -77.4105, "building": "pharma-manufacturing", "year": 2023, "manufacturers": ["novelaire", "huntair"], "products": ["novelaire-desiccant", "huntair-cleanroom"], "photos": [], "notes": ""},
  {"id": "s09", "name": "Sample federal office building", "city": "Washington, DC", "lat": 38.8951, "lng": -77.0364, "building": "government-office", "year": 2022, "manufacturers": ["ventrol", "cooney"], "products": ["ventrol-ahu", "cooney-coil"], "photos": [], "notes": ""},
  {"id": "s10", "name": "Sample high school", "city": "Richmond, VA", "lat": 37.5407, "lng": -77.436, "building": "k-12-school", "year": 2024, "manufacturers": ["mammoth", "venmar"], "products": ["mammoth-wshp", "venmar-erv"], "photos": [], "notes": ""},
  {"id": "s11", "name": "Sample corporate headquarters", "city": "Columbia, MD", "lat": 39.2037, "lng": -76.861, "building": "mid-rise-office", "year": 2023, "manufacturers": ["nuclimate", "kampmann"], "products": ["nuclimate-beam", "kampmann-trench"], "photos": [], "notes": ""},
  {"id": "s12", "name": "Sample distribution center", "city": "Hagerstown, MD", "lat": 39.6418, "lng": -77.72, "building": "warehouse", "year": 2021, "manufacturers": ["rapid", "sterling"], "products": ["rapid-turnover", "sterling-unit"], "photos": [], "notes": ""},
  {"id": "s13", "name": "Sample state office complex", "city": "Annapolis, MD", "lat": 38.9784, "lng": -76.4922, "building": "government-office", "year": 2020, "manufacturers": ["temtrol", "runtal"], "products": ["temtrol-ahu", "runtal-radiator"], "photos": [], "notes": ""},
  {"id": "s14", "name": "Sample port warehouse", "city": "Norfolk, VA", "lat": 36.8508, "lng": -76.2859, "building": "warehouse", "year": 2022, "manufacturers": ["rapid", "kampmann"], "products": ["rapid-mua", "kampmann-curtain"], "photos": [], "notes": ""},
  {"id": "s15", "name": "Sample apartment tower", "city": "Tysons, VA", "lat": 38.9187, "lng": -77.2311, "building": "multifamily", "year": 2025, "manufacturers": ["gree", "envirotec"], "products": ["gree-vrf", "envirotec-fancoil"], "photos": [], "notes": ""},
  {"id": "s16", "name": "Sample hyperscale data hall", "city": "Sterling, VA", "lat": 39.0062, "lng": -77.4286, "building": "data-center", "year": 2024, "manufacturers": ["governair", "huntair"], "products": ["governair-chiller", "huntair-fanwall"], "photos": [], "notes": ""}
];
