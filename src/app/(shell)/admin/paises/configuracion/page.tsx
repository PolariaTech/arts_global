import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CountryConfigPage } from '@/modules/countries/config';
import { CountryConfigSkeleton } from '@/components/shared/skeleton';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Configuración de país');

export default function Page() {
  return (
    <Suspense fallback={<CountryConfigSkeleton />}>
      <CountryConfigPage />
    </Suspense>
  );
}
