import {
  COVERAGE_SECTIONS,
  HULL_RATES,
  TAXES_BY_COUNTRY,
  type CoverageSectionKey,
  type HullUse,
  type HullWing,
} from '@/constants/coverage/sections';
import { parseMoneyInput } from '@/lib/format/money';
import type { AircraftRecord } from '@/modules/quote/step-aircraft/types/aircraft';
import type { CoveragePricing, CoverageStepData } from '../types/coverageStep';

export function resolveWing(aircraft: AircraftRecord[] | undefined): HullWing {
  const heli = (aircraft ?? []).some((a) =>
    String(a.category || '').startsWith('Helicóptero'),
  );
  return heli ? 'Helicóptero' : 'Ala fija';
}

export function resolveUse(useType: string | undefined): HullUse {
  if (useType === 'Placer personal') return 'Placer personal';
  if (useType === 'Placer y negocios') return 'Ayuda industrial';
  if (useType) return 'Comercial';
  return 'Ayuda industrial';
}

export function suggestedHullRate(wing: HullWing, use: HullUse): number {
  return HULL_RATES[wing][use];
}

export function computePricing(data: CoverageStepData): CoveragePricing {
  const premiums = {} as Record<CoverageSectionKey, number>;
  for (const sec of COVERAGE_SECTIONS) {
    const sum = parseMoneyInput(data.sums[sec.key] ?? '');
    const rate = parseFloat(String(data.rates[sec.key] ?? '').replace(',', '.')) || 0;
    premiums[sec.key] = Math.round(((sum * rate) / 100) * 100) / 100;
  }
  const net =
    Math.round(COVERAGE_SECTIONS.reduce((t, sec) => t + premiums[sec.key], 0) * 100) / 100;
  const taxPct = TAXES_BY_COUNTRY[data.country] ?? 0;
  const tax = Math.round(((net * taxPct) / 100) * 100) / 100;
  const activeCount = COVERAGE_SECTIONS.filter((sec) => premiums[sec.key] > 0).length;
  return { premiums, net, taxPct, tax, total: net + tax, activeCount };
}
