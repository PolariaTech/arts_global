import type { Metadata } from 'next';
import { ProducerPanelPage } from '@/modules/producer/panel';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Panel del producer');

export default function Page() {
  return <ProducerPanelPage />;
}
