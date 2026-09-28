'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { ROUTES } from '@/config/routes';
import { WizardNav } from '@/modules/quote/shared/components/WizardNav';
import { QuoteWizardSkeleton } from '@/components/shared/skeleton';
import { usePilotsStep } from '../hooks/usePilotsStep';
import { PilotCard } from './PilotCard';

export function PilotsStepForm() {
  const router = useRouter();
  const {
    pilots,
    fleet,
    patchPilot,
    toggleRating,
    addPilot,
    removePilot,
    progressNote,
    hydrated,
  } = usePilotsStep();

  if (!hydrated) return <QuoteWizardSkeleton />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(ROUTES.producer.cotizacion.paso4);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-5"
    >
      {pilots.map((p, i) => (
        <PilotCard
          key={p.id}
          pilot={p}
          index={i}
          fleet={fleet}
          onPatch={(partial) => patchPilot(p.id, partial)}
          onToggleRating={(label) => toggleRating(p.id, label)}
          onRemove={() => removePilot(p.id)}
        />
      ))}

      <div>
        <button
          type="button"
          onClick={addPilot}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[3px] border border-dashed border-[#C2C9D3] bg-white px-[18px] text-sm font-semibold text-[#0F1E33] hover:border-[#C9A24A] hover:bg-[#FDFBF6]"
          style={{ fontFamily: 'inherit' }}
        >
          <span className="text-[17px] leading-none text-[#C9A24A]">+</span>
          Agregar otro piloto
        </button>
      </div>

      <WizardNav
        backHref={ROUTES.producer.cotizacion.paso2}
        progressNote={progressNote}
      />
    </form>
  );
}
