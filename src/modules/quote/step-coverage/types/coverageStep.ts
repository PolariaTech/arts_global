import type { CoverageSectionKey } from '@/constants/coverage/sections';

export type CoverageStepData = {
  sums: Record<CoverageSectionKey, string>;
  rates: Record<CoverageSectionKey, string>;
  country: string;
  dedMoving: string;
  dedStatic: string;
};

export type CoveragePricing = {
  premiums: Record<CoverageSectionKey, number>;
  net: number;
  taxPct: number;
  tax: number;
  total: number;
  activeCount: number;
};
