'use client';

import { Suspense } from 'react';
import { NavigationSkeletonGate } from './NavigationSkeletonGate';
import { RouteSkeleton } from './RouteSkeleton';

export function NavigationSkeletonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <NavigationSkeletonGate>{children}</NavigationSkeletonGate>
    </Suspense>
  );
}
