import { ROUTES } from '@/config/routes';
import { TOTAL_CONFIG_ITEMS } from '@/data/mock/managedCountries';
import { buildCountryConfig } from '@/lib/countries/buildCountryConfig';
import { countryLifecycleStatus } from '@/lib/countries/lifecycle';
import {
  getManagedCountry,
  loadManagedCountries,
  saveManagedCountries,
  upsertManagedCountry,
} from '@/lib/storage/managedCountries';
import type { CountryLifecycleStatus, ManagedCountry } from '@/types/country/manage';

export type ManagedCountryRow = ManagedCountry & {
  status: CountryLifecycleStatus;
  checklist: string;
  pct: number;
  policiesLabel: string;
  editHref: string;
};

export function listManagedCountries(): ManagedCountry[] {
  return loadManagedCountries();
}

export function listManagedCountryRows(
  query: string,
  filter: CountryLifecycleStatus | 'Todos',
): ManagedCountryRow[] {
  const q = query.trim().toLowerCase();
  return loadManagedCountries()
    .filter((c) => {
      const st = countryLifecycleStatus(c);
      if (filter !== 'Todos' && st !== filter) return false;
      if (q && !(c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))) {
        return false;
      }
      return true;
    })
    .map((c) => {
      const status = countryLifecycleStatus(c);
      const pct = Math.round((c.validated / TOTAL_CONFIG_ITEMS) * 100);
      return {
        ...c,
        status,
        checklist: `${c.validated} de ${TOTAL_CONFIG_ITEMS} validados`,
        pct,
        policiesLabel: c.policies === 0 ? '—' : String(c.policies),
        editHref: ROUTES.admin.paisConfig(c.name),
      };
    });
}

export function managedCountriesSummary(countries: ManagedCountry[]) {
  const activeCount = countries.filter(
    (c) => c.active && countryLifecycleStatus(c) === 'Activo',
  ).length;
  const progressCount = countries.filter(
    (c) => c.active && countryLifecycleStatus(c) !== 'Activo',
  ).length;
  const inactive = countries.filter((c) => !c.active).length;
  return [
    `${countries.length} ${countries.length === 1 ? 'país' : 'países'}`,
    `${activeCount} ${activeCount === 1 ? 'activo' : 'activos'}`,
    `${progressCount} en configuración`,
    `${inactive} ${inactive === 1 ? 'inactivo' : 'inactivos'}`,
  ].join(' · ');
}

export function toggleCountryActive(id: number): ManagedCountry | null {
  const list = loadManagedCountries();
  const target = list.find((c) => c.id === id);
  if (!target) return null;
  const next: ManagedCountry = {
    ...target,
    active: !target.active,
    note: target.active ? 'Desactivado 26 ago 2026' : 'Reactivado 26 ago 2026',
  };
  upsertManagedCountry(next);
  return next;
}

export function createManagedCountry(input: {
  name: string;
  code: string;
  currency: string;
  contact: string;
}): ManagedCountry {
  const list = loadManagedCountries();
  const id = Math.max(0, ...list.map((c) => c.id)) + 1;
  const code = (input.code || input.name.slice(0, 2)).toUpperCase().slice(0, 3);
  const currency = (input.currency || '—').toUpperCase();
  const created: ManagedCountry = {
    id,
    name: input.name.trim(),
    code,
    currency,
    currencyLabel: currency === '—' ? '—' : `${currency}`,
    contact: input.contact.trim() || '—',
    validated: 0,
    policies: 0,
    note: 'Creado 26 ago 2026',
    active: true,
  };
  saveManagedCountries([...list, created]);
  return created;
}

export function resolveCountryConfig(pais: string | null) {
  const list = loadManagedCountries();
  const country =
    (pais && getManagedCountry(pais)) ||
    list.find((c) => c.name === 'Panamá') ||
    list[0];
  if (!country) return null;
  return buildCountryConfig(country);
}

export function listManagedCountryNames(): string[] {
  return loadManagedCountries().map((c) => c.name);
}

export function updateCountryMeta(
  name: string,
  meta: { currency?: string; contact?: string; code?: string },
): ManagedCountry | null {
  const c = getManagedCountry(name);
  if (!c) return null;
  const currencyLabel = meta.currency ?? c.currencyLabel;
  const currencyCode = currencyLabel.split('·')[0]?.trim() || c.currency;
  const next: ManagedCountry = {
    ...c,
    currencyLabel,
    currency: meta.code ? c.currency : currencyCode,
    contact: meta.contact ?? c.contact,
    code: meta.code ?? c.code,
  };
  if (meta.code) next.code = meta.code.toUpperCase().slice(0, 3);
  upsertManagedCountry(next);
  return next;
}

export function markCountryFullyValidated(name: string): ManagedCountry | null {
  const c = getManagedCountry(name);
  if (!c) return null;
  const next = {
    ...c,
    validated: TOTAL_CONFIG_ITEMS,
    note: 'Activo desde ago 2026',
    active: true,
  };
  upsertManagedCountry(next);
  return next;
}
