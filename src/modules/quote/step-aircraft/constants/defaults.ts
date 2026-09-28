import type { AircraftRecord } from '../types/aircraft';

export function blankAircraft(id: number): AircraftRecord {
  return {
    id,
    reg: '',
    year: '',
    make: '',
    model: '',
    category: '',
    seats: '',
    hull: '',
    acquired: '',
    airframeHours: '',
    overhaulHours: '',
    inspection: '',
    mods: '',
    equipment: [],
  };
}

/** Semilla del mockup (primera carga sin borrador). */
export function seedAircraft(id: number): AircraftRecord {
  return {
    id,
    reg: 'HP-4471',
    year: '2014',
    make: 'Cessna',
    model: 'Citation CJ2',
    category: 'Ala fija multimotor',
    seats: '7',
    hull: '2,850,000',
    acquired: '2019-03-12',
    airframeHours: '3120',
    overhaulHours: '480',
    inspection: '2026-04-18',
    mods: 'Aviónica Garmin G3000 actualizada (2022)',
    equipment: [
      'GPS aprobado IFR',
      'Piloto automático 2+ ejes',
      'Alerta de terreno (TAWS)',
      'Alerta de tráfico',
      'Radar meteorológico',
    ],
  };
}
