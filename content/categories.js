/*
 * DMR Showcase — product types.
 *
 * The order here is the order of the filter buttons in the catalog. A type
 * with no products is hidden automatically. To add a type, add a line and use
 * its id as `category` in a manufacturer file. A product whose category is not
 * listed here is shown under "Other".
 */
DMR.categories = [
  { id: "ahu", name: "Air Handling & Rooftop Units", blurb: "Custom and modular air handlers, packaged DX rooftops, DOAS and vertical self-contained systems." },
  { id: "fanwall", name: "Fanwall Units", blurb: "Arrays of smaller fans that add redundancy and shorten air handlers." },
  { id: "datacenter", name: "Data Center Cooling", blurb: "Computer room air handlers and liquid cooling for data halls." },
  { id: "critical", name: "Operating Rooms & Cleanrooms", blurb: "Air delivery systems for surgical suites and classified cleanrooms." },
  { id: "recovery", name: "Energy Recovery", blurb: "Wheels, plates and outdoor air units that reclaim energy from exhaust air." },
  { id: "heatpump", name: "Air-Source Heat Pumps", blurb: "Standard and low-ambient air-source heat pumps." },
  { id: "vrf", name: "VRF, Ductless & PTAC", blurb: "Variable refrigerant flow systems, mini-splits, central heat pumps and packaged terminal units." },
  { id: "vav", name: "VAV Terminal Units", blurb: "Single-duct, fan-powered and sensible-cooling VAV boxes that control airflow at the zone." },
  { id: "fancoil", name: "Fan Coil Units", blurb: "Horizontal, floor-mounted, vertical hi-rise and ceiling cassette hydronic fan coils." },
  { id: "blowercoil", name: "Blower Coil Units", blurb: "High-static horizontal and vertical closet blower coils for ducted zone distribution." },
  { id: "coils", name: "Coils", blurb: "Heating and cooling coils for new and existing air handlers." },
  { id: "hydronic", name: "Hydronic Heating", blurb: "Radiators, finned tube and trench units for quiet perimeter heating." },
  { id: "electric", name: "Electric Heating", blurb: "Electric duct, unit and wall heaters." },
  { id: "heaters", name: "Unit Heaters & Ventilation", blurb: "Unit heaters, cabinet heaters and ventilation for large spaces and entrances." },
  { id: "makeup", name: "Make-Up Air", blurb: "Make-up air and air rotation units for large-volume buildings." },
  { id: "humid", name: "Humidification", blurb: "Steam and evaporative humidifiers." },
  { id: "dehum", name: "Dehumidifiers", blurb: "Desiccant dehumidifiers for low and tightly held humidity." },
  { id: "iaq", name: "Air Quality & UV", blurb: "Germicidal UV-C for clean coils and cleaner air." },
  { id: "evap", name: "Evaporative Cooling", blurb: "Evaporative coolers and adiabatic systems that cool with very little energy." },
  { id: "controls", name: "Controls & Accessories", blurb: "Controls, sensors and water treatment that support the main equipment." }
];
