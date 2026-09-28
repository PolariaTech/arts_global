'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { resolveTabTitle } from '@/config/pageTitles';

/** Actualiza el título de la pestaña según la ruta (y query params). */
export function TabTitle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    document.title = resolveTabTitle(pathname, searchParams);
  }, [pathname, searchParams]);

  return null;
}
