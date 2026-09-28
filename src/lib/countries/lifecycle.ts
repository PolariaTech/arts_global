import { TOTAL_CONFIG_ITEMS } from '@/data/mock/managedCountries';
import type { CountryLifecycleStatus, ManagedCountry } from '@/types/country/manage';

export function countryLifecycleStatus(c: ManagedCountry): CountryLifecycleStatus {
  if (!c.active) return 'Inactivo';
  if (c.validated >= TOTAL_CONFIG_ITEMS) return 'Activo';
  if (c.validated > 0) return 'En progreso';
  return 'No iniciado';
}

export const LIFECYCLE_BADGE: Record<
  CountryLifecycleStatus,
  { bg: string; color: string; border: string; dot: string }
> = {
  Activo: { bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF', dot: '#2F7A45' },
  'En progreso': { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84', dot: '#C9A24A' },
  'No iniciado': { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA', dot: '#A9B2BF' },
  Inactivo: { bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC', dot: '#B4302E' },
};
