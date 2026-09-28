'use client';

import {
  FieldShell,
  QuoteInput,
  QuoteSelect,
} from '@/modules/quote/shared/components/QuoteField';
import { EquipmentChips } from '@/modules/quote/step-aircraft/components/EquipmentChips';
import {
  CONDITIONAL_LABELS,
  LICENSE_TYPES,
  MEDICAL_CLASSES,
  PILOT_RATINGS,
} from '../constants/options';
import type { ConditionalHourKey, FleetFlags, PilotRecord } from '../types/pilot';
import { HoursInput } from './HoursInput';

type PilotCardProps = {
  pilot: PilotRecord;
  index: number;
  fleet: FleetFlags;
  onPatch: (partial: Partial<PilotRecord>) => void;
  onToggleRating: (label: string) => void;
  onRemove: () => void;
};

function conditionalKeys(pilot: PilotRecord, fleet: FleetFlags): ConditionalHourKey[] {
  const keys: ConditionalHourKey[] = [];
  if (fleet.needsRetract) keys.push('retract');
  if (fleet.needsTurbine) keys.push('turbine');
  if (pilot.ratings.includes('Tailwheel')) keys.push('tailwheel');
  if (fleet.needsHeli) keys.push('helicopter');
  return keys;
}

export function PilotCard({
  pilot: p,
  index,
  fleet,
  onPatch,
  onToggleRating,
  onRemove,
}: PilotCardProps) {
  const title = index === 0 ? 'Piloto principal' : `Piloto adicional ${index}`;
  const caption =
    index === 0
      ? 'Piloto designado para la operación de la aeronave.'
      : 'Piloto nombrado adicional en la póliza.';
  const prefix = `pl${p.id}`;
  const cond = conditionalKeys(p, fleet);

  return (
    <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="m-0 mb-1 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
            {title}
          </h2>
          <p className="m-0 text-[13px] text-[#6B7483]">{caption}</p>
        </div>
        {index > 0 ? (
          <button
            type="button"
            onClick={onRemove}
            className="h-8 shrink-0 cursor-pointer rounded-[3px] border border-[#DFE3E9] bg-white px-3 text-[12.5px] font-medium text-[#6B7483] hover:border-[#C2C9D3] hover:bg-[#F7F8FA] hover:text-[#0F1E33]"
            style={{ fontFamily: 'inherit' }}
          >
            Quitar
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-5 gap-y-[18px]">
        <FieldShell label="Nombre" htmlFor={`${prefix}-name`}>
          <QuoteInput
            id={`${prefix}-name`}
            value={p.name}
            onChange={(e) => onPatch({ name: e.target.value })}
            placeholder="Nombre completo"
          />
        </FieldShell>
        <FieldShell label="Fecha de nacimiento" htmlFor={`${prefix}-dob`}>
          <QuoteInput
            id={`${prefix}-dob`}
            type="date"
            value={p.dob}
            onChange={(e) => onPatch({ dob: e.target.value })}
            fieldExtra={{ cursor: 'pointer' }}
          />
        </FieldShell>
        <FieldShell label="Número de licencia" htmlFor={`${prefix}-lic`}>
          <QuoteInput
            id={`${prefix}-lic`}
            value={p.license}
            onChange={(e) => onPatch({ license: e.target.value })}
            placeholder="4821577"
          />
        </FieldShell>
        <FieldShell label="Tipo de licencia" htmlFor={`${prefix}-lictype`}>
          <QuoteSelect
            id={`${prefix}-lictype`}
            value={p.licenseType}
            onChange={(e) => onPatch({ licenseType: e.target.value })}
          >
            <option value="">Seleccionar…</option>
            {LICENSE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </QuoteSelect>
        </FieldShell>
        <FieldShell label="Clase de certificado médico" htmlFor={`${prefix}-medclass`}>
          <QuoteSelect
            id={`${prefix}-medclass`}
            value={p.medicalClass}
            onChange={(e) => onPatch({ medicalClass: e.target.value })}
          >
            <option value="">Seleccionar…</option>
            {MEDICAL_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </QuoteSelect>
        </FieldShell>
        <FieldShell label="Vencimiento del médico" htmlFor={`${prefix}-medexp`}>
          <QuoteInput
            id={`${prefix}-medexp`}
            type="date"
            value={p.medicalExpiry}
            onChange={(e) => onPatch({ medicalExpiry: e.target.value })}
            fieldExtra={{ cursor: 'pointer' }}
          />
        </FieldShell>
        <FieldShell label="Último entrenamiento recurrente" htmlFor={`${prefix}-training`}>
          <QuoteInput
            id={`${prefix}-training`}
            type="date"
            value={p.training}
            onChange={(e) => onPatch({ training: e.target.value })}
            fieldExtra={{ cursor: 'pointer' }}
          />
        </FieldShell>
      </div>

      <div className="mt-5 border-t border-[#F0F2F6] pt-[18px]">
        <span className="mb-3 block text-[11.5px] font-semibold tracking-[0.08em] text-[#8A93A1] uppercase">
          Habilitaciones
        </span>
        <EquipmentChips
          options={[...PILOT_RATINGS]}
          selected={p.ratings}
          onToggle={onToggleRating}
        />
      </div>

      <div className="mt-[22px] rounded border border-[#E8CE84] bg-[#FBF6EA] px-[22px] pt-5 pb-[22px]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-[11.5px] font-semibold tracking-[0.08em] text-[#8A6E22] uppercase">
            Experiencia
          </span>
          <span className="text-xs text-[#8A6E22]">
            Las horas en marca/modelo son el factor de tarifa principal
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-[18px] gap-y-4">
          <FieldShell label="Horas totales" htmlFor={`${prefix}-total`}>
            <HoursInput
              id={`${prefix}-total`}
              value={p.totalHours}
              onChange={(v) => onPatch({ totalHours: v })}
            />
          </FieldShell>
          <FieldShell label="Horas últimos 12 meses" htmlFor={`${prefix}-last12`}>
            <HoursInput
              id={`${prefix}-last12`}
              value={p.last12}
              onChange={(v) => onPatch({ last12: v })}
            />
          </FieldShell>
          <div className="flex flex-col gap-[7px]">
            <label
              htmlFor={`${prefix}-mm`}
              className="text-xs font-bold tracking-[0.05em] text-[#0F1E33] uppercase"
            >
              ★ Horas en marca/modelo a asegurar
            </label>
            <HoursInput
              id={`${prefix}-mm`}
              value={p.makeModel}
              onChange={(v) => onPatch({ makeModel: v })}
              emphasized
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label
              htmlFor={`${prefix}-mm12`}
              className="text-xs font-bold tracking-[0.05em] text-[#0F1E33] uppercase"
            >
              ★ En marca/modelo últimos 12 meses
            </label>
            <HoursInput
              id={`${prefix}-mm12`}
              value={p.makeModel12}
              onChange={(v) => onPatch({ makeModel12: v })}
              emphasized
            />
          </div>
        </div>

        {cond.length > 0 ? (
          <div className="mt-[18px] border-t border-[#E8CE84] pt-4">
            <span className="mb-3 block text-[11.5px] font-semibold tracking-[0.06em] text-[#8A6E22] uppercase">
              Horas específicas requeridas por el perfil de la flota cotizada
            </span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-[18px] gap-y-4">
              {cond.map((key) => (
                <FieldShell
                  key={key}
                  label={CONDITIONAL_LABELS[key]}
                  htmlFor={`${prefix}-${key}`}
                >
                  <HoursInput
                    id={`${prefix}-${key}`}
                    value={p[key]}
                    onChange={(v) => onPatch({ [key]: v })}
                  />
                </FieldShell>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
