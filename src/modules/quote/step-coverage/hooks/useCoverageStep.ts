'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  COVERAGE_SECTIONS,
  SEED_SUMS,
  type CoverageSectionKey,
} from '@/constants/coverage/sections';
import { formatMoneyInput } from '@/lib/format/money';
import { loadQuoteDraft, saveQuoteDraft } from '@/lib/storage/quoteDraft';
import type { CoverageStepData } from '../types/coverageStep';
import {
  computePricing,
  resolveUse,
  resolveWing,
  suggestedHullRate,
} from '../utils/pricing';

function buildInitial(): {
  data: CoverageStepData;
  wing: ReturnType<typeof resolveWing>;
  use: ReturnType<typeof resolveUse>;
  suggested: number;
} {
  const d = loadQuoteDraft();
  const c = d.coverageStep ?? {};
  const wing = resolveWing(d.aircraft);
  const use = resolveUse(d.historyStep?.useType);
  const suggested = suggestedHullRate(wing, use);
  const savedSums = (c.sums ?? {}) as Partial<CoverageStepData['sums']>;
  const savedRates = (c.rates ?? {}) as Partial<CoverageStepData['rates']>;

  const sums = {} as CoverageStepData['sums'];
  const rates = {} as CoverageStepData['rates'];
  for (const sec of COVERAGE_SECTIONS) {
    sums[sec.key] = savedSums[sec.key] || SEED_SUMS[sec.key] || '';
    rates[sec.key] =
      savedRates[sec.key] ||
      (sec.key === 'casco' ? suggested.toFixed(3) : sec.defaultRate);
  }

  return {
    data: {
      sums,
      rates,
      country: c.country || 'Panamá',
      dedMoving: c.dedMoving || '30,000',
      dedStatic: c.dedStatic || '8,000',
    },
    wing,
    use,
    suggested,
  };
}

export function useCoverageStep() {
  const [data, setData] = useState<CoverageStepData>(() => ({
    sums: { ...SEED_SUMS },
    rates: COVERAGE_SECTIONS.reduce(
      (o, s) => {
        o[s.key] = s.key === 'casco' ? '1.120' : s.defaultRate;
        return o;
      },
      {} as CoverageStepData['rates'],
    ),
    country: 'Panamá',
    dedMoving: '30,000',
    dedStatic: '8,000',
  }));
  const [meta, setMeta] = useState({
    wing: 'Ala fija' as ReturnType<typeof resolveWing>,
    use: 'Ayuda industrial' as ReturnType<typeof resolveUse>,
    suggested: 1.12,
  });
  const [hydrated, setHydrated] = useState(false);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    const init = buildInitial();
    setData(init.data);
    setMeta({ wing: init.wing, use: init.use, suggested: init.suggested });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteDraft({ coverageStep: data });
  }, [data, hydrated]);

  const pricing = useMemo(() => computePricing(data), [data]);

  function setSum(key: CoverageSectionKey, raw: string) {
    setData((prev) => ({
      ...prev,
      sums: { ...prev.sums, [key]: formatMoneyInput(raw) },
    }));
  }

  function setRate(key: CoverageSectionKey, raw: string) {
    const v = raw.replace(/[^\d.,]/g, '');
    setData((prev) => ({
      ...prev,
      rates: { ...prev.rates, [key]: v },
    }));
  }

  function setCountry(country: string) {
    setData((prev) => ({ ...prev, country }));
  }

  function setDedMoving(raw: string) {
    setData((prev) => ({ ...prev, dedMoving: formatMoneyInput(raw) }));
  }

  function setDedStatic(raw: string) {
    setData((prev) => ({ ...prev, dedStatic: formatMoneyInput(raw) }));
  }

  const progressNote = calculating
    ? ''
    : pricing.activeCount === 0
      ? 'Ingrese al menos una suma asegurada'
      : 'Listo para calcular';

  return {
    data,
    meta,
    pricing,
    calculating,
    setCalculating,
    setSum,
    setRate,
    setCountry,
    setDedMoving,
    setDedStatic,
    progressNote,
    hydrated,
  };
}
