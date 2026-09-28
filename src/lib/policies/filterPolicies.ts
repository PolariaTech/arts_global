import { countryToEn } from '@/lib/format/country';
import { parseInputDate, parsePolicyDate } from '@/lib/policies/parsePolicyDate';
import type { PolicyRecord, PolicyStatus } from '@/types/policy/policy';

export type PolicyFilters = {
  query: string;
  country: string;
  status: string;
  from: string;
  to: string;
  insured: string;
  reg: string;
};

export const EMPTY_POLICY_FILTERS: PolicyFilters = {
  query: '',
  country: '',
  status: '',
  from: '',
  to: '',
  insured: '',
  reg: '',
};

export function hasActiveFilters(f: PolicyFilters): boolean {
  return Boolean(f.query || f.country || f.status || f.from || f.to || f.insured || f.reg);
}

export function filterPolicies(
  policies: PolicyRecord[],
  filters: PolicyFilters,
): PolicyRecord[] {
  const q = filters.query.trim().toLowerCase();
  const insured = filters.insured.trim().toLowerCase();
  const reg = filters.reg.trim().toLowerCase();
  const countryEn = filters.country ? countryToEn(filters.country) : '';
  const from = parseInputDate(filters.from);
  const to = parseInputDate(filters.to);
  if (to) to.setHours(23, 59, 59, 999);

  return policies.filter((p) => {
    if (q && ![p.number, p.insured, p.reg].some((v) => v.toLowerCase().includes(q))) {
      return false;
    }
    if (countryEn && countryToEn(p.country) !== countryEn) return false;
    if (filters.status && p.status !== (filters.status as PolicyStatus)) return false;
    if (insured && !p.insured.toLowerCase().includes(insured)) return false;
    if (reg && !p.reg.toLowerCase().includes(reg)) return false;

    if (from || to) {
      const bound = parsePolicyDate(p.date);
      if (!bound) return false;
      if (from && bound < from) return false;
      if (to && bound > to) return false;
    }

    return true;
  });
}
