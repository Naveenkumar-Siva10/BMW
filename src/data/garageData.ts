export interface GaragePhase {
  id: string;
  scrollRange: [number, number];
  label: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}

export interface GarageService {
  id: string;
  title: string;
  category: 'MAINTENANCE' | 'DIAGNOSTICS' | 'PERFORMANCE' | 'DETAILING';
  tag: string;
  shortDesc: string;
  deliverables: string[];
  estimatedDuration: string;
  warranty: string;
}

export interface GarageData {
  brand: string;
  subtitle: string;
  tagline: string;
  headline: string;
  established: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  phases: GaragePhase[];
  services: GarageService[];
}

export const garageData: GarageData = {
  brand: "NAVEEN GARAGE",
  subtitle: "PRECISION AUTOMOTIVE CARE",
  tagline: "PRECISION. PERFORMANCE. CARE.",
  headline: "YOUR CAR DESERVES BETTER.",
  established: "2018",
  location: "Automotive Precision Hub",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "service@naveengarage.com",
  address: "Plot 42, Motorway Industrial Corridor, Precision Automotive Zone",
  businessHours: {
    weekdays: "08:30 AM – 07:30 PM",
    saturday: "09:00 AM – 06:00 PM",
    sunday: "By Prior Appointment Only",
  },
  phases: [
    {
      id: "hero",
      scrollRange: [0, 0.25],
      label: "01 / HERITAGE & PRECISION",
      title: "NAVEEN GARAGE",
      subtitle: "PRECISION. PERFORMANCE. CARE.",
      description:
        "At Naveen Garage, we bring racing-grade automotive engineering, master technical craftsmanship, and computerized diagnostics to every passenger and performance car we service.",
      accent: "NAVEEN GARAGE WORKSHOP",
    },
    {
      id: "design",
      scrollRange: [0.25, 0.5],
      label: "02 / AERODYNAMICS & BODY",
      title: "STRUCTURAL INTEGRITY",
      subtitle: "PRECISION FIT & ALIGNMENT",
      description:
        "From laser chassis alignment to carbon component fitment and aerodynamic wind-channel optimization, our body technicians maintain factory-toleranced perfection.",
      accent: "LASER CHASSIS CALIBRATION",
    },
    {
      id: "cockpit",
      scrollRange: [0.5, 0.75],
      label: "03 / COCKPIT & DIAGNOSTICS",
      title: "DIAGNOSTIC TELEMETRY",
      subtitle: "DEEP ECU & COCKPIT SYSTEMS",
      description:
        "Full computer diagnostics for modern digital dashboards, wiring harnesses, climate systems, and driver-assistance sensors using manufacturer-grade interface software.",
      accent: "BOSCH / OEM DIAGNOSTICS",
    },
    {
      id: "engine",
      scrollRange: [0.75, 1.0],
      label: "04 / POWERTRAIN & TUNING",
      title: "ENGINE BLUEPRINTING",
      subtitle: "TWIN-TURBO & POWERTRAIN MASTERY",
      description:
        "Comprehensive overhaul, forced induction calibration, cooling loop maintenance, and fluid analysis performed under sterile workshop cleanliness standards.",
      accent: "DYNO-VERIFIED PERFORMANCE",
    },
  ],
  services: [
    {
      id: "general-service",
      title: "General Car Service",
      category: "MAINTENANCE",
      tag: "COMPREHENSIVE",
      shortDesc: "Complete bumper-to-bumper vehicle inspection, vital fluid top-ups, belt tension checks, and systemic safety audit.",
      deliverables: ["60-point mechanical check", "All vital fluid replenishments", "Spark plug & filter check", "Underbody chassis inspection"],
      estimatedDuration: "3 - 4 Hours",
      warranty: "6 Months / 10,000 KM Guarantee",
    },
    {
      id: "periodic-maintenance",
      title: "Periodic Maintenance",
      category: "MAINTENANCE",
      tag: "SCHEDULED",
      shortDesc: "Manufacturer-compliant interval service upholding factory warranty standards and prolonging powertrain longevity.",
      deliverables: ["Factory mileage schedule", "Diagnostic DTC scan", "Suspension bushing lubrication", "Brake wear measurement"],
      estimatedDuration: "2 - 3 Hours",
      warranty: "100% Genuine OEM Components",
    },
    {
      id: "ac-service",
      title: "AC Service & Climate Care",
      category: "MAINTENANCE",
      tag: "CLIMATE",
      shortDesc: "High-vacuum refrigerant recovery, compressor leak detection, pollen filtration replacement, and cabin anti-bacterial fogging.",
      deliverables: ["R134a / R1234yf vacuum recharge", "Compressor clutch inspection", "Evaporator & condenser flush", "Cabin HEPA filter replacement"],
      estimatedDuration: "2 Hours",
      warranty: "1 Year Cooling Guarantee",
    },
    {
      id: "engine-diagnostics",
      title: "Engine Diagnostics & ECU",
      category: "DIAGNOSTICS",
      tag: "ELECTRONIC",
      shortDesc: "Deep-level CAN-bus analysis, sensor live telemetry graphing, ignition misfire pinpointing, and ECU software calibrations.",
      deliverables: ["Live sensor stream logging", "Ignition & injection analysis", "Exhaust emission testing", "Actuator functional test"],
      estimatedDuration: "1 - 2 Hours",
      warranty: "Detailed Diagnostic Printout",
    },
    {
      id: "brake-service",
      title: "Performance Brake Service",
      category: "PERFORMANCE",
      tag: "SAFETY",
      shortDesc: "Rotor micrometer runout inspection, Brembo/AP Racing pad replacement, high-temp fluid bleed, and caliper guide rebuild.",
      deliverables: ["Ceramic / semi-metallic pad install", "Disc thickness & runout test", "DOT 4/5.1 pressure flush", "ABS hydraulic pump test"],
      estimatedDuration: "2 Hours",
      warranty: "12 Months Braking Warranty",
    },
    {
      id: "oil-filter-change",
      title: "Synthetic Oil & Filter Change",
      category: "MAINTENANCE",
      tag: "ESSENTIAL",
      shortDesc: "Premium Motul / Castrol Edge synthetic lubricants paired with OEM micro-pleat filtration for maximum shear stability.",
      deliverables: ["Full synthetic ester-base oil", "High-efficiency OEM oil filter", "New crush washer & drain plug inspection", "Reset service interval light"],
      estimatedDuration: "45 Minutes",
      warranty: "Zero Residue Guarantee",
    },
    {
      id: "battery-service",
      title: "Battery & Electrical Systems",
      category: "DIAGNOSTICS",
      tag: "POWER",
      shortDesc: "Digital cranking amp conductance testing, alternator voltage ripple analysis, and AGM battery conditioning.",
      deliverables: ["Cranking & cold CCA test", "Alternator charging load check", "Terminal deoxidation & dielectric coat", "Parasitic draw test"],
      estimatedDuration: "1 Hour",
      warranty: "Up to 3 Years Battery Warranty",
    },
    {
      id: "wheel-alignment",
      title: "3D Laser Wheel Alignment",
      category: "PERFORMANCE",
      tag: "GEOMETRY",
      shortDesc: "Sub-millimeter camber, caster, and toe adjustment utilizing high-resolution 3D optical sensors for razor-sharp steering.",
      deliverables: ["4-wheel laser alignment", "Dynamic digital wheel balancing", "Tire tread depth mapping", "Steering angle sensor reset"],
      estimatedDuration: "1.5 Hours",
      warranty: "Straight-Tracking Guarantee",
    },
    {
      id: "car-detailing",
      title: "Ceramic Detailing & Protection",
      category: "DETAILING",
      tag: "AESTHETICS",
      shortDesc: "Multi-stage machine paint correction, hydrophobic 9H ceramic coating, engine bay degreasing, and deep leather conditioning.",
      deliverables: ["3-step orbital polish", "9H Dual-layer ceramic coat", "Deep interior steam sanitation", "Engine bay detail & dressing"],
      estimatedDuration: "1 - 2 Days",
      warranty: "2 - 5 Year Coating Durability",
    },
    {
      id: "car-inspection",
      title: "Multi-Point Car Inspection",
      category: "DIAGNOSTICS",
      tag: "PRE-PURCHASE",
      shortDesc: "Pre-purchase evaluation or road-trip readiness audit assessing drivetrain health, structural integrity, and accident evidence.",
      deliverables: ["120-point digital checklist", "Paint gauge depth measurement", "Computer scan for historic codes", "Road test evaluation"],
      estimatedDuration: "2 Hours",
      warranty: "Comprehensive PDF Report",
    },
  ],
};

export const specsData = [
  { label: "WORKSHOP CAPACITY", value: "8 BAYS", detail: "Dedicated High-Lift Precision Service Bays" },
  { label: "DIAGNOSTICS", value: "OEM LEVEL", detail: "Dealer-Grade CAN & FlexRay Systems" },
  { label: "ENGINE DYNO", value: "1,200+ HP", detail: "All-Wheel Drive Hub-Mount Dynamometer" },
  { label: "ALIGNMENT", value: "3D LASER", detail: "Hunter Engineering Optical Alignment Rig" },
  { label: "GENUINE PARTS", value: "100% OEM", detail: "Direct Supply Chain from Tier-1 Brands" },
  { label: "TECHNICIANS", value: "MASTER LVL", detail: "Factory-Trained Automotive Engineers" },
  { label: "TURNAROUND", value: "SAME DAY", detail: "For Standard Maintenance & Diagnostics" },
  { label: "WARRANTY", value: "ASSURED", detail: "Comprehensive Workmanship Guarantee" },
];

export const featuresData = [
  {
    id: "01",
    title: "Laser-Guided Chassis & Suspension",
    description:
      "Our optical alignment rigs calibrate toe, camber, and caster within 0.01-degree tolerances to ensure neutral cornering response, maximum tire life, and high-speed stability.",
    tag: "GEOMETRY RIG",
  },
  {
    id: "02",
    title: "High-Temperature Thermal Diagnostics",
    description:
      "Utilizing infrared FLIR thermography and digital cooling pressure transducers, we identify microscopic radiator restrictions, thermostat sticking, and heat-soak bottlenecks.",
    tag: "THERMAL IMAGING",
  },
  {
    id: "03",
    title: "Digital CAN-Bus & Sensor Scopes",
    description:
      "We trace electrical waveforms with 4-channel oscilloscopes rather than guessing, isolating intermittent CAN-network glitches, sensor noise, and ignition dropouts.",
    tag: "OSCILLOSCOPE LAB",
  },
  {
    id: "04",
    title: "Precision Engine & Powertrain Care",
    description:
      "From timing chain replacements and cylinder leak-down testing to twin-scroll turbocharger overhauls, every mechanical operation is torqued strictly to factory specifications.",
    tag: "BLUEPRINT SPECS",
  },
];

export const whyChooseUsData = [
  {
    title: "Professional Certified Service",
    description: "Every technician at Naveen Garage is certified, bringing motorsport discipline and meticulous mechanical standards to every vehicle.",
    icon: "ShieldCheck",
  },
  {
    title: "Transparent Digital Communication",
    description: "No surprise bills. We provide photographic evidence, video walkarounds, and digital job cards before executing any service.",
    icon: "MessageSquare",
  },
  {
    title: "100% Genuine OEM & High-Grade Parts",
    description: "We use only authentic manufacturer parts and European lubricants (Motul, Castrol Edge, Liqui Moly) engineered for your vehicle.",
    icon: "PackageCheck",
  },
  {
    title: "Modern Diagnostics & Tools",
    description: "Equipped with state-of-the-art diagnostic computers, Hunter 3D alignment, AC recovery stations, and specialized precision tools.",
    icon: "Cpu",
  },
  {
    title: "Careful Workmanship & Cleanliness",
    description: "Fender covers, steering protectors, seat covers, and clinical cleanliness throughout our workshop protect your vehicle at all times.",
    icon: "Sparkles",
  },
  {
    title: "Customer Convenience & Fast Delivery",
    description: "Comfortable customer lounge with Wi-Fi, express service turnaround, transparent pick-up & drop support, and clear warranties.",
    icon: "Clock",
  },
];
