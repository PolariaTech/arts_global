import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PolicyDetailPage } from '@/modules/policies/detail';
import { PolicyDetailSkeleton } from '@/components/shared/skeleton';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Detalle de póliza');

export default function Page() {
  return (
    <Suspense fallback={<PolicyDetailSkeleton />}>
      <PolicyDetailPage mode="claims" />
    </Suspense>
  );
}
