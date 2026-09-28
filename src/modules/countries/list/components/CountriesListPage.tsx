'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LIFECYCLE_BADGE } from '@/lib/countries/lifecycle';
import {
  createManagedCountry,
  listManagedCountries,
  listManagedCountryRows,
  managedCountriesSummary,
  toggleCountryActive,
} from '@/services/mock/managedCountries';
import type { CountryLifecycleStatus } from '@/types/country/manage';
import { NewCountryPanel } from './NewCountryPanel';

const TABS: Array<CountryLifecycleStatus | 'Todos'> = [
  'Todos',
  'Activo',
  'En progreso',
  'No iniciado',
  'Inactivo',
];

const GRID =
  'minmax(180px,1.2fr) minmax(88px,.52fr) minmax(150px,.9fr) minmax(190px,1.15fr) minmax(102px,.6fr) minmax(158px,.95fr)';

const BLANK = { name: '', code: '', currency: '', contact: '' };

export function CountriesListPage() {
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CountryLifecycleStatus | 'Todos'>('Todos');
  const [focus, setFocus] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [toast, setToast] = useState('');

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const countries = useMemo(() => listManagedCountries(), [tick]);
  const rows = useMemo(
    () => listManagedCountryRows(query, filter),
    [query, filter, tick],
  );
  const summary = useMemo(() => managedCountriesSummary(countries), [countries]);

  function flash(text: string) {
    setToast(text);
  }

  function onToggle(id: number, name: string, active: boolean) {
    toggleCountryActive(id);
    refresh();
    flash(
      active
        ? `${name} desactivado · se conserva el historial de pólizas`
        : `${name} reactivado · emisión habilitada`,
    );
  }

  function onSave() {
    if (!form.name.trim()) {
      setPanelOpen(false);
      return;
    }
    const created = createManagedCountry(form);
    setPanelOpen(false);
    setForm(BLANK);
    refresh();
    flash(`${created.name} creado · 16 elementos por validar`);
  }

  return (
    <>
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-6">
        <div
          className="mx-auto flex flex-wrap items-end justify-between gap-5"
          style={{ maxWidth: 'min(1680px, 94vw)' }}
        >
          <div>
            <h1 className="m-0 mb-[5px] text-[22px] font-semibold tracking-tight text-[#0F1E33]">
              Gestión de países
            </h1>
            <p className="m-0 text-[13.5px] text-[#6B7483]">{summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="pointer-events-none absolute top-[13px] left-[13px]"
              >
                <circle
                  cx="6.6"
                  cy="6.6"
                  r="4.8"
                  fill="none"
                  stroke="#8A93A1"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.4 10.4 L14.2 14.2"
                  stroke="#8A93A1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocus('query')}
                onBlur={() => setFocus(null)}
                placeholder="Buscar país…"
                className={`h-10 w-[216px] rounded-[3px] border bg-white pr-3 pl-[38px] text-[13.5px] text-[#14181F] outline-none ${
                  focus === 'query'
                    ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
                    : 'border-[#C8CFD9]'
                }`}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setForm(BLANK);
                setPanelOpen(true);
              }}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[3px] border-0 bg-[#C9A24A] px-[18px] text-sm font-semibold tracking-wide text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
            >
              <span className="text-lg leading-none">+</span>
              Nuevo país
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-[#F7F8FA] px-6 pt-5 pb-[100px]">
        <div
          className="mx-auto flex flex-col gap-3.5"
          style={{ maxWidth: 'min(1680px, 94vw)' }}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            {TABS.map((t) => {
              const on = filter === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  className="inline-flex h-[34px] cursor-pointer items-center rounded-[3px] border px-3.5 text-[13px] transition-colors"
                  style={{
                    fontWeight: on ? 600 : 500,
                    background: on ? '#0F1E33' : '#FFFFFF',
                    color: on ? '#FFFFFF' : '#5C6675',
                    borderColor: on ? '#0F1E33' : '#D8DDE5',
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[1040px] gap-x-4 gap-y-3 border-b border-[#E4E8EE] bg-[#FAFBFC] px-[22px] py-3"
                style={{ gridTemplateColumns: GRID }}
              >
                {['País', 'Moneda', 'Estado', 'Configuración', 'Pólizas', 'Acciones'].map(
                  (h) => (
                    <span
                      key={h}
                      className={`text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase ${
                        h === 'Pólizas' || h === 'Acciones' ? 'text-right' : ''
                      }`}
                    >
                      {h}
                    </span>
                  ),
                )}
              </div>

              {rows.map((c, i) => {
                const b = LIFECYCLE_BADGE[c.status];
                return (
                  <div
                    key={c.id}
                    className="grid min-w-[1040px] gap-x-4 gap-y-3 px-[22px] py-[13px] transition-colors hover:bg-[#FAFBFC]"
                    style={{
                      gridTemplateColumns: GRID,
                      borderBottom: i === rows.length - 1 ? 'none' : '1px solid #F0F2F6',
                      opacity: c.active ? 1 : 0.72,
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-[11px]">
                      <span
                        className="flex h-[26px] w-[34px] shrink-0 items-center justify-center rounded-[2px] text-[11px] font-bold tracking-wide"
                        style={{
                          background: c.active ? '#0F1E33' : '#E4E8EE',
                          color: c.active ? '#C9A24A' : '#8A93A1',
                        }}
                      >
                        {c.code}
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-medium leading-snug text-[#14181F]">
                          {c.name}
                        </span>
                        <span className="text-xs text-[#9AA3AE]">{c.note}</span>
                      </div>
                    </div>
                    <span className="self-center text-[13.5px] font-medium text-[#3B4553]">
                      {c.currency}
                    </span>
                    <span
                      className="inline-flex items-center gap-[7px] self-center justify-self-start rounded-[3px] border px-2.5 py-[5px] text-[11.5px] font-semibold tracking-wide whitespace-nowrap"
                      style={{
                        background: b.bg,
                        color: b.color,
                        borderColor: b.border,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: b.dot }} />
                      {c.status}
                    </span>
                    <div className="flex flex-col gap-1.5 self-center">
                      <div className="flex items-baseline justify-between gap-2.5">
                        <span className="text-[12.5px] text-[#6B7483] tabular-nums">
                          {c.checklist}
                        </span>
                        <span className="text-xs font-semibold text-[#0F1E33] tabular-nums">
                          {c.pct}%
                        </span>
                      </div>
                      <span className="block h-1 overflow-hidden rounded-sm bg-[#EDF0F4]">
                        <span
                          className="block h-full rounded-sm"
                          style={{
                            width: `${c.pct}%`,
                            background: c.pct === 100 ? '#2F7A45' : '#C9A24A',
                          }}
                        />
                      </span>
                    </div>
                    <span className="self-center text-right text-[13.5px] font-semibold text-[#14181F] tabular-nums">
                      {c.policiesLabel}
                    </span>
                    <div className="flex items-center justify-end gap-3.5 self-center">
                      <Link
                        href={c.editHref}
                        className="border-b border-[#C9A24A] text-[13px] font-medium whitespace-nowrap text-[#0F1E33] no-underline hover:border-[#8A6E22] hover:text-[#8A6E22]"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => onToggle(c.id, c.name, c.active)}
                        className="cursor-pointer border-0 border-b bg-transparent p-0 text-[13px] font-medium whitespace-nowrap"
                        style={{
                          color: c.active ? '#8E2B29' : '#245F35',
                          borderBottomColor: c.active ? '#E9BDBC' : '#B5D8BF',
                        }}
                      >
                        {c.active ? 'Desactivar' : 'Reactivar'}
                      </button>
                    </div>
                  </div>
                );
              })}

              {rows.length === 0 ? (
                <div className="min-w-[1040px] px-6 py-[52px] text-center">
                  <p className="m-0 mb-1 text-[14.5px] font-medium text-[#3B4553]">Sin países</p>
                  <p className="m-0 text-[13px] text-[#8A93A1]">
                    Ajuste la búsqueda o el filtro de estado.
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <p className="m-0 text-[12.5px] leading-relaxed text-[#8A93A1]">
            Los países no se eliminan. Al desactivar se detiene la emisión de nuevas pólizas; las
            pólizas vigentes, su historial y sus documentos se conservan para auditoría.
          </p>
        </div>
      </main>

      {panelOpen ? (
        <NewCountryPanel
          form={form}
          focus={focus}
          onChange={(key, value) => setForm((f) => ({ ...f, [key]: value }))}
          onFocus={setFocus}
          onBlur={() => setFocus(null)}
          onClose={() => setPanelOpen(false)}
          onSave={onSave}
        />
      ) : null}

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
