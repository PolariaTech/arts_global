'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { RouteSkeleton } from '@/components/shared/skeleton/RouteSkeleton';
import { SKELETON_MIN_MS } from '@/hooks/useMinLoad';

/**
 * En cada cambio de ruta (o query) muestra el skeleton de esa página
 * durante al menos 1 s para que sea perceptible.
 */
export function NavigationSkeletonGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = `${pathname}?${searchParams.toString()}`;
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    setBusy(true);
    const t = window.setTimeout(() => setBusy(false), SKELETON_MIN_MS);
    return () => window.clearTimeout(t);
  }, [key]);

  if (busy) return <RouteSkeleton />;
  return <>{children}</>;
}
