import type { Metadata } from 'next';
import { ProducerReportsPage } from '@/modules/reports/producer';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Reportes del producer');

export default function Page() {
  return <ProducerReportsPage />;
}
