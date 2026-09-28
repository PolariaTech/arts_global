'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { loadQuoteDraft } from '@/lib/storage/quoteDraft';

const STEPS = [
  'Verificando datos de las aeronaves…',
  'Evaluando experiencia del piloto…',
  'Aplicando tabla de tarifas…',
  'Calculando impuestos y gravámenes…',
  'Preparando cotización…',
] as const;

const INTERVAL_MS = 900;

export function CalculatingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [subtitle, setSubtitle] = useState('HP-4471 · Cessna Citation CJ2');

  useEffect(() => {
    const d = loadQuoteDraft();
    const a = d.aircraft?.[0];
    if (a?.reg && a.make) {
      setSubtitle(`${a.reg} · ${a.make} ${a.model}`);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const next = current + 1;
      if (next > STEPS.length) {
        router.replace(ROUTES.producer.cotizacion.resultado);
        return;
      }
      setCurrent(next);
    }, INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [current, router]);

  const pct = Math.min(100, Math.round((current / STEPS.length) * 100));

  return (
    <main className="flex flex-1 items-center justify-center px-6 pt-14 pb-20">
      <div className="flex w-full max-w-[520px] flex-col items-center">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
          <span className="arts-calc-halo absolute inset-0 rounded-full bg-[#C9A24A]" />
          <span className="absolute inset-2.5 rounded-full bg-[#0F1E33]" />
          <span className="relative flex h-14 w-11 flex-col justify-center gap-[5px] overflow-hidden rounded-[2px] bg-white px-2">
            <span className="h-0.5 w-full rounded-full bg-[#0F1E33] opacity-85" />
            <span className="h-0.5 w-[78%] rounded-full bg-[#0F1E33] opacity-55" />
            <span className="h-0.5 w-[92%] rounded-full bg-[#0F1E33] opacity-85" />
            <span className="h-0.5 w-[62%] rounded-full bg-[#0F1E33] opacity-40" />
            <span className="h-0.5 w-[84%] rounded-full bg-[#0F1E33] opacity-70" />
            <span className="arts-calc-scan absolute top-0 right-0 left-0 h-0.5 bg-[#C9A24A] shadow-[0_0_10px_2px_rgba(201,162,74,.75)]" />
          </span>
        </div>

        <h1 className="mt-[30px] mb-1.5 text-center text-xl font-semibold tracking-tight text-[#0F1E33]">
          Calculando cotización
        </h1>
        <p className="mt-0 mb-8 text-center text-[13.5px] text-[#6B7483]">{subtitle}</p>

        <div className="flex w-full flex-col gap-0.5">
          {STEPS.map((label, i) => {
            const done = i < current;
            const active = i === current;
            const visible = i <= current;
            return (
              <div
                key={label}
                className={`flex items-center gap-3 px-0.5 py-[11px] ${i < STEPS.length - 1 ? 'border-b border-[#F0F2F6]' : ''} ${visible ? 'arts-calc-row-in' : 'opacity-0'}`}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                  style={{
                    background: done
                      ? '#C9A24A'
                      : active
                        ? 'rgba(201,162,74,.14)'
                        : '#F0F2F6',
                    border: active ? '1px solid rgba(201,162,74,.45)' : '1px solid transparent',
                  }}
                >
                  {done ? (
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
                  {active ? (
                    <span className="arts-calc-pulse h-[7px] w-[7px] rounded-full bg-[#C9A24A]" />
                  ) : null}
                </span>
                <span
                  className="text-[14.5px] transition-colors duration-200"
                  style={{
                    fontWeight: active ? 600 : 500,
                    color: done ? '#5C6675' : active ? '#0F1E33' : '#9AA3AE',
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-[30px] h-[3px] w-full overflow-hidden rounded-[2px] bg-[#EDF0F4]">
          <span
            className="block h-full rounded-[2px] bg-[#C9A24A] transition-[width] duration-500"
            style={{
              width: `${pct}%`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        <p className="mt-4 mb-0 text-center text-xs tracking-wide text-[#9AA3AE]">
          Tarifas vigentes · ARTS Global Underwriting
        </p>
      </div>
    </main>
  );
}
