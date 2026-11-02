export interface Property {
  id: string;
  title: string;
  phase: string;
  type: 'House' | 'Plot' | 'Apartment' | 'Commercial';
  purpose: 'Buy' | 'Rent';
  size: '5 Marla' | '10 Marla' | '1 Kanal' | '2 Kanal';
  bedrooms?: number;
  bathrooms?: number;
  price: string;
  numericPrice: number; // in PKR for range filtering
  description: string;
  images: string[];
  amenities: string[];
  location: string;
}

export const PROPERTIES: Property[] = [
  // 5 FOR SALE:
  {
    id: 'p1',
    title: '1 Kanal Ultra-Modern Designer Bungalow',
    phase: 'DHA Phase 6',
    type: 'House',
    purpose: 'Buy',
    size: '1 Kanal',
    bedrooms: 5,
    bathrooms: 6,
    price: 'PKR 8.75 Crore (Sample)',
    numericPrice: 87500000,
    location: 'Sector C, DHA Phase 6, Lahore',
    description: 'Bespoke architectural residence featuring imported Italian porcelain tiles, solid ash wood doors, double-height grand entrance lobby, Grohe sanitary fittings, and high-efficiency dual kitchens.',
    images: ['/images/p1-1.jpg', '/images/p1-2.jpg', '/images/p1-3.jpg'],
    amenities: ['15kW Solar Power System', 'Double Height Lobby', 'Italian Designer Kitchen', 'Basement Home Cinema', 'Servant Quarters', '2-Car Covered Garage'],
  },
  {
    id: 'p2',
    title: '10 Marla Contemporary Spanish Elevation Villa',
    phase: 'DHA Phase 5',
    type: 'House',
    purpose: 'Buy',
    size: '10 Marla',
    bedrooms: 4,
    bathrooms: 5,
    price: 'PKR 4.95 Crore (Sample)',
    numericPrice: 49500000,
    location: 'Sector G, DHA Phase 5, Lahore',
    description: 'Immaculate Spanish contemporary facade home in prime Phase 5. Features floor-to-ceiling double-glazed windows, private terrace lounge, bespoke woodwork, and lush tropical front landscaping.',
    images: ['/images/p2-1.jpg', '/images/p2-2.jpg', '/images/p2-3.jpg'],
    amenities: ['Private Rooftop Terrace', 'Smeg Kitchen Appliances', 'Smart Ambient Lighting', 'Spanish Tile Flooring', 'Attached Servant Room'],
  },
  {
    id: 'p3',
    title: '2 Kanal Executive Residence with Heated Pool',
    phase: 'DHA Phase 8',
    type: 'House',
    purpose: 'Buy',
    size: '2 Kanal',
    bedrooms: 6,
    bathrooms: 7,
    price: 'PKR 19.5 Crore (Sample)',
    numericPrice: 195000000,
    location: 'Sector B (Air Avenue), DHA Phase 8, Lahore',
    description: 'Ultra-luxurious custom estate facing a wide green boulevard. Boasts an illuminated outdoor heated swimming pool, cantilevered balconies, private glass lift, gym room, and manicured private lawn.',
    images: ['/images/p3-1.jpg', '/images/p3-2.jpg', '/images/p3-3.jpg'],
    amenities: ['Private Heated Swimming Pool', 'Glass Panoramic Lift', 'Full Smart Home Automation', 'Home Gymnasium', '4-Car Executive Port', 'Jacuzzi in Master Suites'],
  },
  {
    id: 'p4',
    title: '4 Marla Commercial Corporate Plaza (G+3)',
    phase: 'DHA Phase 1',
    type: 'Commercial',
    purpose: 'Buy',
    size: '5 Marla',
    bedrooms: 0,
    bathrooms: 4,
    price: 'PKR 8.50 Crore (Sample)',
    numericPrice: 85000000,
    location: 'Sector H Commercial, DHA Phase 1, Lahore',
    description: 'Prime commercial building in the heart of DHA Phase 1. Comprises Basement, Ground, and 3 Upper Floors with high footfall, passenger elevator, independent utility connections, and established blue-chip corporate rental yield.',
    images: ['/images/p4-1.jpg', '/images/p4-2.jpg', '/images/p4-3.jpg'],
    amenities: ['Basement + Ground + 3 Floors', 'Dedicated Passenger Lift', '100% Commercial Approved', 'Backup Generator Ready', 'High Rental Return'],
  },
  {
    id: 'p5',
    title: '1 Kanal Prime Corner Residential Plot',
    phase: 'DHA Phase 7',
    type: 'Plot',
    purpose: 'Buy',
    size: '1 Kanal',
    bedrooms: 0,
    bathrooms: 0,
    price: 'PKR 3.25 Crore (Sample)',
    numericPrice: 32500000,
    location: 'Sector T Corner, DHA Phase 7, Lahore',
    description: 'Direct owner corner residential plot facing lush sector park. 100% confirmed possession, all development charges fully paid, clear NDC file ready for immediate transfer at DHA Main Office.',
    images: ['/images/p5-1.jpg', '/images/p5-2.jpg', '/images/p5-3.jpg'],
    amenities: ['Park Facing Corner', 'Possession Ready', 'Underground Electrification', 'Immediate Construction Allowed', 'NDC Cleared File'],
  },

  // 3 FOR RENT:
  {
    id: 'p6',
    title: '1 Kanal Fully Furnished Luxury Residence',
    phase: 'DHA Phase 6',
    type: 'House',
    purpose: 'Rent',
    size: '1 Kanal',
    bedrooms: 5,
    bathrooms: 6,
    price: 'PKR 3.80 Lac / Month (Sample)',
    numericPrice: 380000,
    location: 'Sector L, DHA Phase 6, Lahore',
    description: 'Fully furnished designer house for executive rent. Complete with imported designer furniture, inverter air conditioning in every room, backup solar power, and 24/7 security installation. Ideal for multinational executives.',
    images: ['/images/p6-1.jpg', '/images/p6-2.jpg', '/images/p6-3.jpg'],
    amenities: ['Turnkey Luxury Furniture', 'Full Inverter Air Conditioning', 'Solar System Backup', 'High Speed Fibre Internet', 'Gated Sector Security'],
  },
  {
    id: 'p7',
    title: '10 Marla Park-Facing Modern Villa',
    phase: 'DHA Phase 5',
    type: 'House',
    purpose: 'Rent',
    size: '10 Marla',
    bedrooms: 4,
    bathrooms: 5,
    price: 'PKR 2.40 Lac / Month (Sample)',
    numericPrice: 240000,
    location: 'Sector D, DHA Phase 5, Lahore',
    description: 'Serene park-facing rental property in established DHA Phase 5. Walking distance to sector market, school, and sports complex. High-end modern kitchens and spotless woodwork.',
    images: ['/images/p7-1.jpg', '/images/p7-2.jpg', '/images/p7-3.jpg'],
    amenities: ['Direct Park View', 'Contemporary Kitchens', 'Covered Parking for 2 Cars', 'Water Filtration Unit', 'Near LUMS & Ring Road'],
  },
  {
    id: 'p8',
    title: '5 Marla Luxury Executive Townhouse Apartment',
    phase: 'DHA Phase 2',
    type: 'Apartment',
    purpose: 'Rent',
    size: '5 Marla',
    bedrooms: 2,
    bathrooms: 2,
    price: 'PKR 1.25 Lac / Month (Sample)',
    numericPrice: 125000,
    location: 'Sector Q, DHA Phase 2, Lahore',
    description: 'Chic 2-bedroom executive duplex apartment in central Phase 2. Features an open-concept kitchen, private balcony, secure access control, and dedicated basement reserved parking.',
    images: ['/images/p8-1.jpg', '/images/p8-2.jpg', '/images/p8-3.jpg'],
    amenities: ['Dedicated Basement Parking', 'Card Key Access Control', 'Private Balcony', 'Fitted Wardrobes', 'Central Gas & Water Supply'],
  },
];

export const DHA_PHASE_OPTIONS = [
  'All Phases',
  'DHA Phase 1',
  'DHA Phase 2',
  'DHA Phase 3',
  'DHA Phase 4',
  'DHA Phase 5',
  'DHA Phase 6',
  'DHA Phase 7',
  'DHA Phase 8',
] as const;

export const PROPERTY_TYPE_OPTIONS = ['All Types', 'House', 'Plot', 'Apartment', 'Commercial'] as const;
export const PROPERTY_SIZE_OPTIONS = ['All Sizes', '5 Marla', '10 Marla', '1 Kanal', '2 Kanal'] as const;

export const BUDGET_RANGES = [
  { label: 'Any Budget', min: 0, max: Infinity },
  { label: 'Under PKR 2 Lac (Rent)', min: 0, max: 200000, purpose: 'Rent' },
  { label: 'PKR 2 to 5 Lac (Rent)', min: 200000, max: 500000, purpose: 'Rent' },
  { label: 'Under PKR 5 Crore (Buy)', min: 0, max: 50000000, purpose: 'Buy' },
  { label: 'PKR 5 to 10 Crore (Buy)', min: 50000000, max: 100000000, purpose: 'Buy' },
  { label: 'Above PKR 10 Crore (Buy)', min: 100000000, max: Infinity, purpose: 'Buy' },
];
