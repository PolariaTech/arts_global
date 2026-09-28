import {
  COVERAGE_SECTIONS,
  SEED_SUMS,
  TAXES_BY_COUNTRY,
  type CoverageSectionKey,
} from '@/constants/coverage/sections';
import { formatUsd, parseMoneyInput } from '@/lib/format/money';
import { loadQuoteDraft, type QuoteDraft } from '@/lib/storage/quoteDraft';
import type { AircraftRecord } from '@/modules/quote/step-aircraft/types/aircraft';
import {
  resolveUse,
  resolveWing,
  suggestedHullRate,
} from '@/modules/quote/step-coverage/utils/pricing';

export type QuoteCoverageLine = {
  key: CoverageSectionKey;
  label: string;
  note: string;
  sum: number;
  rate: number;
  premium: number;
};

export type ComputedQuote = {
  insured: string;
  reg: string;
  aircraftLine: string;
  use: string;
  country: string;
  wing: string;
  aircraft: AircraftRecord[];
  coverage: QuoteCoverageLine[];
  net: number;
  taxPct: number;
  taxAmount: number;
  total: number;
  hullValue: number;
  cascoRate: number;
};

const FALLBACK_AIRCRAFT: AircraftRecord = {
  id: 1,
  reg: 'HP-4471',
  year: '2014',
  make: 'Cessna',
  model: 'Citation CJ2',
  category: 'Ala fija multimotor',
  seats: '7',
  hull: '2,850,000',
  acquired: '',
  airframeHours: '',
  overhaulHours: '',
  inspection: '',
  mods: '',
  equipment: [],
};

/** Cotizaciones de librería (panel) no respaldadas por el borrador del wizard. */
const QUOTE_LIBRARY: Record<string, QuoteDraft> = {
  'aerocarga-david': {
    insuredStep: { insured: 'Aerocarga David S.A.' },
    aircraft: [
      {
        ...FALLBACK_AIRCRAFT,
        reg: 'HP-9902',
        year: '2017',
        make: 'Cessna',
        model: '208B Grand Caravan',
        category: 'Ala fija monomotor',
        hull: '2,100,000',
      },
    ],
    historyStep: { useType: 'Comercial' },
    coverageStep: {
      sums: {
        casco: '2,100,000',
        guerra: '2,100,000',
        rc: '3,000,000',
        apTrip: '80,000',
        gmTrip: '20,000',
        apPax: '',
        gmPax: '',
        apInf: '',
        gmInf: '',
        repuestos: '40,000',
      },
      country: 'Panamá',
      dedMoving: '25,000',
      dedStatic: '6,000',
    },
  },
};

export function computeQuote(cotId?: string | null): ComputedQuote {
  const lib = cotId ? QUOTE_LIBRARY[cotId] : undefined;
  const d = lib ?? loadQuoteDraft();
  const insuredStep = d.insuredStep ?? {};
  const aircraft =
    d.aircraft && d.aircraft.length > 0 ? d.aircraft : [FALLBACK_AIRCRAFT];
  const ac = aircraft[0] ?? FALLBACK_AIRCRAFT;
  const wing = resolveWing(aircraft);
  const historyStep = d.historyStep ?? {};
  const use = resolveUse(historyStep.useType);
  const coverageStep = d.coverageStep ?? {};
  const country = coverageStep.country || 'Panamá';
  const suggestedCasco = suggestedHullRate(wing, use);
  const savedSums = (coverageStep.sums ?? {}) as Partial<Record<CoverageSectionKey, string>>;
  const savedRates = (coverageStep.rates ?? {}) as Partial<Record<CoverageSectionKey, string>>;

  const coverage: QuoteCoverageLine[] = [];
  let net = 0;

  for (const sec of COVERAGE_SECTIONS) {
    const seedNum = parseMoneyInput(SEED_SUMS[sec.key] || '') || parseMoneyInput(ac.hull) || 0;
    const sum = lib
      ? parseMoneyInput(savedSums[sec.key] ?? '')
      : parseMoneyInput(savedSums[sec.key] ?? '') ||
        (sec.key === 'casco' || sec.key === 'guerra'
          ? parseMoneyInput(ac.hull) || seedNum
          : seedNum);
    const savedRate = parseFloat(String(savedRates[sec.key] || '').replace(',', '.'));
    const rate =
      savedRate > 0
        ? savedRate
        : sec.key === 'casco'
          ? suggestedCasco
          : parseFloat(sec.defaultRate) || 0;
    const premium = Math.round(((sum * rate) / 100) * 100) / 100;
    net += premium;
    if (sum > 0) {
      coverage.push({
        key: sec.key,
        label: sec.name,
        note:
          sec.key === 'casco'
            ? `${ac.make} ${ac.model} · valor declarado, todo riesgo`
            : sec.key === 'guerra'
              ? 'Riesgos de guerra y afines'
              : sec.key === 'rc'
                ? 'Límite único combinado, por evento'
                : 'Cobertura complementaria',
        sum,
        rate,
        premium,
      });
    }
  }

  net = Math.round(net * 100) / 100;
  const taxPct = TAXES_BY_COUNTRY[country] ?? 0;
  const taxAmount = Math.round(((net * taxPct) / 100) * 100) / 100;
  const total = Math.round((net + taxAmount) * 100) / 100;
  const casco = coverage.find((c) => c.key === 'casco');
  const hullValue =
    parseMoneyInput(ac.hull) || casco?.sum || parseMoneyInput(SEED_SUMS.casco);

  return {
    insured: insuredStep.insured || 'Vuelos Ejecutivos Panamá S.A.',
    reg: ac.reg || 'HP-4471',
    aircraftLine: `${ac.make || 'Cessna'} ${ac.model || 'Citation CJ2'} · ${ac.year || '2014'}`,
    use,
    country,
    wing,
    aircraft,
    coverage,
    net,
    taxPct,
    taxAmount,
    total,
    hullValue,
    cascoRate: casco?.rate ?? suggestedCasco,
  };
}

export function moneyInt(n: number): string {
  return `US$ ${Math.round(n).toLocaleString('en-US')}`;
}

export { formatUsd as money };
