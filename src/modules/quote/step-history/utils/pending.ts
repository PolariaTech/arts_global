import type { HistoryStepData } from '../types/historyStep';

export function claimsFilled(data: HistoryStepData): boolean {
  return data.claims.some((c) => c.date || c.description || c.amount);
}

export function claimsUnanswered(data: HistoryStepData): boolean {
  return !data.noClaims && !claimsFilled(data);
}

export function countPendingHistory(data: HistoryStepData): number {
  let pending = 0;
  if (claimsUnanswered(data)) pending += 1;
  for (const k of ['violations', 'dui', 'felony', 'compensation', 'unpaved'] as const) {
    if (data[k] === null) pending += 1;
  }
  for (const k of ['useType', 'annualHours', 'baseAirport', 'countries'] as const) {
    if (String(data[k]).trim() === '') pending += 1;
  }
  if (data.terrain.length === 0) pending += 1;
  return pending;
}
