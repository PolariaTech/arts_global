export const AIRCRAFT_MAKES = [
  'Airbus',
  'Beechcraft',
  'Bell',
  'Boeing',
  'Bombardier',
  'Cessna',
  'Cirrus',
  'Dassault',
  'Diamond',
  'Embraer',
  'Gulfstream',
  'Leonardo',
  'Piper',
  'Pilatus',
  'Robinson',
  'Textron Aviation',
] as const;

export const AIRCRAFT_CATEGORIES = [
  'Ala fija monomotor',
  'Ala fija multimotor',
  'Helicóptero pistón',
  'Helicóptero turbina',
] as const;

export const BASE_EQUIPMENT = [
  'GPS aprobado IFR',
  'Piloto automático 2+ ejes',
  'Alerta de terreno (TAWS)',
  'Alerta de tráfico',
  'Radar meteorológico',
  'Paracaídas balístico',
] as const;

export const HELI_EQUIPMENT = ['Flotadores', 'Kit anti-cable'] as const;

export const AIRCRAFT_REQUIRED_KEYS = [
  'reg',
  'year',
  'make',
  'model',
  'category',
  'seats',
  'hull',
  'acquired',
  'airframeHours',
  'overhaulHours',
  'inspection',
] as const;

export function equipmentOptionsFor(category: string): string[] {
  const isHeli = category.startsWith('Helicóptero');
  return isHeli ? [...BASE_EQUIPMENT, ...HELI_EQUIPMENT] : [...BASE_EQUIPMENT];
}
