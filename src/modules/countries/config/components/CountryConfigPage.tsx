'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ROUTES } from '@/config/routes';
import { TOTAL_CONFIG_ITEMS } from '@/data/mock/managedCountries';
import { LIFECYCLE_BADGE } from '@/lib/countries/lifecycle';
import {
  listManagedCountryNames,
  markCountryFullyValidated,
  resolveCountryConfig,
  updateCountryMeta,
} from '@/services/mock/managedCountries';
import type { ConfigItemStatus } from '@/types/country/manage';
import { CountryConfigSkeleton } from '@/components/shared/skeleton';

const ITEM_BADGE: Record<
  ConfigItemStatus,
  { label: string; bg: string; color: string; border: string; dot: string }
> = {
  Falta: {
    label: 'Falta',
    bg: '#F0F2F6',
    color: '#5C6675',
    border: '#E0E4EA',
    dot: '#A9B2BF',
  },
  Pendiente: {
    label: 'Pendiente de validación',
    bg: '#FBF6EA',
    color: '#6B5A2E',
    border: '#E8CE84',
    dot: '#C9A24A',
  },
  Validado: {
    label: 'Validado',
    bg: '#EDF6EF',
    color: '#245F35',
    border: '#B5D8BF',
    dot: '#2F7A45',
  },
  Rechazado: {
    label: 'Rechazado',
    bg: '#FDF2F2',
    color: '#8E2B29',
    border: '#E9BDBC',
    dot: '#B4302E',
  },
};

const ROW_GRID = 'minmax(240px,1.6fr) minmax(190px,1.05fr) minmax(172px,.95fr)';

export function CountryConfigPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paisParam = searchParams.get('pais');

  const [hydrated, setHydrated] = useState(false);
  const [countryName, setCountryName] = useState('Panamá');
  const [meta, setMeta] = useState({ currency: '', contact: '', code: '' });
  const [focus, setFocus] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const detail = resolveCountryConfig(paisParam);
    if (!detail) return;
    setCountryName(detail.country.name);
    setMeta({
      currency: detail.country.currencyLabel,
      contact: detail.country.contact,
      code: detail.country.code,
    });
  }, [hydrated, paisParam, tick]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const detail = useMemo(
    () => (hydrated ? resolveCountryConfig(countryName) : null),
    [hydrated, countryName, tick],
  );

  const names = useMemo(
    () => (hydrated ? listManagedCountryNames() : []),
    [hydrated, tick],
  );

  if (!hydrated || !detail) {
    return <CountryConfigSkeleton />;
  }

  const allItems = [...detail.xlsx, ...detail.docx, ...detail.meta];
  const count = (s: ConfigItemStatus) => allItems.filter((i) => i.status === s).length;
  const validated = count('Validado');
  const pct = Math.round((validated / TOTAL_CONFIG_ITEMS) * 100);
  const lifecycle = detail.lifecycle;
  const cb = LIFECYCLE_BADGE[lifecycle];
  const fullyActive = lifecycle === 'Activo';

  type RowItem =
    | {
        key: string;
        name: string;
        status: ConfigItemStatus;
        meta: string;
        isFile: true;
      }
    | {
        key: 'currency' | 'contact' | 'code';
        name: string;
        status: ConfigItemStatus;
        meta: string;
        isFile: false;
        value: string;
        placeholder: string;
      };

  const groups: { title: string; hint: string; items: RowItem[] }[] = [
    {
      title: 'Datos estructurados · Excel',
      hint: '.xlsx · plantillas ARTS v4',
      items: detail.xlsx.map((it) => ({
        key: it.key,
        name: it.name,
        status: it.status,
        meta: it.meta,
        isFile: true,
      })),
    },
    {
      title: 'Documentos · Word',
      hint: '.docx · membrete del país',
      items: detail.docx.map((it) => ({
        key: it.key,
        name: it.name,
        status: it.status,
        meta: it.meta,
        isFile: true,
      })),
    },
    {
      title: 'Metadatos',
      hint: 'Campos editables en línea',
      items: detail.meta.map((it) => ({
        key: it.key,
        name: it.name,
        status: it.status,
        meta: it.meta,
        isFile: false,
        value: meta[it.key],
        placeholder: it.placeholder,
      })),
    },
  ];

  function onCountryChange(next: string) {
    setCountryName(next);
    router.replace(ROUTES.admin.paisConfig(next));
  }

  function onUpload(name: string) {
    setToast(`Carga simulada · ${name}`);
  }

  function onSave() {
    updateCountryMeta(countryName, meta);
    setTick((t) => t + 1);
    setToast('Cambios guardados');
  }

  function onActivate() {
    if (validated < TOTAL_CONFIG_ITEMS) return;
    markCountryFullyValidated(countryName);
    setTick((t) => t + 1);
    setToast(`${countryName} activado · listo para emisión`);
  }

  return (
    <>
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-6">
        <div
          className="mx-auto flex flex-col gap-[18px]"
          style={{ maxWidth: 'min(1568px, 94vw)' }}
        >
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href={ROUTES.admin.paises}
              className="inline-flex h-10 items-center gap-2 rounded-[3px] border border-[#C2C9D3] bg-white px-4 text-[13.5px] font-semibold whitespace-nowrap text-[#0F1E33] no-underline hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
            >
              <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden="true" className="shrink-0">
                <path
                  d="M6 1 L1 6 L6 11"
                  fill="none"
                  stroke="#0F1E33"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.4 6 H13"
                  stroke="#0F1E33"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              Todos los países
            </Link>
            <nav className="flex flex-wrap items-center gap-2 text-[12.5px]">
              <Link
                href={ROUTES.admin.paises}
                className="text-[#5C6675] no-underline hover:text-[#0F1E33]"
              >
                Gestión de países
              </Link>
              <span className="text-[#C2C9D3]">/</span>
              <span className="font-semibold text-[#0F1E33]">{countryName}</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[11.5px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                Configuración de país
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <select
                    value={countryName}
                    onChange={(e) => onCountryChange(e.target.value)}
                    className="h-11 min-w-[200px] cursor-pointer appearance-none rounded-[3px] border border-[#C8CFD9] bg-white py-0 pr-10 pl-3.5 text-[19px] font-semibold tracking-tight text-[#0F1E33] outline-none"
                  >
                    {names.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 right-3.5"
                  >
                    <path
                      d="M1 1 L5 5 L9 1"
                      fill="none"
                      stroke="#0F1E33"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-[13px] py-[7px] text-[11.5px] font-semibold tracking-wider uppercase"
                  style={{
                    background: cb.bg,
                    color: cb.color,
                    borderColor: cb.border,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: cb.dot }} />
                  {lifecycle}
                </span>
              </div>
            </div>

            <div className="flex min-w-[260px] max-w-[360px] flex-1 flex-col gap-[7px]">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] text-[#6B7483]">
                  {validated} de {TOTAL_CONFIG_ITEMS} elementos validados
                </span>
                <span className="text-[12.5px] font-semibold text-[#0F1E33] tabular-nums">
                  {pct}%
                </span>
              </div>
              <span className="block h-1 overflow-hidden rounded-sm bg-[#EDF0F4]">
                <span
                  className="block h-full rounded-sm bg-[#C9A24A]"
                  style={{ width: `${pct}%` }}
                />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-[22px]">
            {(
              [
                ['Validado', count('Validado'), 'validados'],
                ['Pendiente', count('Pendiente'), 'pendientes'],
                ['Rechazado', count('Rechazado'), 'rechazados'],
                ['Falta', count('Falta'), 'faltantes'],
              ] as const
            ).map(([key, n, label]) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 text-[12.5px] text-[#5C6675]"
              >
                <span
                  className="h-2 w-2 rounded-[2px]"
                  style={{ background: ITEM_BADGE[key].dot }}
                />
                {n} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 bg-[#F7F8FA] px-6 pt-[22px] pb-[100px]">
        <div
          className="mx-auto flex flex-col gap-[18px]"
          style={{ maxWidth: 'min(1568px, 94vw)' }}
        >
          {groups.map((g) => (
            <section
              key={g.title}
              className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] px-6 pt-[18px] pb-[15px]">
                <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
                  {g.title}
                </h2>
                <span className="text-xs text-[#9AA3AE]">{g.hint}</span>
              </div>

              {g.items.map((it, i) => {
                const badge = ITEM_BADGE[it.status];
                const last = i === g.items.length - 1;
                return (
                  <div
                    key={it.key}
                    className="grid gap-x-[18px] gap-y-3 px-6 py-3.5 hover:bg-[#FAFBFC]"
                    style={{
                      gridTemplateColumns: ROW_GRID,
                      borderBottom: last ? 'none' : '1px solid #F0F2F6',
                    }}
                  >
                    <div className="flex min-w-0 flex-col gap-[3px]">
                      <span className="text-[14.5px] font-medium leading-snug text-[#14181F] text-pretty">
                        {it.name}
                      </span>
                      <span className="text-xs leading-snug text-[#8A93A1] text-pretty">
                        {it.meta}
                      </span>
                    </div>

                    <div className="self-start">
                      {it.isFile ? (
                        <button
                          type="button"
                          onClick={() => onUpload(it.name)}
                          className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-[3px] border border-dashed border-[#C2C9D3] bg-white px-3.5 text-[13px] font-semibold whitespace-nowrap text-[#0F1E33] hover:border-[#C9A24A] hover:bg-[#FDFBF6]"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 14 14"
                            aria-hidden="true"
                            className="shrink-0"
                          >
                            <path
                              d="M7 10.4 V2.6"
                              stroke="#0F1E33"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4 5.4 L7 2.4 L10 5.4"
                              fill="none"
                              stroke="#0F1E33"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.2 11.6 H11.8"
                              stroke="#0F1E33"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                          {it.status === 'Falta' ? 'Cargar archivo' : 'Reemplazar'}
                        </button>
                      ) : (
                        <input
                          value={it.value}
                          onChange={(e) => {
                            const key = it.key;
                            setMeta((m) => ({ ...m, [key]: e.target.value }));
                          }}
                          onFocus={() => setFocus(it.key)}
                          onBlur={() => setFocus(null)}
                          placeholder={it.placeholder}
                          className={`h-[38px] w-full rounded-[3px] border bg-white px-3 text-[13.5px] text-[#14181F] outline-none ${
                            focus === it.key
                              ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
                              : 'border-[#C8CFD9]'
                          }`}
                        />
                      )}
                    </div>

                    <span
                      className="inline-flex items-start gap-[7px] self-start justify-self-start rounded-[3px] border px-2.5 py-[5px] text-[11.5px] font-semibold tracking-wide"
                      style={{
                        background: badge.bg,
                        color: badge.color,
                        borderColor: badge.border,
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </section>
          ))}

          {fullyActive ? (
            <div className="flex items-center gap-3 rounded border border-[#B5D8BF] border-l-4 border-l-[#2F7A45] bg-[#EDF6EF] px-[18px] py-4">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
                <circle
                  cx="9"
                  cy="9"
                  r="8"
                  fill="none"
                  stroke="#2F7A45"
                  strokeWidth="1.4"
                />
                <path
                  d="M5.2 9.2 L7.8 11.8 L12.8 6.4"
                  fill="none"
                  stroke="#2F7A45"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[13.5px] leading-relaxed text-[#245F35]">
                País activo · {detail.country.note} · los {TOTAL_CONFIG_ITEMS} elementos están
                validados.
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap-reverse items-center justify-between gap-4">
              <span className="max-w-[420px] text-[12.5px] leading-relaxed text-[#8A93A1]">
                La activación requiere que los {TOTAL_CONFIG_ITEMS} elementos estén validados.
                Faltan {TOTAL_CONFIG_ITEMS - validated}.
              </span>
              <div className="ml-auto flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onSave}
                  className="inline-flex h-12 cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-6 text-[15px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  disabled={validated < TOTAL_CONFIG_ITEMS}
                  onClick={onActivate}
                  className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-[3px] border px-8 text-[15px] font-semibold tracking-wide whitespace-nowrap disabled:cursor-not-allowed"
                  style={
                    validated < TOTAL_CONFIG_ITEMS
                      ? {
                          borderColor: '#E0E4EA',
                          background: '#F0F2F6',
                          color: '#A9B2BF',
                        }
                      : {
                          borderColor: '#C9A24A',
                          background: '#C9A24A',
                          color: '#0F1E33',
                          cursor: 'pointer',
                        }
                  }
                >
                  Activar país
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {toast ? (
        <div className="fixed bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-[11px] rounded border-l-[3px] border-l-[#C9A24A] bg-[#0F1E33] px-5 py-3.5 shadow-[0_8px_28px_rgba(15,30,51,.28)]">
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
            <path
              d="M3 8.6 L6.2 11.8 L13 4.6"
              fill="none"
              stroke="#C9A24A"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[13.5px] leading-snug text-white">{toast}</span>
        </div>
      ) : null}
    </>
  );
}
