'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { ROUTES } from '@/config/routes';
import { WizardNav } from '@/modules/quote/shared/components/WizardNav';
import { QuoteWizardSkeleton } from '@/components/shared/skeleton';
import { useAircraftStep } from '../hooks/useAircraftStep';
import { AircraftCard } from './AircraftCard';

export function AircraftStepForm() {
  const router = useRouter();
  const {
    aircraft,
    patchAircraft,
    setCategory,
    setHull,
    toggleEquipment,
    addAircraft,
    removeAircraft,
    progressNote,
    countLabel,
    hydrated,
  } = useAircraftStep();

  if (!hydrated) return <QuoteWizardSkeleton />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(ROUTES.producer.cotizacion.paso3);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-5"
    >
      <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7 shadow-[0_1px_2px_rgba(15,30,51,.04)]">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 text-[15px] font-semibold tracking-wide text-[#0F1E33]">
            Aeronaves
          </h2>
          <span className="text-[12.5px] font-semibold tracking-wide text-[#8A6E22]">
            {countLabel}
          </span>
        </div>
        <p className="mt-0 mb-5 text-[13px] text-[#6B7483]">
          Identificación, estado mecánico y equipamiento de cada aeronave.
        </p>

        {aircraft.map((ac, i) => (
          <AircraftCard
            key={ac.id}
            aircraft={ac}
            index={i}
            total={aircraft.length}
            isLast={i === aircraft.length - 1}
            onPatch={(partial) => patchAircraft(ac.id, partial)}
            onCategory={(category) => setCategory(ac.id, category)}
            onHull={(raw) => setHull(ac.id, raw)}
            onToggleEquip={(label) => toggleEquipment(ac.id, label)}
            onRemove={() => removeAircraft(ac.id)}
          />
        ))}

        <button
          type="button"
          onClick={addAircraft}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[3px] border border-dashed border-[#C2C9D3] bg-white px-[18px] text-sm font-semibold text-[#0F1E33] hover:border-[#C9A24A] hover:bg-[#FDFBF6]"
          style={{ fontFamily: 'inherit' }}
        >
          <span className="text-[17px] leading-none text-[#C9A24A]">+</span>
          Agregar otra aeronave
        </button>
      </section>

      <WizardNav
        backHref={ROUTES.producer.cotizacion.paso1}
        progressNote={progressNote}
      />
    </form>
  );
}
