'use client';

import { formatUsd } from '@/lib/format/money';
import type { PolicyScheduleRow } from '@/types/policy/detail';

type RemoveAircraftModalProps = {
  schedule: PolicyScheduleRow[];
  selectedReg: string | null;
  onSelect: (reg: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  creditNote: string;
  creditAmount: number;
};

export function RemoveAircraftModal({
  schedule,
  selectedReg,
  onSelect,
  onClose,
  onConfirm,
  creditNote,
  creditAmount,
}: RemoveAircraftModalProps) {
  const hasSelection = Boolean(selectedReg);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(15,30,51,.55)] p-6">
      <div className="w-full max-w-[460px] overflow-hidden rounded-[5px] bg-white shadow-[0_18px_48px_rgba(15,30,51,.32)]">
        <div className="flex items-start justify-between gap-4 border-b-2 border-[#C9A24A] bg-[#0F1E33] px-6 py-[18px]">
          <span className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
            Endoso parcial
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border border-[#2A3B54] bg-transparent text-sm leading-none text-[#B9C3D1] hover:bg-[#1B3252] hover:text-white"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-[18px] p-6">
          <p className="m-0 text-sm leading-relaxed text-[#14181F]">
            Selecciona la aeronave a remover de la póliza. Se generará una nota de crédito por la
            prima no utilizada.
          </p>

          <div className="flex flex-col gap-2">
            {schedule.map((o) => {
              const on = o.reg === selectedReg;
              return (
                <button
                  key={o.reg}
                  type="button"
                  onClick={() => onSelect(o.reg)}
                  className="flex cursor-pointer items-center gap-3 rounded border px-[14px] py-[13px] font-[inherit] transition-[border-color,background] duration-100"
                  style={{
                    borderColor: on ? '#C9A24A' : '#E0E4EA',
                    background: on ? '#FBF6EA' : '#FFFFFF',
                  }}
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{
                      border: `1.5px solid ${on ? '#C9A24A' : '#C8CFD9'}`,
                      background: on ? '#C9A24A' : '#FFFFFF',
                      boxShadow: on ? 'inset 0 0 0 3px #FFFFFF' : 'none',
                    }}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                    <span className="text-sm font-semibold text-[#14181F]">{o.reg}</span>
                    <span className="text-xs text-[#8A93A1]">{o.aircraft}</span>
                  </div>
                  <span className="text-[13px] font-semibold whitespace-nowrap text-[#3B4553] tabular-nums">
                    {formatUsd(o.premium)}
                  </span>
                </button>
              );
            })}
          </div>

          {hasSelection ? (
            <div className="flex items-center justify-between gap-4 rounded border border-[#E0E4EA] bg-[#FAFBFC] px-4 py-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12.5px] font-semibold tracking-wide text-[#8A93A1] uppercase">
                  Crédito prorrateado
                </span>
                <span className="text-xs text-[#8A93A1]">{creditNote}</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#245F35] tabular-nums">
                {formatUsd(creditAmount)}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#E4E8EE] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-4 text-[13.5px] font-semibold text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!hasSelection}
            className="inline-flex h-10 items-center rounded-[3px] px-5 text-[13.5px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: hasSelection ? '#C9A24A' : '#E0E4EA',
              color: hasSelection ? '#0F1E33' : '#8A93A1',
              cursor: hasSelection ? 'pointer' : 'not-allowed',
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
