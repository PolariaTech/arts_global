import { AIRCRAFT_REQUIRED_KEYS } from '../constants/options';
import type { AircraftRecord } from '../types/aircraft';

export function countPendingAircraftFields(list: AircraftRecord[]): number {
  return list.reduce(
    (n, a) =>
      n + AIRCRAFT_REQUIRED_KEYS.filter((k) => String(a[k] ?? '').trim() === '').length,
    0,
  );
}
