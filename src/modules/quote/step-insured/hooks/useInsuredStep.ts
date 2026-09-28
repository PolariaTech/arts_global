'use client';

import { useEffect, useState } from 'react';
import { loadQuoteDraft, saveQuoteDraft } from '@/lib/storage/quoteDraft';
import { INSURED_STEP_DEFAULTS } from '../constants/defaults';
import type { InsuredStepData } from '../types/insuredStep';
import { formatMoneyInput } from '@/modules/quote/shared/utils/money';
import { countPendingInsuredFields } from '../utils/pendingFields';

function readInitial(): InsuredStepData {
  const draft = loadQuoteDraft().insuredStep;
  if (!draft) return { ...INSURED_STEP_DEFAULTS };
  return {
    ...INSURED_STEP_DEFAULTS,
    ...draft,
    declined: draft.declined === undefined ? INSURED_STEP_DEFAULTS.declined : draft.declined,
    lien: draft.lien === undefined ? INSURED_STEP_DEFAULTS.lien : draft.lien,
  };
}

export function useInsuredStep() {
  const [data, setData] = useState<InsuredStepData>(INSURED_STEP_DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(readInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteDraft({ insuredStep: data });
  }, [data, hydrated]);

  function patch(partial: Partial<InsuredStepData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function setLienAmount(raw: string) {
    patch({ lienAmount: formatMoneyInput(raw) });
  }

  const pending = countPendingInsuredFields(data);
  const progressNote =
    pending === 0 ? 'Listo para continuar' : `${pending} campos pendientes`;

  return { data, patch, setLienAmount, pending, progressNote, hydrated };
}
