import { QUOTE_DRAFT_KEY } from '@/constants/coverage/sections';
import type { AircraftRecord } from '@/modules/quote/step-aircraft/types/aircraft';
import type { CoverageStepData } from '@/modules/quote/step-coverage/types/coverageStep';
import type { HistoryStepData } from '@/modules/quote/step-history/types/historyStep';
import type { InsuredStepData } from '@/modules/quote/step-insured/types/insuredStep';
import type { PilotRecord } from '@/modules/quote/step-pilots/types/pilot';

export type QuoteDraft = {
  insuredStep?: Partial<InsuredStepData>;
  aircraft?: AircraftRecord[];
  pilots?: PilotRecord[];
  historyStep?: Partial<HistoryStepData>;
  coverageStep?: Partial<CoverageStepData>;
  [key: string]: unknown;
};

export function loadQuoteDraft(): QuoteDraft {
  if (typeof window === 'undefined') return {};
  try {
    return (JSON.parse(localStorage.getItem(QUOTE_DRAFT_KEY) || '{}') as QuoteDraft) || {};
  } catch {
    return {};
  }
}

export function saveQuoteDraft(patch: QuoteDraft): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUOTE_DRAFT_KEY, JSON.stringify({ ...loadQuoteDraft(), ...patch }));
  } catch {
    /* ignore quota errors in mock */
  }
}

export function clearQuoteDraft(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(QUOTE_DRAFT_KEY);
}
