import type { Metadata } from 'next';
import { Suspense } from 'react';
import { QuoteResultPage } from '@/modules/quote/result';
import { QuoteResultSkeleton } from '@/components/shared/skeleton';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Resultado de cotización');

export default function Page() {
  return (
    <Suspense fallback={<QuoteResultSkeleton />}>
      <QuoteResultPage />
    </Suspense>
  );
}
