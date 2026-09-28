/** Secciones de cobertura del paso 5 (mockup). */
export const COVERAGE_SECTIONS = [
  { key: 'casco', name: 'Casco', defaultRate: '', note: '' },
  {
    key: 'guerra',
    name: 'Casco Guerra',
    defaultRate: '0.1120',
    note: 'Riesgos de guerra y afines.',
  },
  {
    key: 'rc',
    name: 'Responsabilidad Civil (RC)',
    defaultRate: '0.6065',
    note: 'Límite único combinado.',
  },
  { key: 'apTrip', name: 'Accidentes Personales Tripulación', defaultRate: '0.5330', note: '' },
  { key: 'gmTrip', name: 'Gastos Médicos Tripulación', defaultRate: '0.4339', note: '' },
  { key: 'apPax', name: 'Accidentes Personales Pasajeros', defaultRate: '0.5088', note: '' },
  { key: 'gmPax', name: 'Gastos Médicos Pasajeros', defaultRate: '0.4247', note: '' },
  { key: 'apInf', name: 'Accidentes Personales Infantes', defaultRate: '0.4937', note: '' },
  { key: 'gmInf', name: 'Gastos Médicos Infantes', defaultRate: '0.3864', note: '' },
  { key: 'repuestos', name: 'Repuestos', defaultRate: '0.1825', note: '' },
] as const;

export type CoverageSectionKey = (typeof COVERAGE_SECTIONS)[number]['key'];

export const HULL_RATES = {
  'Ala fija': {
    'Placer personal': 1.429,
    'Ayuda industrial': 1.12,
    Comercial: 1.719,
  },
  Helicóptero: {
    'Placer personal': 1.622,
    'Ayuda industrial': 1.683,
    Comercial: 1.817,
  },
} as const;

export type HullWing = keyof typeof HULL_RATES;
export type HullUse = keyof (typeof HULL_RATES)['Ala fija'];

export const TAXES_BY_COUNTRY: Record<string, number> = {
  Panamá: 0,
  Ecuador: 0,
  'República Dominicana': 0,
  Colombia: 2,
  Chile: 2,
  Guatemala: 5,
  Perú: 6.25,
  Bolivia: 2.9,
};

export const COVERAGE_COUNTRIES = Object.keys(TAXES_BY_COUNTRY);

export const SEED_SUMS: Record<CoverageSectionKey, string> = {
  casco: '2,850,000',
  guerra: '2,850,000',
  rc: '5,000,000',
  apTrip: '100,000',
  gmTrip: '25,000',
  apPax: '100,000',
  gmPax: '25,000',
  apInf: '',
  gmInf: '',
  repuestos: '50,000',
};

export const QUOTE_DRAFT_KEY = 'arts.quote.v2';
