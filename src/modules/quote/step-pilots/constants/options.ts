import type { ConditionalHourKey } from '../types/pilot';

export const PILOT_RATINGS = [
  'Instrumentos IFR',
  'Multimotor',
  'Helicóptero',
  'Hidroavión',
  'Tailwheel',
] as const;

export const LICENSE_TYPES = ['Privado', 'Comercial', 'ATP'] as const;

export const MEDICAL_CLASSES = [
  'Primera clase',
  'Segunda clase',
  'Tercera clase',
] as const;

export const PILOT_REQUIRED_KEYS = [
  'name',
  'dob',
  'license',
  'licenseType',
  'medicalClass',
  'medicalExpiry',
  'training',
  'totalHours',
  'last12',
  'makeModel',
  'makeModel12',
] as const;

export const CONDITIONAL_LABELS: Record<ConditionalHourKey, string> = {
  retract: 'Horas en tren retráctil',
  turbine: 'Horas en turbina',
  tailwheel: 'Horas en tailwheel',
  helicopter: 'Horas en helicóptero',
};
