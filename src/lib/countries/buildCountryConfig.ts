import {
  DOCX_ITEMS,
  TOTAL_CONFIG_ITEMS,
  XLSX_ITEMS,
} from '@/data/mock/managedCountries';
import { countryLifecycleStatus } from '@/lib/countries/lifecycle';
import type {
  ConfigFileItem,
  ConfigItemStatus,
  ConfigMetaItem,
  CountryConfigDetail,
  ManagedCountry,
} from '@/types/country/manage';

const DATES = ['17 ago', '18 ago', '19 ago', '20 ago', '21 ago', '22 ago'];

function fileStatusAt(index: number, validated: number, fileTotal: number): ConfigItemStatus {
  const fileValidated = Math.min(validated, fileTotal);
  const fileRemaining = fileTotal - fileValidated;
  const filePendiente = Math.ceil(fileRemaining / 2);
  if (index < fileValidated) return 'Validado';
  if (index < fileValidated + filePendiente) return 'Pendiente';
  return 'Falta';
}

function fileMeta(
  status: ConfigItemStatus,
  slug: string,
  code: string,
  ext: 'xlsx' | 'docx',
  date: string,
): string {
  const base = `${slug}_${code.toLowerCase()}`;
  if (status === 'Falta') return 'Sin archivo cargado';
  if (status === 'Validado') return `${base}.${ext} · validado ${date}`;
  return `${base}_v2.${ext} · en revisión desde ${date}`;
}

export function buildCountryConfig(country: ManagedCountry): CountryConfigDetail {
  const v = country.validated;
  const fileTotal = XLSX_ITEMS.length + DOCX_ITEMS.length;
  const fileValidated = Math.min(v, fileTotal);
  const metaValidated = Math.max(0, v - fileValidated);
  let idx = 0;

  const xlsx: ConfigFileItem[] = XLSX_ITEMS.map((it, i) => {
    const status = fileStatusAt(idx++, v, fileTotal);
    return {
      key: `xlsx-${it.slug}`,
      name: it.name,
      kind: 'xlsx',
      status,
      meta: fileMeta(status, it.slug, country.code, 'xlsx', DATES[i % DATES.length]),
    };
  });

  const docx: ConfigFileItem[] = DOCX_ITEMS.map((it, i) => {
    const status = fileStatusAt(idx++, v, fileTotal);
    return {
      key: `docx-${it.slug}`,
      name: it.name,
      kind: 'docx',
      status,
      meta: fileMeta(status, it.slug, country.code, 'docx', DATES[(i + 3) % DATES.length]),
    };
  });

  const meta: ConfigMetaItem[] = [
    {
      key: 'currency',
      name: 'Moneda',
      status: metaValidated >= 1 ? 'Validado' : 'Pendiente',
      meta: 'ISO 4217 · confirmada con suscripción',
      value: country.currencyLabel,
      placeholder: 'Código ISO',
    },
    {
      key: 'contact',
      name: 'Contacto del país',
      status: metaValidated >= 2 ? 'Validado' : 'Pendiente',
      meta: 'Responsable operativo local',
      value: country.contact,
      placeholder: 'Nombre y correo',
    },
    {
      key: 'code',
      name: 'Código de país',
      status: metaValidated >= 3 ? 'Validado' : 'Pendiente',
      meta: 'Prefijo de numeración de pólizas',
      value: country.code,
      placeholder: 'Ej. PA',
    },
  ];

  return {
    country,
    lifecycle: countryLifecycleStatus(country),
    xlsx,
    docx,
    meta,
  };
}

export { TOTAL_CONFIG_ITEMS };
