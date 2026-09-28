'use client';

import { useEffect, useState } from 'react';
import { loadQuoteDraft, saveQuoteDraft } from '@/lib/storage/quoteDraft';
import { formatMoneyInput } from '@/modules/quote/shared/utils/money';
import { blankClaim, HISTORY_STEP_DEFAULTS } from '../constants/defaults';
import type { BackgroundKey } from '../constants/options';
import type { HistoryClaim, HistoryStepData } from '../types/historyStep';
import { claimsUnanswered, countPendingHistory } from '../utils/pending';

function readInitial(): { data: HistoryStepData; nextClaimId: number } {
  const d = loadQuoteDraft().historyStep;
  if (!d) {
    return { data: { ...HISTORY_STEP_DEFAULTS, claims: [blankClaim(1)] }, nextClaimId: 2 };
  }
  const claims =
    Array.isArray(d.claims) && d.claims.length > 0
      ? (d.claims as HistoryClaim[])
      : [blankClaim(1)];
  return {
    data: {
      ...HISTORY_STEP_DEFAULTS,
      ...d,
      claims,
      noClaims: d.noClaims === undefined ? true : !!d.noClaims,
    },
    nextClaimId: Math.max(...claims.map((c) => c.id), 0) + 1,
  };
}

export function useHistoryStep() {
  const [data, setData] = useState<HistoryStepData>({
    ...HISTORY_STEP_DEFAULTS,
    claims: [blankClaim(1)],
  });
  const [nextClaimId, setNextClaimId] = useState(2);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const init = readInitial();
    setData(init.data);
    setNextClaimId(init.nextClaimId);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteDraft({ historyStep: data });
  }, [data, hydrated]);

  function patch(partial: Partial<HistoryStepData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function toggleNoClaims() {
    setData((prev) => ({ ...prev, noClaims: !prev.noClaims }));
  }

  function patchClaim(id: number, partial: Partial<HistoryClaim>) {
    setData((prev) => ({
      ...prev,
      claims: prev.claims.map((c) => (c.id === id ? { ...c, ...partial } : c)),
    }));
  }

  function setClaimAmount(id: number, raw: string) {
    patchClaim(id, { amount: formatMoneyInput(raw) });
  }

  function addClaim() {
    setData((prev) => ({ ...prev, claims: [...prev.claims, blankClaim(nextClaimId)] }));
    setNextClaimId((n) => n + 1);
  }

  function removeClaim(id: number) {
    setData((prev) => ({
      ...prev,
      claims: prev.claims.length <= 1 ? prev.claims : prev.claims.filter((c) => c.id !== id),
    }));
  }

  function setBackground(key: BackgroundKey, value: boolean) {
    const detailKey = `${key}Detail` as keyof HistoryStepData;
    setData((prev) => ({
      ...prev,
      [key]: value,
      ...(value ? {} : { [detailKey]: '' }),
    }));
  }

  function setBackgroundDetail(key: BackgroundKey, detail: string) {
    const detailKey = `${key}Detail` as keyof HistoryStepData;
    setData((prev) => ({ ...prev, [detailKey]: detail }));
  }

  function toggleTerrain(label: string) {
    setData((prev) => {
      const has = prev.terrain.includes(label);
      return {
        ...prev,
        terrain: has ? prev.terrain.filter((t) => t !== label) : [...prev.terrain, label],
      };
    });
  }

  const pending = countPendingHistory(data);
  const progressNote =
    pending === 0 ? 'Listo para continuar' : `${pending} respuestas pendientes`;

  return {
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
    unanswered: claimsUnanswered(data),
    progressNote,
    hydrated,
  };
}
