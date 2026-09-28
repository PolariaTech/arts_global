import type { InsuredStepData } from '../types/insuredStep';

/** Valores demo del mockup (primera carga sin borrador). */
export const INSURED_STEP_DEFAULTS: InsuredStepData = {
  insured: 'Vuelos Ejecutivos Panamá S.A.',
  insuredType: 'Empresa',
  taxId: '155621844-2-2019',
  relation: 'Piloto empleado',
  carrier: 'Pan-American Aviation Insurance',
  expiry: '2026-10-30',
  declined: false,
  declinedDetail: '',
  lien: true,
  lienName: 'Banco General S.A.',
  lienAmount: '2,400,000',
};

export const PILOT_RELATIONS = [
  { value: '', label: 'Seleccionar…' },
  { value: 'El asegurado es el piloto', label: 'El asegurado es el piloto' },
  { value: 'Piloto empleado', label: 'Piloto empleado' },
  { value: 'Otro', label: 'Otro' },
] as const;
