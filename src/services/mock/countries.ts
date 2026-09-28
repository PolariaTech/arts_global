import { COUNTRY_NAMES, COUNTRY_STATS } from '@/data/mock/countries';
import type { CountryStat } from '@/types/country/country';
import {
  getPortfolioDashboard,
  listPortfolioCountries as portfolioCountries,
  listPortfolioRenewals as portfolioRenewals,
} from './portfolio';

export type { PortfolioCountryRow } from './portfolio';

export function listCountryNames(): readonly string[] {
  return COUNTRY_NAMES;
}

export function listCountryStats(): CountryStat[] {
  return COUNTRY_STATS;
}

export function listPortfolioCountries() {
  return portfolioCountries();
}

export function getCountryStat(codeOrName: string): CountryStat | undefined {
  const key = codeOrName.trim().toLowerCase();
  return COUNTRY_STATS.find(
    (c) => c.code.toLowerCase() === key || c.name.toLowerCase() === key,
  );
}

/** Renovaciones próximas (muestra del mockup de portafolio). */
export function listPortfolioRenewals() {
  return portfolioRenewals();
}

export { getPortfolioDashboard };
