/*
 * DMR Showcase — product types.
 *
 * The order here is the order of the filter buttons in the catalog. A type
 * with no products is hidden automatically, so it is safe to leave one here
 * after its last product line goes away. To add a type, add a line and use its
 * id as `category` in a product. A product whose category is not listed here
 * is shown under "Other".
 */
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
