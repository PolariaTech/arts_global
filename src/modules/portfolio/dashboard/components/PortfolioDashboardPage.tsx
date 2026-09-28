'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/shared/module/PageHeader';
import { PageMain } from '@/components/shared/module/PageMain';
import { SectionCard } from '@/components/shared/module/SectionCard';
import { GoldLink } from '@/components/shared/module/GoldLink';
import { ROUTES } from '@/config/routes';
import {
  PORTFOLIO_PERIOD_LABELS,
  exportPortfolioCsv,
  getPortfolioDashboard,
  type PortfolioPeriod,
} from '@/services/mock/portfolio';

export function PortfolioDashboardPage() {
  const [period, setPeriod] = useState<PortfolioPeriod>('YTD');
  const [toast, setToast] = useState('');
  const data = useMemo(() => getPortfolioDashboard(period), [period]);

  function onExport() {
    const stamp = new Date().toISOString().slice(0, 10);
    exportPortfolioCsv(data, `portafolio-${period.toLowerCase()}-${stamp}.csv`);
    setToast(`Exportación lista · ${data.countries.length} países`);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <>
      <PageHeader
        title="Panel de portafolio"
        subtitle={data.headerNote}
        maxWidth="min(1568px, 94vw)"
        actions={
          <>
            <div className="flex h-10 overflow-hidden rounded-[3px] border border-[#C8CFD9]">
              {(['MTD', 'QTD', 'YTD'] as PortfolioPeriod[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className="cursor-pointer border-none px-4 text-[13px] transition-colors duration-100"
                  style={{
                    fontFamily: 'inherit',
                    fontWeight: period === p ? 600 : 500,
                    background: period === p ? '#0F1E33' : '#FFFFFF',
                    color: period === p ? '#FFFFFF' : '#5C6675',
                  }}
                >
                  {PORTFOLIO_PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onExport}
              className="h-10 cursor-pointer rounded-[3px] border border-[#C2C9D3] bg-white px-[18px] text-[13.5px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
              style={{ fontFamily: 'inherit' }}
            >
              Exportar
            </button>
          </>
        }
      />

      <PageMain maxWidth="min(1568px, 94vw)">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(232px,1fr))] gap-3.5">
          {data.countries.map((c) => (
            <div
              key={c.code}
              className="flex flex-col gap-3.5 rounded-[5px] border border-[#E0E4EA] border-t-[3px] border-t-[#C9A24A] bg-white px-5 pt-[18px] pb-5 shadow-[0_1px_2px_rgba(15,30,51,.04)]"
            >
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-[13px] font-semibold tracking-wide text-[#0F1E33]">
                  {c.name}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.08em] text-[#9AA3AE]">
                  {c.code}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[30px] leading-none font-bold tracking-tight text-[#0F1E33] tabular-nums">
                  {c.policies}
                </span>
                <span className="text-[12.5px] text-[#6B7483]">pólizas</span>
              </div>
              <div className="flex flex-col gap-[3px] border-t border-[#F0F2F6] pt-3">
                <span className="text-[15px] font-semibold text-[#14181F] tabular-nums">
                  {c.premiumUsd}
                </span>
                <span className="text-xs text-[#8A93A1] tabular-nums">
                  {c.premiumLocal}
                </span>
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-6 pt-[22px] pb-6 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
          <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
              Prima emitida por mes · US$
            </h2>
            <div className="flex items-baseline gap-4">
              <span className="text-[12.5px] text-[#8A93A1]">
                Total {data.periodLabel}
              </span>
              <span className="text-base font-semibold text-[#0F1E33] tabular-nums">
                {data.chartTotal}
              </span>
            </div>
          </div>
          <div className="flex h-[180px] items-end gap-2.5 border-b border-[#E4E8EE] pb-0.5">
            {data.months.map((m) => (
              <div
                key={m.label}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[11.5px] font-semibold whitespace-nowrap text-[#5C6675] tabular-nums">
                  {m.value}
                </span>
                <span
                  className="block w-full max-w-14 rounded-t-[2px] transition-[height] duration-300 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{
                    height: `${m.heightPx}px`,
                    background: m.peak ? '#C9A24A' : '#1B3252',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 pt-[9px]">
            {data.months.map((m) => (
              <span
                key={`lbl-${m.label}`}
                className="min-w-0 flex-1 text-center text-[11.5px] text-[#8A93A1]"
              >
                {m.label}
              </span>
            ))}
          </div>
        </section>

        <SectionCard
          title="Próximas renovaciones · todos los producers"
          action={<GoldLink href={ROUTES.admin.registro}>Ver todas</GoldLink>}
        >
          <div className="hidden grid-cols-[minmax(190px,1.5fr)_minmax(130px,0.9fr)_minmax(86px,0.6fr)_minmax(96px,0.65fr)_minmax(74px,0.5fr)] gap-x-[18px] gap-y-3 border-b border-[#F0F2F6] bg-[#FAFBFC] px-6 py-[11px] md:grid">
            {['Asegurado', 'Producer', 'País', 'Vence en', ''].map((h) => (
              <span
                key={h || 'action'}
                className="text-[11px] font-semibold tracking-[0.08em] text-[#9AA3AE] uppercase"
              >
                {h}
              </span>
            ))}
          </div>
          {data.renewals.length === 0 ? (
            <p className="m-0 px-6 py-10 text-center text-[13.5px] text-[#8A93A1]">
              No hay renovaciones en la ventana actual.
            </p>
          ) : (
            data.renewals.map((r) => (
              <div
                key={r.number}
                className="grid grid-cols-1 items-center gap-3 border-b border-[#F0F2F6] px-6 py-3.5 last:border-b-0 hover:bg-[#FAFBFC] md:grid-cols-[minmax(190px,1.5fr)_minmax(130px,0.9fr)_minmax(86px,0.6fr)_minmax(96px,0.65fr)_minmax(74px,0.5fr)] md:gap-x-[18px]"
              >
                <div className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[14.5px] font-medium text-[#14181F] text-pretty">
                    {r.insured}
                  </span>
                  <span className="text-[12.5px] text-[#8A93A1] text-pretty">
                    {r.aircraft} · {r.reg}
                  </span>
                </div>
                <span className="self-center text-[13.5px] text-[#3B4553]">
                  {r.producer}
                </span>
                <span className="self-center text-[13.5px] text-[#3B4553]">
                  {r.country}
                </span>
                <span
                  className="self-center text-[13.5px] font-semibold whitespace-nowrap tabular-nums"
                  style={{ color: r.urgent ? '#8A6E22' : '#3B4553' }}
                >
                  {r.daysLabel}
                </span>
                <span className="md:justify-self-end">
                  <GoldLink href={r.href}>Revisar</GoldLink>
                </span>
              </div>
            ))
          )}
        </SectionCard>
      </PageMain>

      {toast ? (
        <div className="fixed right-6 bottom-6 z-40 rounded-[3px] bg-[#0F1E33] px-4 py-2.5 text-[13px] font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </>
  );
}
