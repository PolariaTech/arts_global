import type { Metadata } from 'next';
import { AircraftStepPage } from '@/modules/quote/step-aircraft';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Cotización · Aeronaves');

export default function Page() {
  return <AircraftStepPage />;
}
