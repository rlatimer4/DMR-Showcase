/*
 * DMR Showcase — content model.
 *
 * Everything the site renders comes from this file, so content can be updated
 * without touching layout code.
 *
 * PROTOTYPE NOTES
 *  - Product copy is draft text written from public manufacturer positioning and
 *    must be reviewed by DMR before launch.
 *  - `photo: null` renders a placeholder tile. Set it to an image path
 *    (e.g. "assets/photos/temtrol-ahu.jpg") to show a real photo.
 *  - Map pins live in installs.js. They and `gallery` are SAMPLE records.
 */
window.DMR = window.DMR || {};

DMR.company = {
  name: "DMR Associates, Inc.",
  short: "DMR",
  tagline: "HVAC manufacturers' representative for DC, Maryland & Virginia",
  founded: 1969,
  address: ["15892-B Gaither Drive", "Gaithersburg, MD 20877"],
  phone: "301-556-0700",
  email: "info@dmr-hvac.com",
  website: "https://dmr-hvac.com",
  lineCard: "https://dmr-hvac.com/products",
  hq: { lat: 39.1434, lng: -77.2014 }
};

DMR.categories = [
  { id: "ahu", name: "Custom Air Handling", blurb: "Built-to-order air handlers sized to the space, the load and the mechanical room they have to fit in." },
  { id: "packaged", name: "Packaged & Rooftop", blurb: "Factory-assembled rooftop systems and packaged plants that arrive tested and ready to set." },
  { id: "fans", name: "Fan Arrays", blurb: "Multiple-fan arrays that add redundancy and shorten air handler footprints." },
  { id: "critical", name: "Critical Environments", blurb: "Operating rooms, cleanrooms and data halls where air quality and uptime are the specification." },
  { id: "recovery", name: "Energy Recovery & DOAS", blurb: "Wheels, plates and dedicated outdoor air systems that reclaim energy from exhaust air." },
  { id: "heatpump", name: "Heat Pumps & VRF", blurb: "Water-source heat pumps, VRF and ductless systems for zone-by-zone comfort." },
  { id: "terminal", name: "Terminal Units & Beams", blurb: "Fan coils, VAV terminals, chilled beams and trench units that deliver air at the zone." },
  { id: "hydronic", name: "Hydronic & Radiant", blurb: "Radiators, convectors, finned tube and coils for quiet perimeter heating." },
  { id: "industrial", name: "Industrial Heating & Make-Up Air", blurb: "Direct-fired make-up air, air turnover and unit heaters for large-volume buildings." },
  { id: "humidity", name: "Humidity Control", blurb: "Humidifiers and desiccant dehumidifiers that hold the space at setpoint." },
  { id: "iaq", name: "IAQ & UV-C", blurb: "Germicidal UV-C for clean coils and cleaner air streams." },
  { id: "drives", name: "Drives & Controls", blurb: "Variable frequency drives packaged for HVAC fans and pumps." }
];

DMR.brands = [
  { id: "nortek", logo: "assets/logos/nortek.png", name: "Nortek Air Solutions", family: "Nortek Air Solutions", blurb: "Parent of the Governair, Huntair, Mammoth, Temtrol, Venmar CES and Ventrol brands, with custom air handling and data center cooling." },
  { id: "governair", logo: "assets/logos/Governair.jpg", name: "Governair", family: "Nortek Air Solutions", blurb: "Custom packaged rooftop systems and packaged chiller plants." },
  { id: "huntair", logo: "assets/logos/Huntair.jpg", name: "Huntair", family: "Nortek Air Solutions", blurb: "FANWALL fan arrays, cleanroom systems and operating room air delivery." },
  { id: "mammoth", logo: "assets/logos/Mammoth.jpg", name: "Mammoth", family: "Nortek Air Solutions", blurb: "Water-source heat pumps and custom packaged HVAC." },
  { id: "temtrol", logo: "assets/logos/Temtrol.jpg", name: "Temtrol", family: "Nortek Air Solutions", blurb: "Custom air handlers for institutional and healthcare projects." },
  { id: "venmar", logo: "assets/logos/Venmar.jpg", name: "Venmar CES", family: "Nortek Air Solutions", blurb: "Energy recovery ventilators and dedicated outdoor air systems." },
  { id: "ventrol", logo: "assets/logos/Ventrol.jpg", name: "Ventrol", family: "Nortek Air Solutions", blurb: "Custom air handling units for commercial and institutional buildings." },
  { id: "cooney", logo: "assets/logos/Cooney-Logo.jpg", name: "Cooney Technologies", family: "Independent", blurb: "Freeze-resistant heating and cooling coils." },
  { id: "envirotec", logo: "assets/logos/enviro-tec.png", name: "Enviro-Tec", family: "Independent", blurb: "Fan coils, blower coils and VAV terminal units." },
  { id: "fisair", logo: "assets/logos/Fisair-Logo-3.jpg", name: "Fisair", family: "Independent", blurb: "Humidifiers and desiccant dehumidifiers." },
  { id: "fuji", name: "Fuji Electric", family: "Independent", blurb: "FRENIC variable frequency drives for HVAC." },
  { id: "gree", logo: "assets/logos/GREE-logo-v4.png", name: "GREE", family: "Independent", blurb: "GMV VRF systems and ductless mini-split heat pumps." },
  { id: "kampmann", logo: "assets/logos/Kampmann.png", name: "Kampmann", family: "Independent", blurb: "Trench heating and cooling, air curtains and unit heaters." },
  { id: "klingenburg", logo: "assets/logos/klingenburg.png", name: "Klingenburg", family: "Independent", blurb: "Rotary and plate heat exchangers for energy recovery." },
  { id: "novelaire", logo: "assets/logos/NovelAire-logo-2.jpg", name: "NovelAire", family: "Independent", blurb: "Desiccant dehumidification and energy recovery wheels." },
  { id: "nuclimate", name: "NuClimate", family: "Independent", blurb: "Chilled beams and induction units." },
  { id: "rapid", logo: "assets/logos/Rapid-Engineering.png", name: "Rapid Engineering", family: "Independent", blurb: "Direct-fired make-up air and industrial space heating." },
  { id: "reddi", logo: "assets/logos/reddi.png", name: "Redd-i", family: "Independent", blurb: "Duct heaters, VAV systems and electric unit and wall heaters, built in the USA." },
  { id: "runtal", logo: "assets/logos/runtal.png", name: "Runtal", family: "Independent", blurb: "Hydronic, electric and steam panel radiators." },
  { id: "steamovap", logo: "assets/logos/SteamOVap-logo.jpg", name: "SteamOVap Technologies", family: "Independent", blurb: "Steam humidification systems." },
  { id: "sterling", logo: "assets/logos/sterling-hvac.png", name: "Sterling", family: "Independent", blurb: "Unit heaters and hydronic heating products." },
  { id: "uvr", logo: "assets/logos/UVR-logo-for-website.jpg", name: "UV Resources", family: "Independent", blurb: "UV-C fixtures for coil and air-stream disinfection." }
];

DMR.products = [
  { id: "temtrol-ahu", brand: "temtrol", category: "ahu", name: "Custom Air Handlers",
    summary: "Air handlers engineered unit by unit, for projects where a catalog cabinet will not fit the load or the room.",
    features: ["Built to project dimensions, including knock-down construction for existing buildings", "Indoor and outdoor casings with custom coil, filter and fan sections", "Pairs with FANWALL arrays for redundancy"] },
  { id: "ventrol-ahu", brand: "ventrol", category: "ahu", name: "Custom Air Handling Units",
    summary: "Custom air handling units for commercial and institutional buildings, with energy recovery built into the cabinet when the project calls for it.",
    features: ["Custom cabinet sizes and component arrangements", "Integrated energy recovery options", "Indoor and rooftop configurations"] },
  { id: "nortek-ahu", brand: "nortek", category: "ahu", name: "Engineered Air Handling Systems",
    summary: "Engineering support across the Nortek Air Solutions brands, so one team carries a project from selection through startup.",
    features: ["Single source for custom air handling across brands", "Application engineering for healthcare, labs and mission critical", "Factory testing options"] },
  { id: "governair-rtu", brand: "governair", category: "packaged", name: "Custom Packaged Rooftop Systems",
    summary: "Rooftop units built to order, with cooling, heating and controls assembled and tested at the factory.",
    features: ["Custom capacities and footprints for replacement on existing curbs", "Air-cooled, water-cooled and evaporative-condensed options", "Walk-in service vestibules available"] },
  { id: "governair-chiller", brand: "governair", category: "packaged", name: "Packaged Chiller Plants",
    summary: "A complete chilled water plant in one weatherproof enclosure: chillers, pumps and controls, piped and wired before it ships.",
    features: ["Frees up indoor mechanical space", "Factory piping, wiring and testing", "Shortens site installation"] },
  { id: "mammoth-rtu", brand: "mammoth", category: "packaged", name: "Custom Packaged HVAC",
    summary: "Packaged rooftop and vertical self-contained units configured for the project's capacity and layout.",
    features: ["Rooftop and indoor self-contained configurations", "Water-cooled and air-cooled options", "Suited to schools and floor-by-floor office systems"] },
  { id: "huntair-fanwall", brand: "huntair", category: "fans", name: "FANWALL Technology",
    summary: "An array of smaller direct-drive fans in place of one large fan. If a fan fails, the others keep the air moving.",
    features: ["Built-in redundancy from multiple fans", "Shorter air handler length than a single large fan", "Retrofit kits that pass through a standard doorway", "Lower low-frequency noise"] },
  { id: "huntair-cleansuite", brand: "huntair", category: "critical", name: "CLEANSUITE Operating Room Systems",
    summary: "A ceiling system for hospital operating rooms that combines air delivery, lighting and equipment supports in one prefabricated assembly.",
    features: ["Single large diffuser over the surgical table", "Prefabricated modules shorten ceiling installation", "Integrated lighting and boom mounting"] },
  { id: "huntair-cleanroom", brand: "huntair", category: "critical", name: "Cleanroom Air Systems",
    summary: "Recirculation and make-up air systems for cleanrooms in pharmaceutical, semiconductor and research facilities.",
    features: ["Fan filter units and recirculation air handlers", "Make-up air units with tight temperature and humidity control", "Designed for continuous operation"] },
  { id: "nortek-dc", brand: "nortek", category: "critical", name: "Data Center Cooling",
    summary: "Cooling for data halls, from computer room air handlers to liquid cooling systems for high-density racks.",
    features: ["Computer room air handlers (CRAH) and fan wall units", "StatePoint liquid cooling technology", "ServerCool liquid cooling products for high-density racks"] },
  { id: "venmar-erv", brand: "venmar", category: "recovery", name: "Energy Recovery Ventilators",
    summary: "Ventilators that transfer heat and moisture from exhaust air to incoming outdoor air, reducing the load on the main system.",
    features: ["Wheel and plate heat exchanger options", "Indoor and outdoor units", "Reduces heating and cooling plant size"] },
  { id: "venmar-doas", brand: "venmar", category: "recovery", name: "Dedicated Outdoor Air Systems",
    summary: "Units that condition 100% outdoor air and deliver it dry and neutral, so zone equipment handles only the sensible load.",
    features: ["Energy recovery with integral cooling and heating", "Dehumidifies ventilation air before it reaches the space", "Pairs with chilled beams, VRF and water-source heat pumps"] },
  { id: "klingenburg-wheel", brand: "klingenburg", category: "recovery", name: "Rotary Heat Exchangers",
    summary: "Energy recovery wheels supplied as components for air handling units.",
    features: ["Sensible and enthalpy wheels", "Wide range of diameters", "Supplied to air handler manufacturers and for replacement"] },
  { id: "klingenburg-plate", brand: "klingenburg", category: "recovery", name: "Plate Heat Exchangers",
    summary: "Fixed-plate exchangers that recover energy with supply and exhaust air streams kept separate.",
    features: ["No moving parts", "Separated air streams for exhaust that must not recirculate", "Cross-flow and counter-flow designs"] },
  { id: "novelaire-wheel", brand: "novelaire", category: "recovery", name: "Energy Recovery Wheels & Cassettes",
    summary: "Desiccant-coated energy recovery wheels and cassettes for new equipment and wheel replacement.",
    features: ["Total energy (heat and moisture) recovery", "Cassettes for OEM and field replacement", "Range of sizes"] },
  { id: "mammoth-wshp", brand: "mammoth", category: "heatpump", name: "Water-Source Heat Pumps",
    summary: "Zone heat pumps on a shared water loop. Each zone heats or cools independently and the loop moves heat between them.",
    features: ["Vertical, horizontal and console cabinets", "Works with boiler/tower and geothermal loops", "Individual zone control"] },
  { id: "gree-vrf", brand: "gree", category: "heatpump", name: "GMV Variable Refrigerant Flow",
    summary: "VRF heat pump and heat recovery systems that serve many indoor units from one outdoor unit.",
    features: ["Heat pump and heat recovery systems", "GMV5 Mini for smaller buildings", "Ducted, cassette and wall-mounted indoor units"] },
  { id: "gree-mini", brand: "gree", category: "heatpump", name: "Mini-Split Heat Pumps",
    summary: "Single-zone and multi-zone ductless heat pumps for rooms a central system does not reach.",
    features: ["Single-zone and multi-zone systems", "Suited to server closets, additions and renovations", "Inverter-driven compressors"] },
  { id: "envirotec-fancoil", brand: "envirotec", category: "terminal", name: "Fan Coil & Blower Coil Units",
    summary: "Room-level heating and cooling units in horizontal, vertical and high-rise stack configurations.",
    features: ["Horizontal, vertical and vertical-stack models", "Two-pipe and four-pipe coils", "Blower coils for higher static applications"] },
  { id: "envirotec-vav", brand: "envirotec", category: "terminal", name: "VAV Terminal Units",
    summary: "Single-duct and fan-powered terminals that vary airflow to each zone.",
    features: ["Single-duct, series and parallel fan-powered boxes", "Hot water and electric reheat", "Factory-mounted controls options"] },
  { id: "nuclimate-beam", brand: "nuclimate", category: "terminal", name: "Chilled Beams & Induction Units",
    summary: "Ceiling units that use ventilation air to induce room air across a water coil. No fan in the space, so they run quietly.",
    features: ["Active chilled beams and induction units", "No moving parts at the zone", "Reduces ductwork size and ceiling depth"] },
  { id: "kampmann-trench", brand: "kampmann", category: "terminal", name: "Trench Heating & Cooling",
    summary: "Floor-recessed convectors that heat and cool along full-height glass without interrupting the view.",
    features: ["Natural convection and fan-assisted models", "Heating-only and heating/cooling versions", "Grilles in multiple finishes"] },
  { id: "kampmann-curtain", brand: "kampmann", category: "terminal", name: "Air Curtains",
    summary: "Air curtains that separate indoor and outdoor air at entrances and dock doors.",
    features: ["Exposed and recessed models", "Hot water and electric heat", "Sizes for pedestrian entrances and industrial doors"] },
  { id: "runtal-radiator", brand: "runtal", category: "hydronic", name: "Panel Radiators",
    summary: "Flat-tube steel radiators in wall panel, baseboard and vertical styles, with hydronic, electric and steam versions.",
    features: ["Wall panels, baseboards and vertical columns", "Hydronic, electric and steam", "Wide range of sizes and colors", "Easy-to-clean flat surfaces"] },
  { id: "sterling-hydronic", brand: "sterling", category: "hydronic", name: "Finned Tube & Convectors",
    summary: "Perimeter hydronic heating: commercial finned tube, convectors and cabinet unit heaters.",
    features: ["Commercial finned tube radiation", "Convectors and cabinet unit heaters", "Hot water and steam"] },
  { id: "cooney-coil", brand: "cooney", category: "hydronic", name: "Freeze-Resistant Coils",
    summary: "Heating and cooling coils designed to relieve the pressure that bursts tubes when a coil freezes.",
    features: ["Freeze Block technology for hydronic coils", "Steam and hot water preheat coils for outdoor air", "Custom sizes for replacement in existing air handlers"] },
  { id: "rapid-mua", brand: "rapid", category: "industrial", name: "Direct-Fired Make-Up Air",
    summary: "Gas-fired units that heat outdoor air to replace what exhaust systems remove.",
    features: ["Direct gas-fired heating", "Rooftop and indoor arrangements", "Building pressurization control"] },
  { id: "rapid-turnover", brand: "rapid", category: "industrial", name: "Air Turnover Systems",
    summary: "Floor-mounted units that circulate large air volumes to keep temperature even from floor to ceiling in high-bay buildings.",
    features: ["Reduces temperature stratification", "Little or no ductwork", "Suited to warehouses and distribution centers"] },
  { id: "sterling-unit", brand: "sterling", category: "industrial", name: "Unit Heaters",
    summary: "Gas-fired and hydronic unit heaters for warehouses, garages, shops and mechanical spaces.",
    features: ["Gas-fired, hot water and steam models", "Horizontal and vertical discharge", "Wide capacity range"] },
  { id: "reddi-line", brand: "reddi", category: "industrial", name: "Electric Duct & Unit Heaters",
    summary: "Electric duct heaters, hazardous-location unit heaters and wall heaters, plus VAV systems.",
    features: ["Electric duct heaters for air handlers and terminal units", "Unit heaters rated for hazardous locations", "Residential and commercial wall heaters"] },
  { id: "steamovap-humid", brand: "steamovap", category: "humidity", name: "Steam Humidifiers",
    summary: "Steam humidification for air handlers and ducts, with gas, electric and steam-to-steam generators.",
    features: ["Electric, gas-fired and steam-to-steam generators", "Short-absorption dispersion panels", "Clean steam for healthcare and labs"] },
  { id: "fisair-humid", brand: "fisair", category: "humidity", name: "Humidifiers",
    summary: "Isothermal (steam) and adiabatic (evaporative) humidifiers for comfort and process applications.",
    features: ["Steam and evaporative technologies", "Duct, air handler and direct-room dispersion", "Adiabatic options with low energy use"] },
  { id: "fisair-dehum", brand: "fisair", category: "humidity", name: "Desiccant Dehumidifiers",
    summary: "Desiccant rotor dehumidifiers for spaces that need low humidity, including storage and process rooms.",
    features: ["Holds low dew points that cooling coils cannot reach", "Standalone and air-handler-integrated units", "Electric, steam and gas reactivation"] },
  { id: "novelaire-desiccant", brand: "novelaire", category: "humidity", name: "Desiccant Dehumidification Systems",
    summary: "Packaged desiccant systems for humidity control independent of temperature.",
    features: ["Desiccant wheel systems with pre- and post-cooling", "Dry rooms, ice rinks, pools and archives", "Custom units for process loads"] },
  { id: "uvr-coil", brand: "uvr", category: "iaq", name: "UV-C Coil Disinfection",
    summary: "UV-C fixtures that keep cooling coils and drain pans free of biological growth, which holds airflow and heat transfer at design levels.",
    features: ["Fixtures for new and existing air handlers", "Reduces coil cleaning", "Maintains coil pressure drop and capacity"] },
  { id: "uvr-air", brand: "uvr", category: "iaq", name: "Air-Stream & Upper-Room UV-C",
    summary: "UV-C for disinfecting moving air in ducts and occupied rooms.",
    features: ["In-duct air-stream fixtures", "Upper-room fixtures for occupied spaces", "Sized to the airflow or room"] },
  { id: "fuji-vfd", brand: "fuji", category: "drives", name: "FRENIC-HVAC Drives",
    summary: "Variable frequency drives made for HVAC fans and pumps, including FRENIC-HPAQ packaged drives.",
    features: ["Packaged drives with disconnect and bypass options", "Built-in HVAC functions and BACnet", "Slim enclosures for mechanical rooms"] }
];
DMR.products.forEach(function (p) { if (!("photo" in p)) p.photo = null; });

/* Gallery slots — set `photo` to a path to replace a placeholder. */
DMR.gallery = [
  { id: "g1", caption: "Custom air handler, rooftop set", product: "temtrol-ahu", photo: null, size: "wide" },
  { id: "g2", caption: "FANWALL retrofit", product: "huntair-fanwall", photo: null },
  { id: "g3", caption: "Operating room ceiling", product: "huntair-cleansuite", photo: null },
  { id: "g4", caption: "Packaged chiller plant delivery", product: "governair-chiller", photo: null },
  { id: "g5", caption: "Data hall cooling", product: "nortek-dc", photo: null, size: "wide" },
  { id: "g6", caption: "Chilled beams in a classroom", product: "nuclimate-beam", photo: null },
  { id: "g7", caption: "Lobby trench heating", product: "kampmann-trench", photo: null },
  { id: "g8", caption: "Make-up air unit, warehouse", product: "rapid-mua", photo: null }
];

/*
 * Map configuration.
 * googleMapsApiKey: a Google Maps JavaScript API key. Restrict it to this
 * site's domain in the Google Cloud console. With no key the map still loads,
 * but Google overlays a "for development purposes only" watermark.
 */
DMR.mapConfig = {
  googleMapsApiKey: "",
  center: { lat: 38.75, lng: -77.1 },
  zoom: 8
};
