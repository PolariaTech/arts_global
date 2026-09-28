export type AircraftCategory =
  | ''
  | 'Ala fija monomotor'
  | 'Ala fija multimotor'
  | 'Helicóptero pistón'
  | 'Helicóptero turbina';

export type AircraftRecord = {
  id: number;
  reg: string;
  year: string;
  make: string;
  model: string;
  category: AircraftCategory | string;
  seats: string;
  hull: string;
  acquired: string;
  airframeHours: string;
  overhaulHours: string;
  inspection: string;
  mods: string;
  equipment: string[];
};
