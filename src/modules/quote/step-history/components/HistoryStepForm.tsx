'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { ROUTES } from '@/config/routes';
import {
  FieldShell,
  QuoteInput,
  QuoteSelect,
  QuoteTextarea,
} from '@/modules/quote/shared/components/QuoteField';
import { SegmentedToggle } from '@/modules/quote/shared/components/SegmentedToggle';
import { WizardNav } from '@/modules/quote/shared/components/WizardNav';
import { EquipmentChips } from '@/modules/quote/step-aircraft/components/EquipmentChips';
import {
  BACKGROUND_QUESTIONS,
  TERRAINS,
  USE_TYPES,
  type BackgroundKey,
} from '../constants/options';
import { useHistoryStep } from '../hooks/useHistoryStep';
import type { StorageType } from '../types/historyStep';
import { QuoteWizardSkeleton } from '@/components/shared/skeleton';

export function HistoryStepForm() {
  const router = useRouter();
  const {
    data,
    patch,
    toggleNoClaims,
    patchClaim,
    setClaimAmount,
    addClaim,
    removeClaim,
    setBackground,
    setBackgroundDetail,
    toggleTerrain,
    unanswered,
    progressNote,
    hydrated,
  } = useHistoryStep();

  if (!hydrated) return <QuoteWizardSkeleton />;
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(ROUTES.producer.cotizacion.paso5);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-5"
    >
      {/* Historial de siniestros */}
      <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
          Historial de siniestros
        </h2>
        <p className="mt-0 mb-5 text-[13px] text-[#6B7483]">
          Últimos 5 años. Debe registrar los siniestros o confirmar explícitamente que no hubo.
        </p>

        <button
          type="button"
          onClick={toggleNoClaims}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[3px] px-4 text-sm transition-[background,border-color] duration-100"
          style={{
            fontFamily: 'inherit',
            fontWeight: data.noClaims ? 600 : 500,
            background: data.noClaims ? '#FBF6EA' : '#FFFFFF',
            color: data.noClaims ? '#0F1E33' : '#5C6675',
            border: `1px solid ${data.noClaims ? '#C9A24A' : '#D8DDE5'}`,
          }}
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px]"
            style={{
              background: data.noClaims ? '#C9A24A' : '#FFFFFF',
              border: `1px solid ${data.noClaims ? '#C9A24A' : '#C8CFD9'}`,
            }}
          >
            {data.noClaims ? (
              <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M2 6.4 L4.6 9 L10 3.2"
                  fill="none"
                  stroke="#0F1E33"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : null}
          </span>
          Sin siniestros en los últimos 5 años
        </button>

        {!data.noClaims ? (
          <div className="mt-5">
            {data.claims.map((c, i) => (
              <div
                key={c.id}
                className="mb-3.5 rounded border border-[#EDF0F4] bg-[#FAFBFC] px-[18px] pt-4 pb-[18px]"
              >
                <div className="mb-3.5 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold text-[#0F1E33]">
                    {data.claims.length === 1 ? 'Siniestro' : `Siniestro ${i + 1}`}
                  </span>
                  {data.claims.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeClaim(c.id)}
                      className="cursor-pointer border-none bg-transparent p-0 text-[12.5px] font-medium text-[#8E2B29] underline decoration-[#E9BDBC] underline-offset-2 hover:text-[#B4302E]"
                      style={{ fontFamily: 'inherit' }}
                    >
                      Quitar
                    </button>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-x-[18px] gap-y-4 md:grid-cols-[170px_minmax(240px,1fr)_200px]">
                  <FieldShell label="Fecha" htmlFor={`cl${c.id}-date`}>
                    <QuoteInput
                      id={`cl${c.id}-date`}
                      type="date"
                      value={c.date}
                      onChange={(e) => patchClaim(c.id, { date: e.target.value })}
                      fieldExtra={{ cursor: 'pointer' }}
                    />
                  </FieldShell>
                  <FieldShell label="Descripción" htmlFor={`cl${c.id}-desc`}>
                    <QuoteInput
                      id={`cl${c.id}-desc`}
                      value={c.description}
                      onChange={(e) => patchClaim(c.id, { description: e.target.value })}
                      placeholder="Naturaleza del siniestro"
                    />
                  </FieldShell>
                  <FieldShell label="Monto pagado" htmlFor={`cl${c.id}-amt`}>
                    <div className="relative">
                      <span className="pointer-events-none absolute top-3.5 left-3.5 text-sm font-semibold text-[#6B7483]">
                        US$
                      </span>
                      <QuoteInput
                        id={`cl${c.id}-amt`}
                        inputMode="numeric"
                        value={c.amount}
                        onChange={(e) => setClaimAmount(c.id, e.target.value)}
                        placeholder="0"
                        fieldExtra={{
                          paddingLeft: 46,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      />
                    </div>
                  </FieldShell>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addClaim}
              className="inline-flex h-[42px] cursor-pointer items-center gap-2 rounded-[3px] border border-dashed border-[#C2C9D3] bg-white px-4 text-[13.5px] font-semibold text-[#0F1E33] hover:border-[#C9A24A] hover:bg-[#FDFBF6]"
              style={{ fontFamily: 'inherit' }}
            >
              <span className="text-base leading-none text-[#C9A24A]">+</span>
              Agregar siniestro
            </button>
          </div>
        ) : null}

        {unanswered ? (
          <p className="mt-4 mb-0 border-l-2 border-[#C9A24A] bg-[#FBF6EA] px-3 py-2.5 text-[12.5px] leading-relaxed text-[#6B5A2E]">
            Registre al menos un siniestro o marque «Sin siniestros en los últimos 5 años» para
            continuar.
          </p>
        ) : null}
      </section>

      {/* Antecedentes */}
      <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
          Antecedentes
        </h2>
        <p className="mt-0 mb-2 text-[13px] text-[#6B7483]">
          Declaraciones del piloto y del asegurado.
        </p>

        {BACKGROUND_QUESTIONS.map((q, i) => {
          const key = q.key as BackgroundKey;
          const value = data[key];
          const detail = data[`${key}Detail` as const];
          return (
            <div
              key={key}
              className={i === BACKGROUND_QUESTIONS.length - 1 ? 'pt-[18px]' : 'border-b border-[#F0F2F6] py-[18px]'}
              style={i === 0 ? { paddingTop: 6, borderTop: 'none' } : undefined}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="max-w-[520px] text-sm leading-snug font-medium text-[#14181F] text-pretty">
                  {q.label}
                </span>
                <SegmentedToggle<boolean>
                  ariaLabel={q.label}
                  size="sm"
                  value={value === true}
                  onChange={(v) => setBackground(key, v)}
                  options={[
                    { value: true, label: 'Sí' },
                    { value: false, label: 'No' },
                  ]}
                />
              </div>
              {value === true ? (
                <div className="mt-3">
                  <FieldShell label="Detalle" htmlFor={`q-${key}`}>
                    <QuoteTextarea
                      id={`q-${key}`}
                      rows={2}
                      value={detail}
                      onChange={(e) => setBackgroundDetail(key, e.target.value)}
                      placeholder="Fecha, jurisdicción y resolución"
                    />
                  </FieldShell>
                </div>
              ) : null}
            </div>
          );
        })}
      </section>

      {/* Operación */}
      <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
          Operación
        </h2>
        <p className="mt-0 mb-[22px] text-[13px] text-[#6B7483]">
          Uso previsto, base y entorno de operación.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-x-5 gap-y-[18px]">
          <FieldShell label="Tipo de uso" htmlFor="q-use">
            <QuoteSelect
              id="q-use"
              value={data.useType}
              onChange={(e) => patch({ useType: e.target.value })}
            >
              <option value="">Seleccionar…</option>
              {USE_TYPES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </QuoteSelect>
          </FieldShell>

          <FieldShell label="Horas estimadas por año" htmlFor="q-annual">
            <div className="relative">
              <QuoteInput
                id="q-annual"
                type="number"
                min={0}
                value={data.annualHours}
                onChange={(e) => patch({ annualHours: e.target.value })}
                placeholder="0"
                fieldExtra={{ paddingRight: 44, fontVariantNumeric: 'tabular-nums' }}
              />
              <span className="pointer-events-none absolute top-[15px] right-3.5 text-xs text-[#9AA3AE]">
                hrs
              </span>
            </div>
          </FieldShell>

          <FieldShell label="Aeropuerto base" htmlFor="q-base">
            <QuoteInput
              id="q-base"
              value={data.baseAirport}
              onChange={(e) => patch({ baseAirport: e.target.value })}
              placeholder="Código OACI · Ej. SKBO"
              fieldExtra={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}
            />
          </FieldShell>

          <div className="flex flex-col gap-[7px]">
            <span className="text-[11.5px] font-semibold tracking-[0.06em] text-[#3B4553] uppercase">
              Almacenamiento
            </span>
            <SegmentedToggle<StorageType>
              ariaLabel="Almacenamiento"
              value={data.storage}
              onChange={(storage) => patch({ storage })}
              options={[
                { value: 'Hangar', label: 'Hangar' },
                { value: 'Amarre exterior', label: 'Amarre exterior' },
              ]}
            />
          </div>

          <FieldShell label="Países de operación previstos" htmlFor="q-countries" full>
            <QuoteInput
              id="q-countries"
              value={data.countries}
              onChange={(e) => patch({ countries: e.target.value })}
              placeholder="Ej. Colombia, Panamá, Ecuador"
            />
          </FieldShell>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#F0F2F6] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="max-w-[520px] text-sm leading-snug font-medium text-[#14181F] text-pretty">
              ¿Se reciben pagos o compensación por el uso de la aeronave?
            </span>
            <SegmentedToggle<boolean>
              ariaLabel="Compensación por uso"
              size="sm"
              value={data.compensation === true}
              onChange={(compensation) => patch({ compensation })}
              options={[
                { value: true, label: 'Sí' },
                { value: false, label: 'No' },
              ]}
            />
          </div>
          {data.compensation === true ? (
            <div className="flex items-start gap-3 rounded border border-[#E9BDBC] border-l-4 border-l-[#B4302E] bg-[#FDF2F2] px-4 py-3.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mt-0.5 shrink-0"
              >
                <circle cx="10" cy="10" r="8.4" fill="none" stroke="#B4302E" strokeWidth="1.5" />
                <path d="M10 5.6 V11" stroke="#B4302E" strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="10" cy="13.8" r="1.05" fill="#B4302E" />
              </svg>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-[#8E2B29]">
                  Fuera del alcance de este producto
                </span>
                <span className="text-[13px] leading-relaxed text-[#9A3D3B] text-pretty">
                  El uso con compensación constituye operación comercial y requiere una póliza
                  distinta. No continúe con esta cotización sin consultar a suscripción.
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#F0F2F6] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="max-w-[520px] text-sm leading-snug font-medium text-[#14181F] text-pretty">
              ¿Se opera desde pistas no pavimentadas?
            </span>
            <SegmentedToggle<boolean>
              ariaLabel="Pistas no pavimentadas"
              size="sm"
              value={data.unpaved === true}
              onChange={(unpaved) =>
                patch({ unpaved, unpavedDetail: unpaved ? data.unpavedDetail : '' })
              }
              options={[
                { value: true, label: 'Sí' },
                { value: false, label: 'No' },
              ]}
            />
          </div>
          {data.unpaved === true ? (
            <FieldShell label="Detalle" htmlFor="q-unpaved">
              <QuoteTextarea
                id="q-unpaved"
                rows={2}
                value={data.unpavedDetail}
                onChange={(e) => patch({ unpavedDetail: e.target.value })}
                placeholder="Superficie, longitud y frecuencia de uso"
              />
            </FieldShell>
          ) : null}
        </div>

        <div className="mt-5 border-t border-[#F0F2F6] pt-5">
          <span className="mb-3 block text-[11.5px] font-semibold tracking-[0.08em] text-[#8A93A1] uppercase">
            Terreno habitual de operación
          </span>
          <EquipmentChips
            options={[...TERRAINS]}
            selected={data.terrain}
            onToggle={toggleTerrain}
          />
        </div>
      </section>

      <WizardNav
        backHref={ROUTES.producer.cotizacion.paso3}
        progressNote={progressNote}
      />
    </form>
  );
}
