'use client';

import { useEffect, useState } from 'react';
import { loadQuoteDraft, saveQuoteDraft } from '@/lib/storage/quoteDraft';
import { formatMoneyInput } from '@/modules/quote/shared/utils/money';
import { HELI_EQUIPMENT } from '../constants/options';
import { blankAircraft, seedAircraft } from '../constants/defaults';
import type { AircraftRecord } from '../types/aircraft';
import { countPendingAircraftFields } from '../utils/pending';

function readInitial(): { aircraft: AircraftRecord[]; nextId: number } {
  const saved = loadQuoteDraft().aircraft;
  const list =
    Array.isArray(saved) && saved.length > 0 ? (saved as AircraftRecord[]) : [seedAircraft(1)];
  const nextId = Math.max(...list.map((a) => a.id), 0) + 1;
  return { aircraft: list, nextId };
}

export function useAircraftStep() {
  const [aircraft, setAircraft] = useState<AircraftRecord[]>([seedAircraft(1)]);
  const [nextId, setNextId] = useState(2);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const init = readInitial();
    setAircraft(init.aircraft);
    setNextId(init.nextId);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteDraft({ aircraft });
  }, [aircraft, hydrated]);

  function patchAircraft(id: number, partial: Partial<AircraftRecord>) {
    setAircraft((list) => list.map((a) => (a.id === id ? { ...a, ...partial } : a)));
  }

  function setCategory(id: number, category: string) {
    const heli = category.startsWith('Helicóptero');
    setAircraft((list) =>
      list.map((a) => {
        if (a.id !== id) return a;
        return {
          ...a,
          category,
          equipment: heli
            ? a.equipment
            : a.equipment.filter((x) => !(HELI_EQUIPMENT as readonly string[]).includes(x)),
        };
      }),
    );
  }

  function setHull(id: number, raw: string) {
    patchAircraft(id, { hull: formatMoneyInput(raw) });
  }

  function toggleEquipment(id: number, label: string) {
    setAircraft((list) =>
      list.map((a) => {
        if (a.id !== id) return a;
        const has = a.equipment.includes(label);
        return {
          ...a,
          equipment: has ? a.equipment.filter((x) => x !== label) : [...a.equipment, label],
        };
      }),
    );
  }

  function addAircraft() {
    setAircraft((list) => [...list, blankAircraft(nextId)]);
    setNextId((n) => n + 1);
  }

  function removeAircraft(id: number) {
    setAircraft((list) => (list.length <= 1 ? list : list.filter((a) => a.id !== id)));
  }

  const pending = countPendingAircraftFields(aircraft);
  const progressNote =
    pending === 0 ? 'Listo para continuar' : `${pending} campos pendientes`;
  const countLabel =
    aircraft.length === 1
      ? '1 aeronave agregada'
      : `${aircraft.length} aeronaves agregadas`;

  return {
    aircraft,
    patchAircraft,
    setCategory,
    setHull,
    toggleEquipment,
    addAircraft,
    removeAircraft,
    pending,
    progressNote,
    countLabel,
    hydrated,
  };
}
