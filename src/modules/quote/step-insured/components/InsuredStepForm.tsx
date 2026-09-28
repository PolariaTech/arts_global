'use client';

import Link from 'next/link';
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
import { QuoteWizardSkeleton } from '@/components/shared/skeleton';
import { PILOT_RELATIONS } from '../constants/defaults';
import { useInsuredStep } from '../hooks/useInsuredStep';
import type { InsuredType } from '../types/insuredStep';

export function InsuredStepForm() {
  const router = useRouter();
  const { data, patch, setLienAmount, progressNote, hydrated } = useInsuredStep();

  if (!hydrated) return <QuoteWizardSkeleton />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(ROUTES.producer.cotizacion.paso2);
  }

  const taxPlaceholder =
    data.insuredType === 'Empresa' ? 'EIN / RFC / NIT' : 'SSN / RFC / CC';

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-5"
    >
      <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
          Asegurado
        </h2>
        <p className="mt-0 mb-[22px] text-[13px] text-[#6B7483]">
          Datos del tomador de la póliza y su relación con la operación.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-5 gap-y-[18px]">
          <FieldShell label="Nombre del asegurado" htmlFor="q-insured" full>
            <QuoteInput
              id="q-insured"
              value={data.insured}
              onChange={(e) => patch({ insured: e.target.value })}
              placeholder="Razón social o nombre completo"
            />
          </FieldShell>

          <div className="flex flex-col gap-[7px]">
            <span className="text-[11.5px] font-semibold tracking-[0.06em] text-[#3B4553] uppercase">
              Tipo de asegurado
            </span>
            <SegmentedToggle<InsuredType>
              ariaLabel="Tipo de asegurado"
              value={data.insuredType}
              onChange={(insuredType) => patch({ insuredType })}
              options={[
                { value: 'Individual', label: 'Individual' },
                { value: 'Empresa', label: 'Empresa' },
              ]}
            />
          </div>

          <FieldShell label="Identificación fiscal" htmlFor="q-tax">
            <QuoteInput
              id="q-tax"
              value={data.taxId}
              onChange={(e) => patch({ taxId: e.target.value })}
              placeholder={taxPlaceholder}
            />
          </FieldShell>

          <FieldShell label="Relación con el piloto" htmlFor="q-rel">
            <QuoteSelect
              id="q-rel"
              value={data.relation}
              onChange={(e) => patch({ relation: e.target.value })}
            >
              {PILOT_RELATIONS.map((r) => (
                <option key={r.value || 'empty'} value={r.value}>
                  {r.label}
                </option>
              ))}
            </QuoteSelect>
          </FieldShell>
        </div>
      </section>

      <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
          Cobertura actual
        </h2>
        <p className="mt-0 mb-[22px] text-[13px] text-[#6B7483]">
          Antecedentes de aseguramiento del riesgo.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-5 gap-y-[18px]">
          <FieldShell label="Aseguradora actual" htmlFor="q-carrier">
            <QuoteInput
              id="q-carrier"
              value={data.carrier}
              onChange={(e) => patch({ carrier: e.target.value })}
              placeholder="Nombre · o «Sin cobertura previa»"
            />
          </FieldShell>

          <FieldShell label="Vencimiento de póliza actual" htmlFor="q-exp">
            <QuoteInput
              id="q-exp"
              type="date"
              value={data.expiry}
              onChange={(e) => patch({ expiry: e.target.value })}
              fieldExtra={{ cursor: 'pointer' }}
            />
          </FieldShell>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#F0F2F6] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="max-w-[520px] text-sm leading-snug font-medium text-[#14181F] text-pretty">
              ¿Alguna aseguradora ha cancelado o rehusado renovar la cobertura?
            </span>
            <SegmentedToggle<boolean>
              ariaLabel="Cancelación o rechazo previo"
              size="sm"
              value={data.declined === true}
              onChange={(declined) =>
                patch({
                  declined,
                  declinedDetail: declined ? data.declinedDetail : '',
                })
              }
              options={[
                { value: true, label: 'Sí' },
                { value: false, label: 'No' },
              ]}
            />
          </div>
          {data.declined === true ? (
            <FieldShell label="Detalle" htmlFor="q-decl">
              <QuoteTextarea
                id="q-decl"
                rows={2}
                value={data.declinedDetail}
                onChange={(e) => patch({ declinedDetail: e.target.value })}
                placeholder="Aseguradora, fecha y motivo"
              />
            </FieldShell>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#F0F2F6] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="max-w-[520px] text-sm leading-snug font-medium text-[#14181F] text-pretty">
              ¿Existe gravamen sobre la aeronave?
            </span>
            <SegmentedToggle<boolean>
              ariaLabel="Gravamen sobre la aeronave"
              size="sm"
              value={data.lien === true}
              onChange={(lien) =>
                patch({
                  lien,
                  lienName: lien ? data.lienName : '',
                  lienAmount: lien ? data.lienAmount : '',
                })
              }
              options={[
                { value: true, label: 'Sí' },
                { value: false, label: 'No' },
              ]}
            />
          </div>
          {data.lien === true ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-5 gap-y-[18px]">
              <FieldShell label="Titular del gravamen" htmlFor="q-lien-name">
                <QuoteInput
                  id="q-lien-name"
                  value={data.lienName}
                  onChange={(e) => patch({ lienName: e.target.value })}
                  placeholder="Entidad financiera"
                />
              </FieldShell>
              <FieldShell label="Monto" htmlFor="q-lien-amt">
                <div className="relative">
                  <span className="pointer-events-none absolute top-3.5 left-3.5 text-sm font-semibold text-[#6B7483]">
                    US$
                  </span>
                  <QuoteInput
                    id="q-lien-amt"
                    inputMode="numeric"
                    value={data.lienAmount}
                    onChange={(e) => setLienAmount(e.target.value)}
                    placeholder="0"
                    fieldExtra={{
                      paddingLeft: 46,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  />
                </div>
              </FieldShell>
            </div>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap-reverse items-center justify-between gap-4 pt-0.5">
        <Link
          href={ROUTES.producer.panel}
          className="text-[13.5px] font-medium text-[#5C6675] no-underline hover:text-[#0F1E33]"
        >
          Cancelar
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-4">
          <span className="text-[12.5px] text-[#8A93A1]">{progressNote}</span>
          <button
            type="submit"
            className="inline-flex h-12 min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-[3px] border-none bg-[#C9A24A] px-8 text-[15px] font-semibold tracking-wide whitespace-nowrap text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
            style={{ fontFamily: 'inherit' }}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </form>
  );
}
