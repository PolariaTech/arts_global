import type { Metadata } from 'next';
import { PilotsStepPage } from '@/modules/quote/step-pilots';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Cotización · Pilotos');

export default function Page() {
  return <PilotsStepPage />;
}
