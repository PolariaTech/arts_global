import type { HistoryClaim, HistoryStepData } from '../types/historyStep';

export function blankClaim(id: number): HistoryClaim {
  return { id, date: '', description: '', amount: '' };
}

export const HISTORY_STEP_DEFAULTS: HistoryStepData = {
  noClaims: true,
  claims: [blankClaim(1)],
  violations: false,
  violationsDetail: '',
  dui: false,
  duiDetail: '',
  felony: false,
  felonyDetail: '',
  useType: 'Placer y negocios',
  annualHours: '260',
  compensation: false,
  baseAirport: 'MPMG · Marcos A. Gelabert (Ciudad de Panamá)',
  storage: 'Hangar',
  unpaved: false,
  unpavedDetail: '',
  terrain: ['Llano', 'Sobre agua'],
  countries: 'Panamá, Colombia, Costa Rica',
};
