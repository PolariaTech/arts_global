'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatUsd } from '@/lib/format/money';
import { buildClaimsPolicyDetail } from '@/lib/policies/buildClaimsPolicyDetail';
import { resolvePolicyDetail } from '@/lib/policies/buildPolicyDetail';
import type { PolicyDetail, PolicyDocument, PolicyScheduleRow } from '@/types/policy/detail';

const PRORATION = 0.62;

export type PolicyDetailMode = 'producer' | 'admin' | 'claims';

export function usePolicyDetail(mode: PolicyDetailMode) {
  const searchParams = useSearchParams();
  const pol = searchParams.get('pol');

  const [hydrated, setHydrated] = useState(false);
  const [detail, setDetail] = useState<PolicyDetail | null>(null);
  const [schedule, setSchedule] = useState<PolicyScheduleRow[]>([]);
  const [documents, setDocuments] = useState<PolicyDocument[]>([]);
  const [toast, setToast] = useState('');
  const [removeOpen, setRemoveOpen] = useState(false);
  const [removeReg, setRemoveReg] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const resolved =
      mode === 'claims' ? buildClaimsPolicyDetail(pol) : resolvePolicyDetail(pol);
    setDetail(resolved);
    setSchedule(resolved.schedule);
    setDocuments(resolved.documents);
    setRemoveOpen(false);
    setRemoveReg(null);
  }, [hydrated, pol, mode]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const flash = useCallback((text: string) => setToast(text), []);

  const selected = useMemo(
    () => schedule.find((s) => s.reg === removeReg) ?? null,
    [schedule, removeReg],
  );

  const scheduleTotal = useMemo(
    () => schedule.reduce((sum, s) => sum + s.premium, 0),
    [schedule],
  );

  const scheduleCountLabel = useMemo(() => {
    const n = schedule.length;
    return `${n} ${n === 1 ? 'aeronave' : 'aeronaves'} · ${formatUsd(scheduleTotal)}`;
  }, [schedule.length, scheduleTotal]);

  const creditAmount = selected ? selected.premium * PRORATION : 0;

  function openRemove() {
    setRemoveReg(null);
    setRemoveOpen(true);
  }

  function closeRemove() {
    setRemoveOpen(false);
    setRemoveReg(null);
  }

  function confirmRemove() {
    if (!selected || !detail) return;
    const credit = selected.premium * PRORATION;
    const reg = selected.reg;
    const aircraft = selected.aircraft;
    setSchedule((prev) => prev.filter((s) => s.reg !== reg));
    setDocuments((prev) => [
      {
        name: 'Nota de crédito',
        meta: `NC-CR-2026-00142 · Póliza ${detail.number} · hoy · ${reg} removida`,
        signature: formatUsd(credit),
        state: 'ok',
        detail: `A favor del asegurado · ${Math.round(PRORATION * 100)}% de prima no utilizada sobre ${aircraft}.`,
      },
      ...prev,
    ]);
    setRemoveOpen(false);
    setRemoveReg(null);
    flash(`${reg} removida de la póliza · nota de crédito por ${formatUsd(credit)}`);
  }

  return {
    mode,
    hydrated,
    detail,
    schedule,
    documents,
    toast,
    flash,
    removeOpen,
    removeReg,
    setRemoveReg,
    openRemove,
    closeRemove,
    confirmRemove,
    selected,
    creditAmount,
    creditNote: selected
      ? `Prima no utilizada · ${Math.round(PRORATION * 100)}% del periodo restante`
      : '',
    scheduleCountLabel,
    readOnly: mode === 'claims',
  };
}
