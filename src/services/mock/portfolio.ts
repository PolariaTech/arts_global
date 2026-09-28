import { COUNTRY_STATS } from '@/data/mock/countries';
import type { CountryStat } from '@/types/country/country';
import { formatUsd } from '@/lib/format/country';
import { ROUTES } from '@/config/routes';

export type PortfolioCountryRow = CountryStat & {
  premiumUsd: string;
  premiumLocal: string;
};

export type PortfolioPeriod = 'MTD' | 'QTD' | 'YTD';

export const PORTFOLIO_PERIOD_LABELS: Record<PortfolioPeriod, string> = {
  MTD: 'Mes',
  QTD: 'Trimestre',
  YTD: 'Año',
};

type PeriodData = {
  label: string;
  factor: number;
  months: [string, number][];
};

const PERIOD_DATA: Record<PortfolioPeriod, PeriodData> = {
  MTD: {
    label: 'sep 2026',
    factor: 0.115,
    months: [
      ['may', 424],
      ['jun', 437],
      ['jul', 411],
      ['ago', 398],
      ['sep', 413],
    ],
  },
  QTD: {
    label: '3T 2026',
    factor: 0.34,
    months: [
      ['abr', 389],
      ['may', 424],
      ['jun', 437],
      ['jul', 411],
      ['ago', 398],
      ['sep', 413],
    ],
  },
  YTD: {
    label: '2026',
    factor: 1,
    months: [
      ['ene', 352],
      ['feb', 368],
      ['mar', 401],
      ['abr', 389],
      ['may', 424],
      ['jun', 437],
      ['jul', 411],
      ['ago', 398],
      ['sep', 413],
    ],
  },
};

export type PortfolioMonthBar = {
  label: string;
  value: string;
  heightPx: number;
  peak: boolean;
};

export type PortfolioRenewal = {
  number: string;
  insured: string;
  aircraft: string;
  reg: string;
  producer: string;
  country: string;
  days: number;
  daysLabel: string;
  urgent: boolean;
  href: string;
};

export type PortfolioDashboardData = {
  period: PortfolioPeriod;
  periodLabel: string;
  headerNote: string;
  chartTotal: string;
  chartTotalRaw: number;
  countries: PortfolioCountryRow[];
  months: PortfolioMonthBar[];
  renewals: PortfolioRenewal[];
};

const RENEWALS_SEED = [
  {
    number: '2373',
    insured: 'Aeroservicios Austral SpA',
    aircraft: 'Cessna TH206',
    reg: 'CC-6305',
    producer: 'M. Herrera',
    country: 'Chile',
    days: 0,
  },
  {
    number: '2380',
    insured: 'Aviación Petén S.A.',
    aircraft: 'Twin Commander 690C',
    reg: 'TG-3471',
    producer: 'T. Solórzano',
    country: 'Guatemala',
    days: 1,
  },
  {
    number: '2399',
    insured: 'Helicópteros Patagonia SpA',
    aircraft: 'Cessna Citation CJ 525',
    reg: 'CC-7468',
    producer: 'M. Herrera',
    country: 'Chile',
    days: 2,
  },
  {
    number: '2396',
    insured: 'Aeroservicios del Istmo S.A.',
    aircraft: 'Cessna U206E',
    reg: 'HP-1791',
    producer: 'J. Salgado',
    country: 'Panamá',
    days: 4,
  },
  {
    number: '2406',
    insured: 'Transportes Aéreos Darién S.A.',
    aircraft: 'Airbus H125',
    reg: 'HP-8104',
    producer: 'L. Cedeño',
    country: 'Panamá',
    days: 15,
  },
] as const;

export function getPortfolioDashboard(period: PortfolioPeriod): PortfolioDashboardData {
  const d = PERIOD_DATA[period];
  const scaled = COUNTRY_STATS.map((c) => ({
    ...c,
    policies: Math.max(1, Math.round(c.policies * d.factor)),
    usd: Math.round(c.usd * d.factor),
  }));
  const grand = scaled.reduce((s, c) => s + c.usd, 0);
  const policyTotal = scaled.reduce((s, c) => s + c.policies, 0);
  const maxMonth = Math.max(...d.months.map((m) => m[1]));

  const countries: PortfolioCountryRow[] = scaled.map((c) => ({
    ...c,
    premiumUsd: formatUsd(c.usd),
    premiumLocal: `${((c.usd / grand) * 100).toFixed(1)}% de la prima emitida`,
  }));

  const months: PortfolioMonthBar[] = d.months.map(([label, v]) => ({
    label,
    value: `$${v}K`,
    heightPx: Math.round((v / maxMonth) * 132),
    peak: v === maxMonth,
  }));

  const renewals: PortfolioRenewal[] = RENEWALS_SEED.map((r) => ({
    ...r,
    daysLabel: `${r.days} días`,
    urgent: r.days <= 15,
    href: ROUTES.admin.polizaDetalle(r.number),
  }));

  return {
    period,
    periodLabel: d.label,
    headerNote: `Todos los países · ${policyTotal} pólizas · datos al 20 sep 2026`,
    chartTotal: formatUsd(grand),
    chartTotalRaw: grand,
    countries,
    months,
    renewals,
  };
}

export function exportPortfolioCsv(
  data: PortfolioDashboardData,
  filename: string,
): void {
  if (typeof window === 'undefined') return;
  const lines = [
    'País,Código,Pólizas,Prima US$',
    ...data.countries.map(
      (c) =>
        `"${c.name}",${c.code},${c.policies},${c.usd}`,
    ),
    '',
    `Total ${data.periodLabel},${data.chartTotalRaw}`,
    '',
    'Mes,Prima US$ K',
    ...data.months.map((m) => `${m.label},${m.value.replace('$', '').replace('K', '')}`),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function listPortfolioCountries(): PortfolioCountryRow[] {
  return getPortfolioDashboard('YTD').countries;
}

export function listPortfolioRenewals() {
  return getPortfolioDashboard('YTD').renewals.map((r) => ({
    insured: r.insured,
    policy: r.aircraft,
    reg: r.reg,
    producer: r.producer,
    country: r.country,
    days: r.daysLabel,
    href: r.href,
  }));
}
