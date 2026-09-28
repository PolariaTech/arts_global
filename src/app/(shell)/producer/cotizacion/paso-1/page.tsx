import type { Metadata } from 'next';
import { InsuredStepPage } from '@/modules/quote/step-insured';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Cotización · Asegurado');

export default function Page() {
  return <InsuredStepPage />;
}
