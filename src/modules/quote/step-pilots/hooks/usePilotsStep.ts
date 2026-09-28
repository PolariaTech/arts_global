'use client';

import { useEffect, useState } from 'react';
import { loadQuoteDraft, saveQuoteDraft } from '@/lib/storage/quoteDraft';
import {
  blankPilot,
  fleetFlagsFromAircraft,
  seedPilot,
} from '../constants/defaults';
import type { FleetFlags, PilotRecord } from '../types/pilot';
import { countPendingPilotFields } from '../utils/pending';

function readInitial(): {
  pilots: PilotRecord[];
  nextId: number;
  fleet: FleetFlags;
} {
  const d = loadQuoteDraft();
  const saved = d.pilots;
  const list =
    Array.isArray(saved) && saved.length > 0 ? (saved as PilotRecord[]) : [seedPilot(1)];
  return {
    pilots: list,
    nextId: Math.max(...list.map((p) => p.id), 0) + 1,
    fleet: fleetFlagsFromAircraft(d.aircraft),
  };
}

export function usePilotsStep() {
  const [pilots, setPilots] = useState<PilotRecord[]>([seedPilot(1)]);
  const [nextId, setNextId] = useState(2);
  const [fleet, setFleet] = useState<FleetFlags>({
    needsRetract: false,
    needsTurbine: false,
    needsHeli: false,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const init = readInitial();
    setPilots(init.pilots);
    setNextId(init.nextId);
    setFleet(init.fleet);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteDraft({ pilots });
  }, [pilots, hydrated]);

  function patchPilot(id: number, partial: Partial<PilotRecord>) {
    setPilots((list) => list.map((p) => (p.id === id ? { ...p, ...partial } : p)));
  }

  function toggleRating(id: number, label: string) {
    setPilots((list) =>
      list.map((p) => {
        if (p.id !== id) return p;
        const has = p.ratings.includes(label);
        return {
          ...p,
          ratings: has ? p.ratings.filter((r) => r !== label) : [...p.ratings, label],
          ...(label === 'Tailwheel' && has ? { tailwheel: '' } : {}),
        };
      }),
    );
  }

  function addPilot() {
    setPilots((list) => [...list, blankPilot(nextId)]);
    setNextId((n) => n + 1);
  }

  function removePilot(id: number) {
    setPilots((list) => {
      if (list.length <= 1) return list;
      // No quitar el principal (índice 0) — solo adicionales, como el mockup
      if (list[0]?.id === id) return list;
      return list.filter((p) => p.id !== id);
    });
  }

  const pending = countPendingPilotFields(pilots);
  const count = pilots.length;
  const progressNote =
    pending === 0
      ? count === 1
        ? '1 piloto · listo para continuar'
        : `${count} pilotos · listo para continuar`
      : `${pending} campos pendientes`;

  return {
    pilots,
    fleet,
    patchPilot,
    toggleRating,
    addPilot,
    removePilot,
    progressNote,
    hydrated,
  };
}
