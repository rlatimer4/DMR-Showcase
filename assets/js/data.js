/*
 * DMR Showcase — content model.
 *
 * Everything the site renders comes from this file, so content can be updated
 * without touching layout code.
 *
 * PROTOTYPE NOTES
 *  - Product copy is draft text written from public manufacturer positioning and
 *    must be reviewed by DMR before launch. Entries with `verify: true` are the
 *    ones we were least sure about.
 *  - `photo: null` renders a placeholder tile. Set it to an image path
 *    (e.g. "assets/photos/temtrol-ahu.jpg") to show a real photo.
 *  - `installs` and `gallery` are SAMPLE records, not real DMR projects.
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

DMR.markets = [
  { id: "healthcare", name: "Healthcare" },
  { id: "labs", name: "Labs & Cleanrooms" },
  { id: "datacenter", name: "Data Centers" },
  { id: "education", name: "Education" },
  { id: "office", name: "Commercial Office" },
  { id: "industrial", name: "Industrial" },
  { id: "government", name: "Government" },
  { id: "residential", name: "Multifamily & Hospitality" }
];

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
  { id: "nortek", name: "Nortek Air Solutions", family: "Nortek Air Solutions", blurb: "Parent of the Governair, Huntair, Mammoth, Temtrol, Venmar CES and Ventrol brands, with custom air handling and data center cooling." },
  { id: "governair", name: "Governair", family: "Nortek Air Solutions", blurb: "Custom packaged rooftop systems and packaged chiller plants." },
  { id: "huntair", name: "Huntair", family: "Nortek Air Solutions", blurb: "FANWALL fan arrays, cleanroom systems and operating room air delivery." },
  { id: "mammoth", name: "Mammoth", family: "Nortek Air Solutions", blurb: "Water-source heat pumps and custom packaged HVAC." },
  { id: "temtrol", name: "Temtrol", family: "Nortek Air Solutions", blurb: "Custom air handlers for institutional and healthcare projects." },
  { id: "venmar", name: "Venmar CES", family: "Nortek Air Solutions", blurb: "Energy recovery ventilators and dedicated outdoor air systems." },
  { id: "ventrol", name: "Ventrol", family: "Nortek Air Solutions", blurb: "Custom air handling units for commercial and institutional buildings." },
  { id: "cooney", name: "Cooney Technologies", family: "Independent", blurb: "Freeze-resistant heating and cooling coils." },
  { id: "envirotec", name: "Enviro-Tec", family: "Independent", blurb: "Fan coils, blower coils and VAV terminal units." },
  { id: "fisair", name: "Fisair", family: "Independent", blurb: "Humidifiers and desiccant dehumidifiers." },
  { id: "fuji", name: "Fuji Electric", family: "Independent", blurb: "FRENIC variable frequency drives for HVAC." },
  { id: "gree", name: "GREE", family: "Independent", blurb: "GMV VRF systems and ductless mini-split heat pumps." },
  { id: "kampmann", name: "Kampmann", family: "Independent", blurb: "Trench heating and cooling, air curtains and unit heaters." },
  { id: "klingenburg", name: "Klingenburg", family: "Independent", blurb: "Rotary and plate heat exchangers for energy recovery." },
  { id: "novelaire", name: "NovelAire", family: "Independent", blurb: "Desiccant dehumidification and energy recovery wheels." },
  { id: "nuclimate", name: "NuClimate", family: "Independent", blurb: "Chilled beams and induction units." },
  { id: "rapid", name: "Rapid Engineering", family: "Independent", blurb: "Direct-fired make-up air and industrial space heating." },
  { id: "reddi", name: "Redd-i", family: "Independent", blurb: "Listed on the DMR line card. Product description pending DMR review.", verify: true },
  { id: "runtal", name: "Runtal", family: "Independent", blurb: "Hydronic, electric and steam panel radiators." },
  { id: "steamovap", name: "SteamOVap Technologies", family: "Independent", blurb: "Steam humidification systems." },
  { id: "sterling", name: "Sterling", family: "Independent", blurb: "Unit heaters and hydronic heating products." },
  { id: "uvr", name: "UV Resources", family: "Independent", blurb: "UV-C fixtures for coil and air-stream disinfection." }
];

DMR.products = [
  { id: "temtrol-ahu", brand: "temtrol", category: "ahu", name: "Custom Air Handlers",
    markets: ["healthcare", "education", "government", "labs"],
    summary: "Air handlers engineered unit by unit, for projects where a catalog cabinet will not fit the load or the room.",
    features: ["Built to project dimensions, including knock-down construction for existing buildings", "Indoor and outdoor casings with custom coil, filter and fan sections", "Pairs with FANWALL arrays for redundancy"] },
  { id: "ventrol-ahu", brand: "ventrol", category: "ahu", name: "Custom Air Handling Units",
    markets: ["office", "education", "government", "healthcare"],
    summary: "Custom air handling units for commercial and institutional buildings, with energy recovery built into the cabinet when the project calls for it.",
    features: ["Custom cabinet sizes and component arrangements", "Integrated energy recovery options", "Indoor and rooftop configurations"] },
  { id: "nortek-ahu", brand: "nortek", category: "ahu", name: "Engineered Air Handling Systems",
    markets: ["healthcare", "labs", "datacenter", "government"],
    summary: "Engineering support across the Nortek Air Solutions brands, so one team carries a project from selection through startup.",
    features: ["Single source for custom air handling across brands", "Application engineering for healthcare, labs and mission critical", "Factory testing options"] },
  { id: "governair-rtu", brand: "governair", category: "packaged", name: "Custom Packaged Rooftop Systems",
    markets: ["office", "education", "government", "healthcare"],
    summary: "Rooftop units built to order, with cooling, heating and controls assembled and tested at the factory.",
    features: ["Custom capacities and footprints for replacement on existing curbs", "Air-cooled, water-cooled and evaporative-condensed options", "Walk-in service vestibules available"] },
  { id: "governair-chiller", brand: "governair", category: "packaged", name: "Packaged Chiller Plants",
    markets: ["datacenter", "healthcare", "office", "industrial"],
    summary: "A complete chilled water plant in one weatherproof enclosure: chillers, pumps and controls, piped and wired before it ships.",
    features: ["Frees up indoor mechanical space", "Factory piping, wiring and testing", "Shortens site installation"] },
  { id: "mammoth-rtu", brand: "mammoth", category: "packaged", name: "Custom Packaged HVAC",
    markets: ["education", "office", "government", "residential"],
    summary: "Packaged rooftop and vertical self-contained units configured for the project's capacity and layout.",
    features: ["Rooftop and indoor self-contained configurations", "Water-cooled and air-cooled options", "Suited to schools and floor-by-floor office systems"] },
  { id: "huntair-fanwall", brand: "huntair", category: "fans", name: "FANWALL Technology",
    markets: ["healthcare", "datacenter", "labs", "office", "education"],
    summary: "An array of smaller direct-drive fans in place of one large fan. If a fan fails, the others keep the air moving.",
    features: ["Built-in redundancy from multiple fans", "Shorter air handler length than a single large fan", "Retrofit kits that pass through a standard doorway", "Lower low-frequency noise"] },
  { id: "huntair-cleansuite", brand: "huntair", category: "critical", name: "CLEANSUITE Operating Room Systems",
    markets: ["healthcare"],
    summary: "A ceiling system for hospital operating rooms that combines air delivery, lighting and equipment supports in one prefabricated assembly.",
    features: ["Single large diffuser over the surgical table", "Prefabricated modules shorten ceiling installation", "Integrated lighting and boom mounting"] },
  { id: "huntair-cleanroom", brand: "huntair", category: "critical", name: "Cleanroom Air Systems",
    markets: ["labs", "industrial"],
    summary: "Recirculation and make-up air systems for cleanrooms in pharmaceutical, semiconductor and research facilities.",
    features: ["Fan filter units and recirculation air handlers", "Make-up air units with tight temperature and humidity control", "Designed for continuous operation"] },
  { id: "nortek-dc", brand: "nortek", category: "critical", name: "Data Center Cooling",
    markets: ["datacenter"],
    summary: "Cooling for data halls, from computer room air handlers to liquid cooling systems for high-density racks.",
    features: ["Computer room air handlers (CRAH) and fan wall units", "StatePoint liquid cooling technology", "ServerCool liquid cooling products for high-density racks"] },
  { id: "venmar-erv", brand: "venmar", category: "recovery", name: "Energy Recovery Ventilators",
    markets: ["education", "office", "labs", "residential", "government"],
    summary: "Ventilators that transfer heat and moisture from exhaust air to incoming outdoor air, reducing the load on the main system.",
    features: ["Wheel and plate heat exchanger options", "Indoor and outdoor units", "Reduces heating and cooling plant size"] },
  { id: "venmar-doas", brand: "venmar", category: "recovery", name: "Dedicated Outdoor Air Systems",
    markets: ["education", "office", "healthcare", "residential"],
    summary: "Units that condition 100% outdoor air and deliver it dry and neutral, so zone equipment handles only the sensible load.",
    features: ["Energy recovery with integral cooling and heating", "Dehumidifies ventilation air before it reaches the space", "Pairs with chilled beams, VRF and water-source heat pumps"] },
  { id: "klingenburg-wheel", brand: "klingenburg", category: "recovery", name: "Rotary Heat Exchangers",
    markets: ["office", "education", "industrial", "labs"],
    summary: "Energy recovery wheels supplied as components for air handling units.",
    features: ["Sensible and enthalpy wheels", "Wide range of diameters", "Supplied to air handler manufacturers and for replacement"] },
  { id: "klingenburg-plate", brand: "klingenburg", category: "recovery", name: "Plate Heat Exchangers",
    markets: ["labs", "healthcare", "industrial"],
    summary: "Fixed-plate exchangers that recover energy with supply and exhaust air streams kept separate.",
    features: ["No moving parts", "Separated air streams for exhaust that must not recirculate", "Cross-flow and counter-flow designs"] },
  { id: "novelaire-wheel", brand: "novelaire", category: "recovery", name: "Energy Recovery Wheels & Cassettes",
    markets: ["office", "education", "residential"],
    summary: "Desiccant-coated energy recovery wheels and cassettes for new equipment and wheel replacement.",
    features: ["Total energy (heat and moisture) recovery", "Cassettes for OEM and field replacement", "Range of sizes"] },
  { id: "mammoth-wshp", brand: "mammoth", category: "heatpump", name: "Water-Source Heat Pumps",
    markets: ["education", "office", "residential", "government"],
    summary: "Zone heat pumps on a shared water loop. Each zone heats or cools independently and the loop moves heat between them.",
    features: ["Vertical, horizontal and console cabinets", "Works with boiler/tower and geothermal loops", "Individual zone control"] },
  { id: "gree-vrf", brand: "gree", category: "heatpump", name: "GMV Variable Refrigerant Flow",
    markets: ["office", "education", "residential", "government"],
    summary: "VRF heat pump and heat recovery systems that serve many indoor units from one outdoor unit.",
    features: ["Heat pump and heat recovery systems", "GMV5 Mini for smaller buildings", "Ducted, cassette and wall-mounted indoor units"] },
  { id: "gree-mini", brand: "gree", category: "heatpump", name: "Mini-Split Heat Pumps",
    markets: ["residential", "office", "education"],
    summary: "Single-zone and multi-zone ductless heat pumps for rooms a central system does not reach.",
    features: ["Single-zone and multi-zone systems", "Suited to server closets, additions and renovations", "Inverter-driven compressors"] },
  { id: "envirotec-fancoil", brand: "envirotec", category: "terminal", name: "Fan Coil & Blower Coil Units",
    markets: ["healthcare", "residential", "office", "education"],
    summary: "Room-level heating and cooling units in horizontal, vertical and high-rise stack configurations.",
    features: ["Horizontal, vertical and vertical-stack models", "Two-pipe and four-pipe coils", "Blower coils for higher static applications"] },
  { id: "envirotec-vav", brand: "envirotec", category: "terminal", name: "VAV Terminal Units",
    markets: ["office", "healthcare", "education", "government"],
    summary: "Single-duct and fan-powered terminals that vary airflow to each zone.",
    features: ["Single-duct, series and parallel fan-powered boxes", "Hot water and electric reheat", "Factory-mounted controls options"] },
  { id: "nuclimate-beam", brand: "nuclimate", category: "terminal", name: "Chilled Beams & Induction Units",
    markets: ["education", "office", "labs", "healthcare"],
    summary: "Ceiling units that use ventilation air to induce room air across a water coil. No fan in the space, so they run quietly.",
    features: ["Active chilled beams and induction units", "No moving parts at the zone", "Reduces ductwork size and ceiling depth"] },
  { id: "kampmann-trench", brand: "kampmann", category: "terminal", name: "Trench Heating & Cooling",
    markets: ["office", "education", "residential"],
    summary: "Floor-recessed convectors that heat and cool along full-height glass without interrupting the view.",
    features: ["Natural convection and fan-assisted models", "Heating-only and heating/cooling versions", "Grilles in multiple finishes"] },
  { id: "kampmann-curtain", brand: "kampmann", category: "terminal", name: "Air Curtains",
    markets: ["office", "education", "industrial", "residential"],
    summary: "Air curtains that separate indoor and outdoor air at entrances and dock doors.",
    features: ["Exposed and recessed models", "Hot water and electric heat", "Sizes for pedestrian entrances and industrial doors"] },
  { id: "runtal-radiator", brand: "runtal", category: "hydronic", name: "Panel Radiators",
    markets: ["healthcare", "education", "residential", "office"],
    summary: "Flat-tube steel radiators in wall panel, baseboard and vertical styles, with hydronic, electric and steam versions.",
    features: ["Wall panels, baseboards and vertical columns", "Hydronic, electric and steam", "Wide range of sizes and colors", "Easy-to-clean flat surfaces"] },
  { id: "sterling-hydronic", brand: "sterling", category: "hydronic", name: "Finned Tube & Convectors",
    markets: ["education", "government", "office", "residential"],
    summary: "Perimeter hydronic heating: commercial finned tube, convectors and cabinet unit heaters.",
    features: ["Commercial finned tube radiation", "Convectors and cabinet unit heaters", "Hot water and steam"] },
  { id: "cooney-coil", brand: "cooney", category: "hydronic", name: "Freeze-Resistant Coils",
    markets: ["healthcare", "education", "government", "labs"],
    summary: "Heating and cooling coils designed to relieve the pressure that bursts tubes when a coil freezes.",
    features: ["Freeze Block technology for hydronic coils", "Steam and hot water preheat coils for outdoor air", "Custom sizes for replacement in existing air handlers"] },
  { id: "rapid-mua", brand: "rapid", category: "industrial", name: "Direct-Fired Make-Up Air",
    markets: ["industrial"],
    summary: "Gas-fired units that heat outdoor air to replace what exhaust systems remove.",
    features: ["Direct gas-fired heating", "Rooftop and indoor arrangements", "Building pressurization control"] },
  { id: "rapid-turnover", brand: "rapid", category: "industrial", name: "Air Turnover Systems",
    markets: ["industrial"],
    summary: "Floor-mounted units that circulate large air volumes to keep temperature even from floor to ceiling in high-bay buildings.",
    features: ["Reduces temperature stratification", "Little or no ductwork", "Suited to warehouses and distribution centers"] },
  { id: "sterling-unit", brand: "sterling", category: "industrial", name: "Unit Heaters",
    markets: ["industrial", "government", "education"],
    summary: "Gas-fired and hydronic unit heaters for warehouses, garages, shops and mechanical spaces.",
    features: ["Gas-fired, hot water and steam models", "Horizontal and vertical discharge", "Wide capacity range"] },
  { id: "reddi-line", brand: "reddi", category: "industrial", name: "Redd-i Product Line", verify: true,
    markets: ["industrial"],
    summary: "Listed on the DMR line card. Product details will be added after DMR review.",
    features: ["Details pending"] },
  { id: "steamovap-humid", brand: "steamovap", category: "humidity", name: "Steam Humidifiers",
    markets: ["healthcare", "labs", "datacenter", "government"],
    summary: "Steam humidification for air handlers and ducts, with gas, electric and steam-to-steam generators.",
    features: ["Electric, gas-fired and steam-to-steam generators", "Short-absorption dispersion panels", "Clean steam for healthcare and labs"] },
  { id: "fisair-humid", brand: "fisair", category: "humidity", name: "Humidifiers",
    markets: ["healthcare", "labs", "industrial", "datacenter"],
    summary: "Isothermal (steam) and adiabatic (evaporative) humidifiers for comfort and process applications.",
    features: ["Steam and evaporative technologies", "Duct, air handler and direct-room dispersion", "Adiabatic options with low energy use"] },
  { id: "fisair-dehum", brand: "fisair", category: "humidity", name: "Desiccant Dehumidifiers",
    markets: ["industrial", "labs"],
    summary: "Desiccant rotor dehumidifiers for spaces that need low humidity, including storage and process rooms.",
    features: ["Holds low dew points that cooling coils cannot reach", "Standalone and air-handler-integrated units", "Electric, steam and gas reactivation"] },
  { id: "novelaire-desiccant", brand: "novelaire", category: "humidity", name: "Desiccant Dehumidification Systems",
    markets: ["labs", "industrial", "healthcare", "education"],
    summary: "Packaged desiccant systems for humidity control independent of temperature.",
    features: ["Desiccant wheel systems with pre- and post-cooling", "Dry rooms, ice rinks, pools and archives", "Custom units for process loads"] },
  { id: "uvr-coil", brand: "uvr", category: "iaq", name: "UV-C Coil Disinfection",
    markets: ["healthcare", "education", "office", "government", "labs"],
    summary: "UV-C fixtures that keep cooling coils and drain pans free of biological growth, which holds airflow and heat transfer at design levels.",
    features: ["Fixtures for new and existing air handlers", "Reduces coil cleaning", "Maintains coil pressure drop and capacity"] },
  { id: "uvr-air", brand: "uvr", category: "iaq", name: "Air-Stream & Upper-Room UV-C",
    markets: ["healthcare", "education", "government"],
    summary: "UV-C for disinfecting moving air in ducts and occupied rooms.",
    features: ["In-duct air-stream fixtures", "Upper-room fixtures for occupied spaces", "Sized to the airflow or room"] },
  { id: "fuji-vfd", brand: "fuji", category: "drives", name: "FRENIC-HVAC Drives",
    markets: ["office", "healthcare", "education", "industrial", "datacenter"],
    summary: "Variable frequency drives made for HVAC fans and pumps, including FRENIC-HPAQ packaged drives.",
    features: ["Packaged drives with disconnect and bypass options", "Built-in HVAC functions and BACnet", "Slim enclosures for mechanical rooms"] }
];
DMR.products.forEach(function (p) { if (!("photo" in p)) p.photo = null; });

/*
 * Walkthrough scene. Coordinates are in SVG units; see tour.js for how
 * floors/columns turn into geometry. `at.floor` is "roof" or a 0-based floor
 * index; `at.x` is a 0..1 fraction of the building width.
 */
DMR.tour = {
  buildings: [
    { id: "healthcare", name: "Hospital", x: 40, w: 270, floors: 4, fh: 88, cols: 3,
      intro: "Hospitals run around the clock and cannot lose airflow. The equipment here is chosen for redundancy and infection control.",
      stops: [
        { id: "hc-roof", at: { floor: "roof", x: 0.38 }, title: "Rooftop air handling", room: "",
          text: "Custom air handlers with fan arrays keep air moving through a fan failure. UV-C fixtures keep the cooling coils clean.",
          products: ["temtrol-ahu", "huntair-fanwall", "uvr-coil"] },
        { id: "hc-or", at: { floor: 2, x: 0.17 }, title: "Operating suite", room: "OR",
          text: "A single ceiling assembly delivers filtered air over the surgical table. Steam humidifiers hold the room within its required humidity range.",
          products: ["huntair-cleansuite", "steamovap-humid", "uvr-air"] },
        { id: "hc-patient", at: { floor: 1, x: 0.83 }, title: "Patient rooms", room: "Patient",
          text: "Quiet room-level units give each patient room its own temperature control. Flat panel radiators are easy to wipe down.",
          products: ["envirotec-fancoil", "runtal-radiator", "envirotec-vav"] },
        { id: "hc-mech", at: { floor: 0, x: 0.5 }, title: "Mechanical room", room: "Mech",
          text: "Freeze-resistant preheat coils protect outdoor air systems in winter. Variable frequency drives match fan and pump speed to the load.",
          products: ["cooney-coil", "fuji-vfd"] }
      ] },
    { id: "labs", name: "Lab & Cleanroom", x: 340, w: 210, floors: 2, fh: 122, cols: 2,
      intro: "Labs exhaust large volumes of conditioned air. The equipment here recovers that energy and holds tight temperature and humidity.",
      stops: [
        { id: "lab-roof", at: { floor: "roof", x: 0.4 }, title: "Energy recovery", room: "",
          text: "Plate exchangers recover energy from lab exhaust while keeping it separate from the supply air.",
          products: ["klingenburg-plate", "venmar-erv", "ventrol-ahu"] },
        { id: "lab-clean", at: { floor: 1, x: 0.25 }, title: "Cleanroom", room: "ISO 7",
          text: "Recirculation units and fan filter units keep particle counts within class. Fan arrays provide redundancy.",
          products: ["huntair-cleanroom", "huntair-fanwall"] },
        { id: "lab-dry", at: { floor: 0, x: 0.75 }, title: "Dry room", room: "Dry room",
          text: "Desiccant systems hold humidity lower than a cooling coil can reach.",
          products: ["novelaire-desiccant", "fisair-dehum", "fisair-humid"] }
      ] },
    { id: "datacenter", name: "Data Center", x: 580, w: 260, floors: 1, fh: 172, cols: 1,
      intro: "Data halls reject heat every hour of the year. The equipment here is chosen for efficiency and uptime.",
      stops: [
        { id: "dc-roof", at: { floor: "roof", x: 0.3 }, title: "Chilled water plant", room: "",
          text: "A packaged chiller plant arrives piped, wired and tested, which shortens the construction schedule.",
          products: ["governair-chiller", "fuji-vfd"] },
        { id: "dc-hall", at: { floor: 0, x: 0.55 }, title: "Data hall", room: "Data hall",
          text: "Computer room air handlers and liquid cooling remove heat from the racks. Fan arrays keep air moving during maintenance.",
          products: ["nortek-dc", "huntair-fanwall", "steamovap-humid"] }
      ] },
    { id: "education", name: "School", x: 870, w: 220, floors: 2, fh: 98, cols: 3,
      intro: "Schools need fresh air and quiet classrooms on a public budget. The equipment here separates ventilation from room comfort.",
      stops: [
        { id: "ed-roof", at: { floor: "roof", x: 0.5 }, title: "Dedicated outdoor air", room: "",
          text: "A dedicated outdoor air system dries and tempers ventilation air and recovers energy from the exhaust.",
          products: ["venmar-doas", "mammoth-rtu", "novelaire-wheel"] },
        { id: "ed-class", at: { floor: 1, x: 0.5 }, title: "Classrooms", room: "Classroom",
          text: "Chilled beams have no fan in the room, so they run quietly. Water-source heat pumps and VRF give each classroom its own control.",
          products: ["nuclimate-beam", "mammoth-wshp", "gree-vrf"] },
        { id: "ed-entry", at: { floor: 0, x: 0.17 }, title: "Entrance & gym", room: "Entry",
          text: "Air curtains keep outdoor air out at busy doors. Finned tube and unit heaters cover the perimeter and the gym.",
          products: ["kampmann-curtain", "sterling-hydronic", "sterling-unit"] }
      ] },
    { id: "office", name: "Office Tower", x: 1120, w: 170, floors: 6, fh: 77, cols: 2,
      intro: "Office space is leased by the floor and refit often. The equipment here saves ceiling space and adapts to new tenants.",
      stops: [
        { id: "of-roof", at: { floor: "roof", x: 0.45 }, title: "Rooftop plant", room: "",
          text: "A custom rooftop unit matches the existing curb and structure, so replacement does not require roof rework.",
          products: ["governair-rtu", "klingenburg-wheel"] },
        { id: "of-open", at: { floor: 4, x: 0.25 }, title: "Open office", room: "Open office",
          text: "Chilled beams and VAV terminals condition the floor with small ducts and shallow ceilings.",
          products: ["nuclimate-beam", "envirotec-vav", "uvr-coil"] },
        { id: "of-tenant", at: { floor: 2, x: 0.75 }, title: "Tenant fit-out", room: "Tenant",
          text: "VRF and mini-splits add cooling for a tenant's server closet or conference room without changing the base building system.",
          products: ["gree-vrf", "gree-mini"] },
        { id: "of-lobby", at: { floor: 0, x: 0.3 }, title: "Lobby", room: "Lobby",
          text: "Trench units sit in the floor along the glass. Panel radiators and air curtains handle the entrance.",
          products: ["kampmann-trench", "runtal-radiator", "kampmann-curtain"] }
      ] },
    { id: "industrial", name: "Warehouse", x: 1320, w: 250, floors: 1, fh: 196, cols: 1,
      intro: "Large-volume buildings lose heat through dock doors and exhaust. The equipment here replaces that air and keeps temperature even.",
      stops: [
        { id: "in-roof", at: { floor: "roof", x: 0.3 }, title: "Make-up air", room: "",
          text: "Direct-fired units heat outdoor air to replace what exhaust fans remove and keep the building at positive pressure.",
          products: ["rapid-mua"] },
        { id: "in-floor", at: { floor: 0, x: 0.35 }, title: "Warehouse floor", room: "High bay",
          text: "Air turnover units keep temperature even from floor to roof. Unit heaters cover local areas.",
          products: ["rapid-turnover", "sterling-unit", "reddi-line"] },
        { id: "in-dock", at: { floor: 0, x: 0.85 }, title: "Loading dock", room: "",
          text: "Industrial air curtains hold conditioned air in while dock doors are open.",
          products: ["kampmann-curtain", "sterling-unit"] }
      ] }
  ]
};

/* SAMPLE installations — replace with real DMR project records. */
DMR.installs = [
  { id: "s01", name: "Sample hospital pavilion", city: "Bethesda, MD", lat: 38.9847, lng: -77.0947, market: "healthcare", year: 2024, products: ["temtrol-ahu", "huntair-fanwall", "huntair-cleansuite"] },
  { id: "s02", name: "Sample data center campus", city: "Ashburn, VA", lat: 39.0438, lng: -77.4874, market: "datacenter", year: 2025, products: ["nortek-dc", "governair-chiller"] },
  { id: "s03", name: "Sample research laboratory", city: "Rockville, MD", lat: 39.084, lng: -77.1528, market: "labs", year: 2023, products: ["huntair-cleanroom", "klingenburg-plate"] },
  { id: "s04", name: "Sample university science hall", city: "College Park, MD", lat: 38.9897, lng: -76.9378, market: "education", year: 2022, products: ["venmar-doas", "nuclimate-beam"] },
  { id: "s05", name: "Sample office tower", city: "Arlington, VA", lat: 38.8816, lng: -77.091, market: "office", year: 2024, products: ["governair-rtu", "envirotec-vav"] },
  { id: "s06", name: "Sample medical center", city: "Baltimore, MD", lat: 39.2904, lng: -76.6122, market: "healthcare", year: 2021, products: ["huntair-fanwall", "steamovap-humid", "uvr-coil"] },
  { id: "s07", name: "Sample colocation facility", city: "Manassas, VA", lat: 38.7509, lng: -77.4753, market: "datacenter", year: 2025, products: ["nortek-dc", "fuji-vfd"] },
  { id: "s08", name: "Sample biomanufacturing plant", city: "Frederick, MD", lat: 39.4143, lng: -77.4105, market: "labs", year: 2023, products: ["novelaire-desiccant", "huntair-cleanroom"] },
  { id: "s09", name: "Sample federal office building", city: "Washington, DC", lat: 38.8951, lng: -77.0364, market: "government", year: 2022, products: ["ventrol-ahu", "cooney-coil"] },
  { id: "s10", name: "Sample high school", city: "Richmond, VA", lat: 37.5407, lng: -77.436, market: "education", year: 2024, products: ["mammoth-wshp", "venmar-erv"] },
  { id: "s11", name: "Sample corporate headquarters", city: "Columbia, MD", lat: 39.2037, lng: -76.861, market: "office", year: 2023, products: ["nuclimate-beam", "kampmann-trench"] },
  { id: "s12", name: "Sample distribution center", city: "Hagerstown, MD", lat: 39.6418, lng: -77.72, market: "industrial", year: 2021, products: ["rapid-turnover", "sterling-unit"] },
  { id: "s13", name: "Sample state office complex", city: "Annapolis, MD", lat: 38.9784, lng: -76.4922, market: "government", year: 2020, products: ["temtrol-ahu", "runtal-radiator"] },
  { id: "s14", name: "Sample port warehouse", city: "Norfolk, VA", lat: 36.8508, lng: -76.2859, market: "industrial", year: 2022, products: ["rapid-mua", "kampmann-curtain"] },
  { id: "s15", name: "Sample apartment tower", city: "Tysons, VA", lat: 38.9187, lng: -77.2311, market: "residential", year: 2025, products: ["gree-vrf", "envirotec-fancoil"] },
  { id: "s16", name: "Sample hyperscale data hall", city: "Sterling, VA", lat: 39.0062, lng: -77.4286, market: "datacenter", year: 2024, products: ["governair-chiller", "huntair-fanwall"] }
];

/* Reference cities for the schematic map. */
DMR.cities = [
  { name: "Washington, DC", lat: 38.9072, lng: -77.0369 },
  { name: "Baltimore", lat: 39.2904, lng: -76.6122 },
  { name: "Richmond", lat: 37.5407, lng: -77.436 },
  { name: "Norfolk", lat: 36.8508, lng: -76.2859 },
  { name: "Charlottesville", lat: 38.0293, lng: -78.4767 },
  { name: "Fredericksburg", lat: 38.3032, lng: -77.4605 }
];

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

/* Map configuration. provider: "leaflet" (real map) or "schematic". */
DMR.mapConfig = {
  provider: "leaflet",
  tiles: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  bounds: { minLat: 36.55, maxLat: 39.85, minLng: -79.3, maxLng: -75.6 }
};
