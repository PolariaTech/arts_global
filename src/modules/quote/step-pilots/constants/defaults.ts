import type { AircraftRecord } from '@/modules/quote/step-aircraft/types/aircraft';
import type { FleetFlags, PilotRecord } from '../types/pilot';

export function blankPilot(id: number): PilotRecord {
  return {
    id,
    name: '',
    dob: '',
    license: '',
    licenseType: '',
    ratings: [],
    medicalClass: '',
    medicalExpiry: '',
    training: '',
    totalHours: '',
    last12: '',
    makeModel: '',
    makeModel12: '',
    retract: '',
    turbine: '',
    tailwheel: '',
    helicopter: '',
  };
}

/** Semilla del mockup (ajustada a inputs numéricos de horas). */
export function seedPilot(id: number): PilotRecord {
  return {
    id,
    name: 'Roberto Chen Quintero',
    dob: '1979-06-22',
    license: 'PA-CPL-08841',
    licenseType: 'Comercial',
    ratings: ['Instrumentos IFR', 'Multimotor'],
    medicalClass: 'Primera clase',
    medicalExpiry: '2027-02-15',
    training: '2025-11-20',
    totalHours: '6840',
    last12: '310',
    makeModel: '840',
    makeModel12: '290',
    retract: '540',
    turbine: '',
    tailwheel: '',
    helicopter: '',
  };
}

export function fleetFlagsFromAircraft(aircraft: AircraftRecord[] | undefined): FleetFlags {
  const cats = (aircraft ?? []).map((a) => a.category || '');
  return {
    needsRetract: cats.some((c) => c === 'Ala fija multimotor'),
    needsTurbine: cats.some((c) => c === 'Helicóptero turbina'),
    needsHeli: cats.some((c) => c.startsWith('Helicóptero')),
  };
}
