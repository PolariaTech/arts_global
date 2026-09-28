import type { Metadata } from 'next';
import { HistoryStepPage } from '@/modules/quote/step-history';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Cotización · Historial');

export default function Page() {
  return <HistoryStepPage />;
}
