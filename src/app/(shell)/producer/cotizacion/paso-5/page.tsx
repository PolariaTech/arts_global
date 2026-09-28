import type { Metadata } from 'next';
import { CoverageStepPage } from '@/modules/quote/step-coverage';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Cotización · Cobertura');

export default function Page() {
  return <CoverageStepPage />;
}
