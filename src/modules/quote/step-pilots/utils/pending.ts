import { PILOT_REQUIRED_KEYS } from '../constants/options';
import type { PilotRecord } from '../types/pilot';

export function countPendingPilotFields(list: PilotRecord[]): number {
  return list.reduce(
    (n, p) =>
      n + PILOT_REQUIRED_KEYS.filter((k) => String(p[k] ?? '').trim() === '').length,
    0,
  );
}
