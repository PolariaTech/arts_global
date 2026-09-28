import { MANAGED_COUNTRIES_SEED } from '@/data/mock/managedCountries';
import type { ManagedCountry } from '@/types/country/manage';

const KEY = 'arts.countries.v1';

function cloneSeed(): ManagedCountry[] {
  return MANAGED_COUNTRIES_SEED.map((c) => ({ ...c }));
}

export function loadManagedCountries(): ManagedCountry[] {
  if (typeof window === 'undefined') return cloneSeed();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return cloneSeed();
    const parsed = JSON.parse(raw) as ManagedCountry[];
    if (!Array.isArray(parsed) || parsed.length === 0) return cloneSeed();
    return parsed;
  } catch {
    return cloneSeed();
  }
}

export function saveManagedCountries(countries: ManagedCountry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(countries));
  } catch {
    /* ignore */
  }
}

export function getManagedCountry(name: string): ManagedCountry | undefined {
  return loadManagedCountries().find((c) => c.name === name);
}

export function upsertManagedCountry(country: ManagedCountry): ManagedCountry[] {
  const list = loadManagedCountries();
  const idx = list.findIndex((c) => c.id === country.id);
  const next =
    idx >= 0
      ? list.map((c) => (c.id === country.id ? country : c))
      : [...list, country];
  saveManagedCountries(next);
  return next;
}
