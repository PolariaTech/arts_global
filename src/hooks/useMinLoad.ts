'use client';

import { useEffect, useState } from 'react';

export const SKELETON_MIN_MS = 1000;

/**
 * Mantiene el skeleton visible al menos `ms` desde el montaje
 * (o hasta que `ready` sea true, lo que tarde más).
 */
export function useMinLoad(ready = true, ms: number = SKELETON_MIN_MS): boolean {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    setElapsed(false);
    const t = window.setTimeout(() => setElapsed(true), ms);
    return () => window.clearTimeout(t);
  }, [ms]);

  return ready && elapsed;
}
