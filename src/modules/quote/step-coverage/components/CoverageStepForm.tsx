'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import {
  COVERAGE_COUNTRIES,
  COVERAGE_SECTIONS,
} from '@/constants/coverage/sections';
import { ROUTES } from '@/config/routes';
import { formatUsd } from '@/lib/format/money';
import {
  FieldShell,
  QuoteInput,
  QuoteSelect,
} from '@/modules/quote/shared/components/QuoteField';
import { WizardNav } from '@/modules/quote/shared/components/WizardNav';
import { QuoteWizardSkeleton } from '@/components/shared/skeleton';
import { useCoverageStep } from '../hooks/useCoverageStep';

export function CoverageStepForm() {
  const router = useRouter();
  const {
    data,
    meta,
    pricing,
    calculating,
    setCalculating,
    setSum,
    setRate,
    setCountry,
    setDedMoving,
    setDedStatic,
    progressNote,
    hydrated,
  } = useCoverageStep();

  if (!hydrated) return <QuoteWizardSkeleton />;
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (calculating) return;
    setCalculating(true);
    window.setTimeout(() => {
      router.push(ROUTES.producer.cotizacion.calculando);
    }, 500);
  }

  const activeLabel =
    pricing.activeCount === 0
      ? 'Sin secciones con suma asegurada'
      : pricing.activeCount === 1
        ? '1 sección contratada'
        : `${pricing.activeCount} secciones contratadas`;

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-5"
    >
      <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <div className="border-b border-[#F0F2F6] px-[26px] pt-6 pb-[18px]">
          <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
            Cobertura y tarifación
          </h2>
          <p className="m-0 text-[13px] text-[#6B7483] text-pretty">
            Complete únicamente las secciones contratadas. Las secciones en cero no generan prima.
          </p>
        </div>

        <div className="hidden grid-cols-[minmax(220px,1.5fr)_minmax(170px,1fr)_132px_minmax(150px,0.9fr)] items-center gap-x-[18px] border-b border-[#E4E8EE] bg-[#F7F8FA] px-[26px] py-[11px] md:grid">
          {['Sección', 'Suma asegurada', 'Tasa %', 'Prima'].map((h) => (
            <span
              key={h}
              className={`text-[11px] font-semibold tracking-[0.1em] text-[#6B7483] uppercase ${h === 'Prima' ? 'text-right' : ''}`}
            >
              {h}
            </span>
          ))}
        </div>

        {COVERAGE_SECTIONS.map((sec) => {
          const sum = data.sums[sec.key] ?? '';
          const rate = data.rates[sec.key] ?? '';
          const premium = pricing.premiums[sec.key] ?? 0;
          const active = (Number(String(sum).replace(/[^\d]/g, '')) || 0) > 0;
          const isCasco = sec.key === 'casco';
          const note = isCasco
            ? `Tasa base sugerida: ${meta.suggested.toFixed(3)}% (${meta.wing} · ${meta.use}). Editable.`
            : sec.note;

          return (
            <div
              key={sec.key}
              className="grid grid-cols-1 items-center gap-3 border-b border-[#F0F2F6] px-[26px] py-2.5 transition-[opacity,background] duration-100 md:grid-cols-[minmax(220px,1.5fr)_minmax(170px,1fr)_132px_minmax(150px,0.9fr)] md:gap-x-[18px]"
              style={{
                background: active ? '#FFFFFF' : '#FCFCFD',
                opacity: active ? 1 : 0.72,
              }}
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <span
                  className="text-sm leading-snug"
                  style={{
                    fontWeight: active ? 600 : 500,
                    color: active ? '#14181F' : '#6B7483',
                  }}
                >
                  {sec.name}
                </span>
                {note ? (
                  <span
                    className="text-[11.5px] leading-snug text-pretty"
                    style={{ color: isCasco ? '#8A6E22' : '#9AA3AE' }}
                  >
                    {note}
                  </span>
                ) : null}
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute top-3 left-[13px] text-[13.5px] font-semibold text-[#8A93A1]">
                  US$
                </span>
                <QuoteInput
                  inputMode="numeric"
                  aria-label={`Suma asegurada ${sec.name}`}
                  value={sum}
                  onChange={(e) => setSum(sec.key, e.target.value)}
                  placeholder="0"
                  fieldExtra={{
                    height: 42,
                    padding: '0 12px 0 44px',
                    fontSize: 14,
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                    color: active ? '#14181F' : '#6B7483',
                  }}
                />
              </div>
              <div className="relative">
                <QuoteInput
                  inputMode="decimal"
                  aria-label={`Tasa ${sec.name}`}
                  value={rate}
                  onChange={(e) => setRate(sec.key, e.target.value)}
                  placeholder="0.000"
                  fieldExtra={{
                    height: 42,
                    padding: '0 32px 0 12px',
                    fontSize: 14,
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                    color: active ? '#14181F' : '#6B7483',
                  }}
                />
                <span className="pointer-events-none absolute top-3 right-3 text-[13.5px] font-semibold text-[#8A93A1]">
                  %
                </span>
              </div>
              <span
                className="text-right text-[14.5px] whitespace-nowrap tabular-nums"
                style={{
                  fontWeight: premium > 0 ? 600 : 400,
                  color: premium > 0 ? '#14181F' : '#AEB6C1',
                }}
              >
                {premium > 0 ? formatUsd(premium) : '—'}
              </span>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-5">
        <section className="flex flex-col gap-[18px] rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-6 pb-[26px] shadow-[0_1px_2px_rgba(15,30,51,.04)]">
          <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
            Deducibles
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-5 gap-y-[18px]">
            <div className="flex flex-col gap-[7px]">
              <FieldShell label="Deducible en movimiento" htmlFor="c-ded-mov">
                <div className="relative">
                  <span className="pointer-events-none absolute top-3.5 left-3.5 text-sm font-semibold text-[#6B7483]">
                    US$
                  </span>
                  <QuoteInput
                    id="c-ded-mov"
                    inputMode="numeric"
                    value={data.dedMoving}
                    onChange={(e) => setDedMoving(e.target.value)}
                    placeholder="0"
                    fieldExtra={{
                      paddingLeft: 46,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  />
                </div>
              </FieldShell>
              <span className="text-xs text-[#8A93A1]">
                Daños con la aeronave en movimiento.
              </span>
            </div>
            <div className="flex flex-col gap-[7px]">
              <FieldShell label="Deducible fuera de movimiento" htmlFor="c-ded-static">
                <div className="relative">
                  <span className="pointer-events-none absolute top-3.5 left-3.5 text-sm font-semibold text-[#6B7483]">
                    US$
                  </span>
                  <QuoteInput
                    id="c-ded-static"
                    inputMode="numeric"
                    value={data.dedStatic}
                    onChange={(e) => setDedStatic(e.target.value)}
                    placeholder="0"
                    fieldExtra={{
                      paddingLeft: 46,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  />
                </div>
              </FieldShell>
              <span className="text-xs text-[#8A93A1]">Daños en tierra, sin movimiento.</span>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0F2F6] px-[26px] pt-5 pb-4">
            <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
              Resumen de prima
            </h2>
            <QuoteSelect
              aria-label="País de emisión"
              value={data.country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ height: 36, fontSize: 13, paddingRight: 32 }}
            >
              {COVERAGE_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </QuoteSelect>
          </div>

          <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] px-[26px] py-[15px]">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-[#14181F]">Prima neta</span>
              <span className="text-xs text-[#8A93A1]">{activeLabel}</span>
            </div>
            <span className="text-base font-semibold whitespace-nowrap text-[#14181F] tabular-nums">
              {formatUsd(pricing.net)}
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] px-[26px] py-[15px]">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-[#14181F]">Impuesto del país</span>
              <span className="text-xs text-[#8A93A1]">
                {data.country} · {pricing.taxPct === 0 ? 'exento' : `${pricing.taxPct}%`}
              </span>
            </div>
            <span className="text-base font-semibold whitespace-nowrap text-[#14181F] tabular-nums">
              {pricing.tax > 0 ? formatUsd(pricing.tax) : 'US$ 0.00'}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4 bg-[#0F1E33] px-[26px] pt-5 pb-[22px]">
            <div className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
                Prima total
              </span>
              <span className="text-xs text-[#8895A8]">Anual, en dólares estadounidenses.</span>
            </div>
            <span className="text-[30px] leading-none font-bold tracking-tight whitespace-nowrap text-white tabular-nums">
              {formatUsd(pricing.total)}
            </span>
          </div>
        </section>
      </div>

      <WizardNav
        backHref={ROUTES.producer.cotizacion.paso4}
        progressNote={progressNote}
        nextLabel={calculating ? 'Calculando…' : 'Calcular cotización'}
        nextMinWidth={220}
        busy={calculating}
      />
    </form>
  );
}
