'use client';

import { Suspense } from 'react';
import { TabTitle } from './TabTitle';

/** Suspense: useSearchParams exige boundary en App Router. */
export function TabTitleProvider() {
  return (
    <Suspense fallback={null}>
      <TabTitle />
    </Suspense>
  );
}
