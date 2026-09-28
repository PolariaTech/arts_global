'use client';

import { usePathname } from 'next/navigation';
import { resolvePageSkeleton } from './resolvePageSkeleton';

/** Skeleton de navegación / Suspense según la ruta actual. */
export function RouteSkeleton() {
  const pathname = usePathname() ?? '/';
  return <>{resolvePageSkeleton(pathname)}</>;
}
