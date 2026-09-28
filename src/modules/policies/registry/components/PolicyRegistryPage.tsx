'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/auth/AuthProvider';
import {
  listCountryFilterOptions,
  POLICY_STATUS_OPTIONS,
  type PolicyRegistryMode,
} from '@/services/mock/policies';
import { RegistryStatusBadge } from './RegistryStatusBadge';
import { usePolicyRegistry } from '../hooks/usePolicyRegistry';

type PolicyRegistryPageProps = {
  mode: PolicyRegistryMode;
};

const GRID =
  'minmax(150px,.9fr) minmax(190px,1.6fr) minmax(158px,1fr) minmax(94px,.58fr) minmax(128px,.8fr) minmax(126px,.8fr) minmax(108px,.66fr)';

function fieldClass(focused: boolean, extra = '') {
  return [
    'h-10 w-full rounded-[3px] border bg-white px-3 text-[13.5px] text-[#14181F] outline-none transition-[border-color,box-shadow] duration-100',
    focused
      ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
      : 'border-[#C8CFD9]',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}

export function PolicyRegistryPage({ mode }: PolicyRegistryPageProps) {
  const { session } = useAuth();
  const producerName = session?.displayName ?? 'J. Salgado';
  const {
    filters,
    setFilter,
    clearFilters,
    focus,
    setFocus,
    rows,
    resultCount,
    baseCount,
    hasFilters,
    exportRegistry,
    toast,
  } = usePolicyRegistry(mode, producerName);

  const title = mode === 'producer' ? 'Mis pólizas' : 'Registro de pólizas';
  const subtitle =
    mode === 'producer'
      ? `${producerName} · Panamá · ${baseCount} pólizas asignadas`
      : 'Acceso total · todos los países y producers';

  const countries = listCountryFilterOptions();

  return (
    <>
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-6">
        <div
          className="mx-auto flex flex-col gap-[18px]"
          style={{ maxWidth: 'min(1680px, 94vw)' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="m-0 mb-[5px] text-[22px] font-semibold tracking-tight text-[#0F1E33]">
                {title}
              </h1>
              <p className="m-0 text-[13.5px] text-[#6B7483]">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={exportRegistry}
              className="inline-flex h-10 cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-[18px] text-[13.5px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
            >
              Exportar registro
            </button>
          </div>

          <div className="relative">
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="pointer-events-none absolute top-[15px] left-[15px]"
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
              value={filters.query}
              onChange={(e) => setFilter('query', e.target.value)}
              onFocus={() => setFocus('search')}
              onBlur={() => setFocus(null)}
              placeholder="Buscar por número de póliza, asegurado o matrícula…"
              className={fieldClass(focus === 'search', 'h-[46px] pl-[42px] text-[14.5px]')}
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(178px,1fr))] gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                País
              </span>
              <div className="relative">
                <select
                  value={filters.country}
                  onChange={(e) => setFilter('country', e.target.value)}
                  className={fieldClass(false, 'cursor-pointer appearance-none pr-8')}
                >
                  <option value="">Todos</option>
                  {countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[17px] right-[13px]"
                >
                  <path
                    d="M1 1 L5 5 L9 1"
                    fill="none"
                    stroke="#5C6675"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                Estado
              </span>
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => setFilter('status', e.target.value)}
                  className={fieldClass(false, 'cursor-pointer appearance-none pr-8')}
                >
                  <option value="">Todos</option>
                  {POLICY_STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[17px] right-[13px]"
                >
                  <path
                    d="M1 1 L5 5 L9 1"
                    fill="none"
                    stroke="#5C6675"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                Desde
              </span>
              <input
                type="date"
                value={filters.from}
                onChange={(e) => setFilter('from', e.target.value)}
                onFocus={() => setFocus('from')}
                onBlur={() => setFocus(null)}
                className={fieldClass(focus === 'from', 'cursor-pointer')}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                Hasta
              </span>
              <input
                type="date"
                value={filters.to}
                onChange={(e) => setFilter('to', e.target.value)}
                onFocus={() => setFocus('to')}
                onBlur={() => setFocus(null)}
                className={fieldClass(focus === 'to', 'cursor-pointer')}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                Asegurado
              </span>
              <input
                value={filters.insured}
                onChange={(e) => setFilter('insured', e.target.value)}
                onFocus={() => setFocus('insured')}
                onBlur={() => setFocus(null)}
                placeholder="Nombre"
                className={fieldClass(focus === 'insured')}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
                Matrícula
              </span>
              <input
                value={filters.reg}
                onChange={(e) => setFilter('reg', e.target.value.toUpperCase())}
                onFocus={() => setFocus('reg')}
                onBlur={() => setFocus(null)}
                placeholder={mode === 'producer' ? 'Ej. HP4677' : 'Ej. HK4677'}
                className={fieldClass(
                  focus === 'reg',
                  'tracking-wide uppercase',
                )}
              />
            </label>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-[#F7F8FA] px-6 pt-5 pb-[100px]">
        <div
          className="mx-auto flex flex-col gap-3.5"
          style={{ maxWidth: 'min(1680px, 94vw)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[13px] text-[#6B7483]">{resultCount}</span>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-[34px] cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-3.5 text-[12.5px] font-medium text-[#0F1E33] hover:border-[#0F1E33]"
              >
                Limpiar filtros
              </button>
            ) : null}
          </div>

          <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[1080px] gap-x-4 gap-y-3 border-b border-[#E4E8EE] bg-[#FAFBFC] px-[22px] py-3"
                style={{ gridTemplateColumns: GRID }}
              >
                {[
                  'Número de póliza',
                  'Asegurado',
                  'Aeronave / Matrícula',
                  'País',
                  'Estado',
                  'Prima',
                  'Vinculación',
                ].map((h) => (
                  <span
                    key={h}
                    className={`text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase ${h === 'Prima' ? 'text-right' : ''}`}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {rows.map((p, i) => (
                <Link
                  key={`${p.number}-${p.reg}-${i}`}
                  href={p.href}
                  className="grid min-w-[1080px] gap-x-4 gap-y-3 px-[22px] py-[13px] text-inherit no-underline transition-colors duration-100 hover:bg-[#FAFBFC]"
                  style={{
                    gridTemplateColumns: GRID,
                    borderBottom: i === rows.length - 1 ? 'none' : '1px solid #F0F2F6',
                  }}
                >
                  <span className="self-center text-[13.5px] font-semibold tracking-wide text-[#0F1E33] tabular-nums">
                    {p.number}
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5 self-center">
                    <span className="text-sm font-medium leading-snug text-[#14181F] text-pretty">
                      {p.insured}
                    </span>
                    <span className="text-xs leading-snug text-[#8A93A1]">{p.producer}</span>
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5 self-center">
                    <span className="text-[13.5px] leading-snug text-[#3B4553]">
                      {p.aircraft.trim() || '—'}
                    </span>
                    <span className="text-[12.5px] font-semibold tracking-wide text-[#6B7483]">
                      {p.reg}
                    </span>
                  </div>
                  <span className="self-center text-[13.5px] text-[#3B4553]">
                    {p.countryLabel}
                  </span>
                  <RegistryStatusBadge status={p.status} />
                  <span className="self-center text-right text-[13.5px] font-medium whitespace-nowrap text-[#14181F] tabular-nums">
                    {p.premium}
                  </span>
                  <span className="self-center text-[13px] whitespace-nowrap text-[#5C6675]">
                    {p.date}
                  </span>
                </Link>
              ))}

              {rows.length === 0 ? (
                <div className="min-w-[1080px] px-6 py-14 text-center">
                  <p className="m-0 mb-1 text-[14.5px] font-medium text-[#3B4553]">
                    Sin resultados
                  </p>
                  <p className="m-0 text-[13px] text-[#8A93A1]">
                    Ajuste la búsqueda o los filtros aplicados.
                  </p>
                </div>
              ) : null}
            </div>
          </section>
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
