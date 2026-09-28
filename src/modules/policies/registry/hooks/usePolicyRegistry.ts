'use client';

import { useMemo, useState } from 'react';
import {
  EMPTY_POLICY_FILTERS,
  hasActiveFilters,
  type PolicyFilters,
} from '@/lib/policies/filterPolicies';
import {
  exportPoliciesCsv,
  filterRegistryPolicies,
  listRegistryPolicies,
  type PolicyRegistryMode,
} from '@/services/mock/policies';

export function usePolicyRegistry(mode: PolicyRegistryMode, producerName: string) {
  const [filters, setFilters] = useState<PolicyFilters>(EMPTY_POLICY_FILTERS);
  const [focus, setFocus] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const baseCount = useMemo(
    () => listRegistryPolicies(mode, producerName).length,
    [mode, producerName],
  );

  const rows = useMemo(
    () => filterRegistryPolicies(mode, filters, producerName),
    [mode, filters, producerName],
  );

  const active = hasActiveFilters(filters);

  const resultCount =
    rows.length === baseCount
      ? `${baseCount} pólizas`
      : `${rows.length} de ${baseCount} pólizas`;

  function setFilter<K extends keyof PolicyFilters>(key: K, value: PolicyFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(EMPTY_POLICY_FILTERS);
  }

  function exportRegistry() {
    const stamp = new Date().toISOString().slice(0, 10);
    const name =
      mode === 'producer'
        ? `mis-polizas-${stamp}.csv`
        : `registro-polizas-${stamp}.csv`;
    exportPoliciesCsv(rows, name);
    setToast(`Exportación lista · ${rows.length} filas`);
    window.setTimeout(() => setToast(''), 2600);
  }

  return {
    filters,
    setFilter,
    clearFilters,
    focus,
    setFocus,
    rows,
    resultCount,
    baseCount,
    hasFilters: active,
    exportRegistry,
    toast,
  };
}
