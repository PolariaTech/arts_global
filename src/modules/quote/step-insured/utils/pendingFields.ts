import type { InsuredStepData } from '../types/insuredStep';

export function countPendingInsuredFields(data: InsuredStepData): number {
  const required: (keyof InsuredStepData)[] = [
    'insured',
    'taxId',
    'relation',
    'carrier',
    'expiry',
  ];
  if (data.declined === true) required.push('declinedDetail');
  if (data.lien === true) {
    required.push('lienName', 'lienAmount');
  }

  let pending = required.filter((k) => String(data[k] ?? '').trim() === '').length;
  if (data.declined === null) pending += 1;
  if (data.lien === null) pending += 1;
  return pending;
}
