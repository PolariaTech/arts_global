'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/shared/module/PageHeader';
import { PageMain } from '@/components/shared/module/PageMain';
import { StatCard } from '@/components/shared/cards/StatCard';
import { listCountryNames } from '@/services/mock/countries';
import {
  AUDIT_ACTION_FILTERS,
  EMPTY_AUDIT_FILTERS,
  auditEventCount,
  exportAuditEventsCsv,
  filterAuditEvents,
  getAuditKpis,
  hasAuditFilters,
  listAuditUserNames,
  type AuditFilters,
} from '@/services/mock/audit';
import { AuditActionBadge } from './AuditActionBadge';

const GRID =
  'minmax(150px,.9fr) minmax(155px,1fr) minmax(94px,.58fr) minmax(136px,.85fr) minmax(215px,1.7fr)';

export function AuditHistoryPage() {
  const [filters, setFilters] = useState<AuditFilters>(EMPTY_AUDIT_FILTERS);
  const [focus, setFocus] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const kpis = useMemo(() => getAuditKpis(), []);
  const countryOptions = useMemo(() => listCountryNames(), []);
  const userOptions = useMemo(() => listAuditUserNames(), []);
  const total = auditEventCount();

  const rows = useMemo(() => filterAuditEvents(filters), [filters]);
  const activeFilters = hasAuditFilters(filters);

  function setFilter<K extends keyof AuditFilters>(key: K, value: AuditFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function onExport() {
    const stamp = new Date().toISOString().slice(0, 10);
    exportAuditEventsCsv(rows, `historial-auditoria-${stamp}.csv`);
    setToast(`Exportación lista · ${rows.length} eventos`);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <>
      <PageHeader
        title="Historial de auditoría"
        subtitle={`${total} eventos registrados · alcance: todos los países`}
        maxWidth="min(1680px, 94vw)"
        actions={
          <button
            type="button"
            onClick={onExport}
            className="h-10 cursor-pointer rounded-[3px] border border-[#C2C9D3] bg-white px-[18px] text-[13.5px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
          >
            Exportar registro
          </button>
        }
        below={
          <div className="flex flex-col gap-[18px]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
              {kpis.map((k) => (
                <StatCard
                  key={k.label}
                  value={k.value}
                  label={k.label}
                  note={k.note}
                  accent={k.accent}
                  compact
                />
              ))}
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
                placeholder="Buscar por usuario, entidad o número de póliza/cotización…"
                className={`h-[46px] w-full rounded-[3px] border bg-white pr-3.5 pl-[42px] text-[14.5px] text-[#14181F] outline-none ${
                  focus === 'search'
                    ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
                    : 'border-[#C8CFD9]'
                }`}
              />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(178px,1fr))] gap-3">
              <FilterSelect
                label="País"
                value={filters.country}
                onChange={(v) => setFilter('country', v)}
                options={['', ...countryOptions]}
              />
              <FilterSelect
                label="Tipo de acción"
                value={filters.actionType}
                onChange={(v) => setFilter('actionType', v)}
                options={[...AUDIT_ACTION_FILTERS]}
              />
              <FilterSelect
                label="Usuario"
                value={filters.user}
                onChange={(v) => setFilter('user', v)}
                options={['', ...userOptions]}
              />
              <FilterDate
                label="Desde"
                value={filters.from}
                focused={focus === 'from'}
                onFocus={() => setFocus('from')}
                onBlur={() => setFocus(null)}
                onChange={(v) => setFilter('from', v)}
              />
              <FilterDate
                label="Hasta"
                value={filters.to}
                focused={focus === 'to'}
                onFocus={() => setFocus('to')}
                onBlur={() => setFocus(null)}
                onChange={(v) => setFilter('to', v)}
              />
            </div>
          </div>
        }
      />

      <PageMain maxWidth="min(1680px, 94vw)">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[13px] text-[#6B7483]">
            {rows.length === total
              ? `${total} eventos`
              : `${rows.length} de ${total} eventos`}
          </span>
          {activeFilters ? (
            <button
              type="button"
              onClick={() => setFilters(EMPTY_AUDIT_FILTERS)}
              className="inline-flex h-[34px] cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-3.5 text-[12.5px] font-medium text-[#0F1E33] hover:border-[#0F1E33]"
            >
              Limpiar filtros
            </button>
          ) : null}
        </div>

        <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
          <div className="overflow-x-auto">
            <div
              className="grid min-w-[1060px] gap-x-4 gap-y-3 border-b border-[#E4E8EE] bg-[#FAFBFC] px-[22px] py-3"
              style={{ gridTemplateColumns: GRID }}
            >
              {['Fecha', 'Usuario', 'País', 'Tipo de acción', 'Entidad afectada'].map((h) => (
                <span
                  key={h}
                  className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase"
                >
                  {h}
                </span>
              ))}
            </div>

            {rows.map((r, i) => (
              <div
                key={`${r.date}-${r.entity}-${r.type}-${i}`}
                className="grid min-w-[1060px] gap-x-4 gap-y-3 px-[22px] py-[13px] transition-colors hover:bg-[#FAFBFC]"
                style={{
                  gridTemplateColumns: GRID,
                  borderBottom: i === rows.length - 1 ? 'none' : '1px solid #F0F2F6',
                }}
              >
                <span className="self-center text-[13px] whitespace-nowrap text-[#3B4553] tabular-nums">
                  {r.date}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5 self-center">
                  <span className="text-[13.5px] font-medium text-[#14181F]">{r.user}</span>
                  <span className="text-xs text-[#8A93A1]">{r.role}</span>
                </div>
                <span className="self-center text-[13px] text-[#3B4553]">{r.country}</span>
                <AuditActionBadge type={r.type} />
                <span className="self-center text-[13.5px] leading-snug text-[#14181F] text-pretty">
                  {r.entity}
                </span>
              </div>
            ))}

            {rows.length === 0 ? (
              <div className="min-w-[1060px] px-6 py-14 text-center">
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

        <p className="m-0 text-[12.5px] leading-relaxed text-[#8A93A1]">
          Registro inmutable de acciones sobre pólizas, cotizaciones, configuración y usuarios.
          Alcance predeterminado: todos los países.
        </p>
      </PageMain>

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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full cursor-pointer appearance-none rounded-[3px] border border-[#C8CFD9] bg-white pr-8 pl-3.5 text-[13.5px] text-[#14181F] outline-none focus:border-[#C9A24A] focus:shadow-[0_0_0_3px_rgba(201,162,74,.18)]"
        >
          {options.map((o) => (
            <option key={o || 'all'} value={o}>
              {o || 'Todos'}
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
    </div>
  );
}

function FilterDate({
  label,
  value,
  focused,
  onFocus,
  onBlur,
  onChange,
}: {
  label: string;
  value: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`h-10 w-full cursor-pointer rounded-[3px] border bg-white px-3.5 text-[13.5px] text-[#14181F] outline-none ${
          focused
            ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
            : 'border-[#C8CFD9]'
        }`}
      />
    </div>
  );
}
