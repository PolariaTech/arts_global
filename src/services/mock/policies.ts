import { POLICIES } from '@/data/mock/policies';
import type { PolicyRecord, PolicyStatus } from '@/types/policy/policy';
import { countryToEn, countryToEs } from '@/lib/format/country';
import {
  filterPolicies,
  type PolicyFilters,
} from '@/lib/policies/filterPolicies';
import { ROUTES } from '@/config/routes';

export type PolicyRegistryMode = 'producer' | 'admin';

export type PolicyListRow = PolicyRecord & {
  countryLabel: string;
  href: string;
};

const COUNTRY_FILTER_OPTIONS = [
  { value: 'Panama', label: 'Panamá' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'Dominican Republic', label: 'República Dominicana' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Peru', label: 'Perú' },
  { value: 'Bolivia', label: 'Bolivia' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Paraguay', label: 'Paraguay' },
  { value: 'Venezuela', label: 'Venezuela' },
] as const;

export const POLICY_STATUS_OPTIONS: PolicyStatus[] = [
  'Vinculada',
  'Endosada',
  'Renovada',
  'Cancelada',
  'Vencida',
];

export function listCountryFilterOptions() {
  return COUNTRY_FILTER_OPTIONS;
}

export function listPolicies(): PolicyRecord[] {
  return POLICIES;
}

export function getPolicyByNumber(number: string): PolicyRecord | undefined {
  return POLICIES.find((p) => p.number === number);
}

export function listPoliciesByProducer(producer: string): PolicyRecord[] {
  const key = producer.trim().toLowerCase();
  return POLICIES.filter((p) => p.producer.toLowerCase() === key);
}

export function listPoliciesByCountry(country: string): PolicyRecord[] {
  const en = countryToEn(country);
  const es = countryToEs(country);
  return POLICIES.filter((p) => p.country === en || p.country === es || p.country === country);
}

export function countPoliciesByStatus(status: PolicyStatus): number {
  return POLICIES.filter((p) => p.status === status).length;
}

export function policyCount(): number {
  return POLICIES.length;
}

export function listRegistryPolicies(
  mode: PolicyRegistryMode,
  producerName?: string,
): PolicyRecord[] {
  if (mode === 'producer' && producerName) {
    return listPoliciesByProducer(producerName);
  }
  return POLICIES;
}

export function filterRegistryPolicies(
  mode: PolicyRegistryMode,
  filters: PolicyFilters,
  producerName?: string,
): PolicyListRow[] {
  const base = listRegistryPolicies(mode, producerName);
  const detailHref =
    mode === 'producer' ? ROUTES.producer.polizaDetalle : ROUTES.admin.polizaDetalle;

  return filterPolicies(base, filters).map((p) => ({
    ...p,
    countryLabel: countryToEs(p.country),
    href: detailHref(p.number),
  }));
}

export function exportPoliciesCsv(rows: PolicyListRow[], filename: string): void {
  if (typeof window === 'undefined') return;
  const header = [
    'Número',
    'Certificado',
    'Asegurado',
    'Producer',
    'Aeronave',
    'Matrícula',
    'País',
    'Estado',
    'Prima',
    'Vinculación',
  ];
  const lines = [
    header.join(','),
    ...rows.map((r) =>
      [
        r.number,
        r.certificate,
        r.insured,
        r.producer,
        r.aircraft,
        r.reg,
        r.countryLabel,
        r.status,
        r.premium,
        r.date,
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(','),
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
