'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { saveBoundPolicy } from '@/lib/storage/boundPolicy';
import { getQuoteMeta } from '@/modules/quote/shared/constants/quoteMeta';
import {
  computeQuote,
  money,
  moneyInt,
} from '@/modules/quote/shared/utils/computeQuote';
import { QuoteResultSkeleton } from '@/components/shared/skeleton';

type BindStage = null | 'working' | 'done';

export function QuoteResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cotId = searchParams.get('cot');

  const [hydrated, setHydrated] = useState(false);
  const [aircraftExpanded, setAircraftExpanded] = useState(true);
  const [toast, setToast] = useState('');
  const [bindStage, setBindStage] = useState<BindStage>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const quote = useMemo(() => (hydrated ? computeQuote(cotId) : null), [hydrated, cotId]);
  const meta = getQuoteMeta(cotId);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  function flash(text: string) {
    setToast(text);
  }

  function onBind() {
    if (bindStage || !quote) return;
    const num = meta.boundNumber;
    const today = meta.quoteDate;
    const certificate = `AV${meta.quoteNumber.replace(/\D/g, '')}-01`;
    const vigenciaEnd = today.replace(/\d{4}$/, (m) => String(Number(m) + 1));

    saveBoundPolicy(num, {
      number: num,
      certificate,
      insured: quote.insured,
      country: quote.country,
      aircraftLine: `${quote.aircraftLine} · ${quote.reg}`,
      headerSummary: `1 aeronave · ${quote.reg} · ${quote.country} · Vigencia ${today} — ${vigenciaEnd}`,
      badge: {
        label: 'Vinculada',
        bg: '#EEF1F6',
        color: '#0F1E33',
        border: '#C9D2DF',
      },
      renewalOpen: true,
      renewalNote: `Dentro de la ventana de renovación · vence el ${vigenciaEnd}. La renovación conserva el histórico de la póliza actual.`,
      facts: [
        { label: 'Producer', value: 'J. Salgado' },
        { label: 'Asegurado', value: quote.insured },
        { label: 'Certificado', value: certificate },
        { label: 'Aeronave', value: `${quote.aircraftLine} · ${quote.reg}` },
        { label: 'Tipo de uso', value: quote.use },
        { label: 'Vigencia', value: `${today} — ${vigenciaEnd} (365 días)` },
        { label: 'País / impuesto', value: `${quote.country} · ${quote.taxPct}%` },
        { label: 'Colocado por', value: 'ARTS Global' },
      ],
      schedule: [
        {
          reg: quote.reg,
          aircraft: quote.aircraftLine,
          useType: quote.use,
          premium: quote.total,
        },
      ],
      coverage: quote.coverage,
      primaNeta: money(quote.net),
      taxLabel: `${quote.country} · ${quote.taxPct}%`,
      taxAmount: money(quote.taxAmount),
      primaTotal: money(quote.total),
      documents: [
        {
          name: 'Cotización',
          meta: `COT-${meta.quoteNumber} · ${today} · 214 KB`,
          signature: 'No requiere firma',
          state: 'neutral',
        },
        {
          name: 'Nota de cobertura',
          meta: `NC-${num} · ${today} · 188 KB`,
          signature: 'Firmada',
          state: 'ok',
        },
        {
          name: 'Carátula de póliza',
          meta: `Póliza ${num} · ${certificate} · ${today} · 402 KB`,
          signature: 'Firmada',
          state: 'ok',
        },
      ],
      audit: [
        {
          action: `Póliza vinculada · ${num}`,
          who: 'J. Salgado',
          when: today,
          current: true,
        },
        {
          action: 'Carátula de póliza generada y firmada',
          who: 'J. Salgado',
          when: today,
        },
        { action: 'Cotización calculada', who: 'J. Salgado', when: today },
      ],
      hasClaims: false,
    });

    setBindStage('working');
    window.setTimeout(() => {
      setBindStage('done');
      window.setTimeout(() => {
        router.push(ROUTES.producer.polizaDetalle(num));
      }, 1100);
    }, 1300);
  }

  if (!quote) {
    return <QuoteResultSkeleton />;
  }

  return (
    <>
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 pt-[22px] pb-5">
        <div className="mx-auto flex max-w-[min(1344px,94vw)] flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="m-0 mb-[5px] text-[21px] font-semibold tracking-tight text-[#0F1E33]">
              Resultado de cotización
            </h1>
            <p className="m-0 text-[13px] text-[#6B7483]">
              Cotización {meta.quoteNumber} · Emitida {meta.quoteDate}
            </p>
          </div>
          <span className="inline-flex items-center gap-[7px] rounded-full border border-[#E0E4EA] bg-[#F7F8FA] px-3 py-1.5 text-[11.5px] font-semibold tracking-[0.08em] text-[#5C6675] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A24A]" />
            Pendiente de vinculación
          </span>
        </div>
      </div>

      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <div className="mx-auto flex max-w-[min(1344px,94vw)] flex-col gap-5">
          <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-6 py-[22px] shadow-[0_1px_2px_rgba(15,30,51,.04)]">
            <h2 className="mt-0 mb-[18px] text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
              Resumen de lo cotizado
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-6 gap-y-[18px]">
              {[
                { label: 'Asegurado', value: quote.insured },
                { label: 'Matrícula', value: quote.reg, strong: true },
                { label: 'Aeronave', value: quote.aircraftLine },
                { label: 'Tipo de cobertura', value: 'Casco y responsabilidad civil' },
                { label: 'Uso', value: quote.use },
                { label: 'Valor asegurado', value: moneyInt(quote.hullValue) },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <span className="text-[11.5px] font-semibold tracking-[0.06em] text-[#9AA3AE] uppercase">
                    {f.label}
                  </span>
                  <span
                    className="text-[14.5px] text-[#14181F]"
                    style={{
                      fontWeight: f.strong ? 600 : 500,
                      letterSpacing: f.strong ? '0.04em' : undefined,
                      fontVariantNumeric: f.label === 'Valor asegurado' ? 'tabular-nums' : undefined,
                    }}
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
            <div className="px-[26px] pt-6 pb-1.5">
              <div className="mb-3.5 flex items-baseline justify-between gap-4">
                <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
                  Prima por aeronave
                </h2>
                <button
                  type="button"
                  onClick={() => setAircraftExpanded((v) => !v)}
                  className="cursor-pointer border-none bg-transparent p-0 text-[12.5px] font-medium text-[#0F1E33] underline decoration-[#C9A24A] underline-offset-2 hover:text-[#8A6E22] hover:decoration-[#8A6E22]"
                  style={{ fontFamily: 'inherit' }}
                >
                  {aircraftExpanded ? 'Ocultar detalle' : 'Mostrar detalle'}
                </button>
              </div>

              <div className="mb-5 overflow-hidden rounded border border-[#F0F2F6]">
                <div
                  className="flex items-center justify-between gap-4 bg-[#FAFBFC] px-4"
                  style={{ paddingTop: aircraftExpanded ? 12 : 9, paddingBottom: aircraftExpanded ? 12 : 9 }}
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[13.5px] font-medium text-[#14181F]">{quote.reg}</span>
                    {aircraftExpanded ? (
                      <span className="text-xs text-[#8A93A1]">{quote.aircraftLine}</span>
                    ) : null}
                  </div>
                  <span className="text-[14.5px] font-semibold whitespace-nowrap text-[#14181F] tabular-nums">
                    {money(quote.total)}
                  </span>
                </div>
              </div>

              <h2 className="mt-0 mb-[18px] text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
                Desglose de la prima
              </h2>

              <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] py-[13px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14.5px] font-medium text-[#14181F]">Prima neta</span>
                  <span className="text-xs text-[#8A93A1]">
                    Tarifa casco {quote.cascoRate.toFixed(4)}% sobre valor declarado, más RC y
                    coberturas complementarias
                  </span>
                </div>
                <span className="text-base font-medium text-[#14181F] tabular-nums">
                  {money(quote.net)}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] py-[13px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14.5px] font-medium text-[#14181F]">
                    Impuestos y gravámenes
                  </span>
                  <span className="text-xs text-[#8A93A1]">
                    Impuesto {quote.country} ({quote.taxPct}%)
                  </span>
                </div>
                <span className="text-base font-medium text-[#14181F] tabular-nums">
                  {money(quote.taxAmount)}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-4 py-[13px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14.5px] font-medium text-[#14181F]">
                    Comisión del intermediario
                  </span>
                  <span className="text-xs text-[#8A93A1]">Incluida en la prima neta</span>
                </div>
                <span className="text-base font-medium text-[#8A93A1] tabular-nums">US$ 0.00</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#0F1E33] p-[26px]">
              <span className="text-[11.5px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
                Prima total
              </span>
              <span className="text-[40px] leading-none font-bold tracking-tight text-white tabular-nums">
                {money(quote.total)}
              </span>
              <span className="text-xs text-[#8895A8]">Prima anual · pago único</span>
            </div>
          </section>

          <div className="flex flex-wrap-reverse items-center justify-between gap-4">
            <span className="max-w-[340px] text-[12.5px] leading-relaxed text-[#8A93A1]">
              Vincular genera cobertura en firme y notifica a suscripción.
            </span>
            <div className="ml-auto flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => flash(`Cotización guardada como borrador · ${meta.quoteNumber}`)}
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[3px] border border-[#C2C9D3] bg-white px-6 text-[15px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
                style={{ fontFamily: 'inherit' }}
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => flash('Cotización enviada a revisión de suscripción')}
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[3px] border border-[#C2C9D3] bg-white px-6 text-[15px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
                style={{ fontFamily: 'inherit' }}
              >
                Revisar
              </button>
              <button
                type="button"
                onClick={onBind}
                className="inline-flex h-12 min-w-40 cursor-pointer items-center justify-center rounded-[3px] border-none bg-[#C9A24A] px-[34px] text-[15px] font-semibold tracking-wide whitespace-nowrap text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
                style={{ fontFamily: 'inherit' }}
              >
                Vincular
              </button>
            </div>
          </div>
        </div>
      </main>

      {toast ? (
        <div className="arts-toast-in fixed bottom-7 left-1/2 z-50 flex items-center gap-[11px] rounded border-l-[3px] border-l-[#C9A24A] bg-[#0F1E33] px-5 py-3.5 shadow-[0_8px_28px_rgba(15,30,51,.28)]">
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

      {bindStage ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(15,30,51,.55)] p-6">
          <div className="arts-toast-in w-full max-w-[420px] overflow-hidden rounded-[5px] bg-white shadow-[0_18px_48px_rgba(15,30,51,.32)]">
            <div className="border-b-2 border-[#C9A24A] bg-[#0F1E33] px-6 py-[18px]">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
                Vinculación
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 px-6 pt-7 pb-[30px] text-center">
              <span
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full transition-colors duration-200"
                style={{
                  background:
                    bindStage === 'done' ? '#C9A24A' : 'rgba(201,162,74,.12)',
                }}
              >
                {bindStage === 'done' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12.8 L9.6 17.4 L19 6.8"
                      fill="none"
                      stroke="#0F1E33"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <span className="arts-spin h-[22px] w-[22px] rounded-full border-[2.5px] border-[rgba(201,162,74,.28)] border-t-[#C9A24A]" />
                )}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[17px] font-semibold text-[#0F1E33]">
                  {bindStage === 'done' ? 'Póliza vinculada' : 'Vinculando cotización…'}
                </span>
                <span className="text-[13.5px] leading-relaxed text-[#6B7483] text-pretty">
                  {bindStage === 'done'
                    ? `Póliza ${meta.boundNumber} emitida. Abriendo el detalle de la póliza…`
                    : 'Generando número de póliza y documentos. No cierre esta ventana.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
