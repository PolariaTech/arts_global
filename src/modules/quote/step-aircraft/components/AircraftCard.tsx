'use client';

import {
  FieldShell,
  QuoteInput,
  QuoteSelect,
  QuoteTextarea,
} from '@/modules/quote/shared/components/QuoteField';
import {
  AIRCRAFT_CATEGORIES,
  AIRCRAFT_MAKES,
  equipmentOptionsFor,
} from '../constants/options';
import type { AircraftRecord } from '../types/aircraft';
import { EquipmentChips } from './EquipmentChips';

type AircraftCardProps = {
  aircraft: AircraftRecord;
  index: number;
  total: number;
  isLast: boolean;
  onPatch: (partial: Partial<AircraftRecord>) => void;
  onCategory: (category: string) => void;
  onHull: (raw: string) => void;
  onToggleEquip: (label: string) => void;
  onRemove: () => void;
};

export function AircraftCard({
  aircraft: ac,
  index,
  total,
  isLast,
  onPatch,
  onCategory,
  onHull,
  onToggleEquip,
  onRemove,
}: AircraftCardProps) {
  const options = equipmentOptionsFor(ac.category);
  const title = total === 1 ? 'Aeronave' : `Aeronave ${index + 1}`;
  const prefix = `ac${ac.id}`;

  return (
    <div
      className="rounded border border-[#EDF0F4] bg-[#FAFBFC] px-5 pt-[18px] pb-5"
      style={{ marginBottom: isLast ? 18 : 16 }}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-[#0F1E33]">{title}</span>
        {total > 1 ? (
          <button
            type="button"
            onClick={onRemove}
            className="cursor-pointer border-none bg-transparent p-0 text-[12.5px] font-medium text-[#8E2B29] underline decoration-[#E9BDBC] underline-offset-2 hover:text-[#B4302E]"
            style={{ fontFamily: 'inherit' }}
          >
            Quitar
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-5 gap-y-[18px]">
        <FieldShell label="Matrícula" htmlFor={`${prefix}-reg`}>
          <QuoteInput
            id={`${prefix}-reg`}
            value={ac.reg}
            onChange={(e) => onPatch({ reg: e.target.value })}
            placeholder="HP-0000"
            fieldExtra={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}
          />
        </FieldShell>
        <FieldShell label="Año" htmlFor={`${prefix}-year`}>
          <QuoteInput
            id={`${prefix}-year`}
            type="number"
            min={1950}
            max={2026}
            value={ac.year}
            onChange={(e) => onPatch({ year: e.target.value })}
            placeholder="2018"
          />
        </FieldShell>
        <FieldShell label="Fabricante" htmlFor={`${prefix}-make`}>
          <QuoteSelect
            id={`${prefix}-make`}
            value={ac.make}
            onChange={(e) => onPatch({ make: e.target.value })}
          >
            <option value="">Seleccionar…</option>
            {AIRCRAFT_MAKES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
            <option value="Otro">Otro</option>
          </QuoteSelect>
        </FieldShell>
        <FieldShell label="Modelo" htmlFor={`${prefix}-model`}>
          <QuoteInput
            id={`${prefix}-model`}
            value={ac.model}
            onChange={(e) => onPatch({ model: e.target.value })}
            placeholder="Ej. 208B Grand Caravan"
          />
        </FieldShell>
        <FieldShell label="Categoría" htmlFor={`${prefix}-cat`}>
          <QuoteSelect
            id={`${prefix}-cat`}
            value={ac.category}
            onChange={(e) => onCategory(e.target.value)}
          >
            <option value="">Seleccionar…</option>
            {AIRCRAFT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </QuoteSelect>
        </FieldShell>
        <FieldShell label="Número de asientos" htmlFor={`${prefix}-seats`}>
          <QuoteInput
            id={`${prefix}-seats`}
            type="number"
            min={1}
            max={60}
            value={ac.seats}
            onChange={(e) => onPatch({ seats: e.target.value })}
            placeholder="4"
          />
        </FieldShell>
        <FieldShell label="Valor asegurado (casco)" htmlFor={`${prefix}-hull`}>
          <div className="relative">
            <span className="pointer-events-none absolute top-3.5 left-3.5 text-sm font-semibold text-[#6B7483]">
              US$
            </span>
            <QuoteInput
              id={`${prefix}-hull`}
              inputMode="numeric"
              value={ac.hull}
              onChange={(e) => onHull(e.target.value)}
              placeholder="0"
              fieldExtra={{ paddingLeft: 46, fontVariantNumeric: 'tabular-nums' }}
            />
          </div>
        </FieldShell>
        <FieldShell label="Fecha de adquisición" htmlFor={`${prefix}-acq`}>
          <QuoteInput
            id={`${prefix}-acq`}
            type="date"
            value={ac.acquired}
            onChange={(e) => onPatch({ acquired: e.target.value })}
            fieldExtra={{ cursor: 'pointer' }}
          />
        </FieldShell>
        <FieldShell label="Horas totales de célula" htmlFor={`${prefix}-af`}>
          <div className="relative">
            <QuoteInput
              id={`${prefix}-af`}
              type="number"
              min={0}
              value={ac.airframeHours}
              onChange={(e) => onPatch({ airframeHours: e.target.value })}
              placeholder="0"
              fieldExtra={{ paddingRight: 44, fontVariantNumeric: 'tabular-nums' }}
            />
            <span className="pointer-events-none absolute top-[15px] right-3.5 text-xs text-[#9AA3AE]">
              hrs
            </span>
          </div>
        </FieldShell>
        <FieldShell label="Horas desde overhaul del motor" htmlFor={`${prefix}-oh`}>
          <div className="relative">
            <QuoteInput
              id={`${prefix}-oh`}
              type="number"
              min={0}
              value={ac.overhaulHours}
              onChange={(e) => onPatch({ overhaulHours: e.target.value })}
              placeholder="0"
              fieldExtra={{ paddingRight: 44, fontVariantNumeric: 'tabular-nums' }}
            />
            <span className="pointer-events-none absolute top-[15px] right-3.5 text-xs text-[#9AA3AE]">
              hrs
            </span>
          </div>
        </FieldShell>
        <FieldShell label="Última inspección anual" htmlFor={`${prefix}-insp`}>
          <QuoteInput
            id={`${prefix}-insp`}
            type="date"
            value={ac.inspection}
            onChange={(e) => onPatch({ inspection: e.target.value })}
            fieldExtra={{ cursor: 'pointer' }}
          />
        </FieldShell>
      </div>

      <div className="mt-[18px] flex flex-col gap-[7px]">
        <label
          htmlFor={`${prefix}-mods`}
          className="text-[11.5px] font-semibold tracking-[0.06em] text-[#3B4553] uppercase"
        >
          Modificaciones o daños no reparados{' '}
          <span className="font-medium tracking-normal text-[#9AA3AE] normal-case">
            · opcional
          </span>
        </label>
        <QuoteTextarea
          id={`${prefix}-mods`}
          rows={2}
          value={ac.mods}
          onChange={(e) => onPatch({ mods: e.target.value })}
          placeholder="STC, conversiones, daños pendientes de reparación"
        />
      </div>

      <div className="mt-5 border-t border-[#EDF0F4] pt-[18px]">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <span className="text-[11.5px] font-semibold tracking-[0.08em] text-[#8A93A1] uppercase">
            Aviónica y equipamiento
          </span>
          <span className="text-xs text-[#9AA3AE]">
            {ac.equipment.length} de {options.length} seleccionados
          </span>
        </div>
        <EquipmentChips
          options={options}
          selected={ac.equipment}
          onToggle={onToggleEquip}
        />
      </div>
    </div>
  );
}
