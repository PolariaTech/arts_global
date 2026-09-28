import type { Metadata } from 'next';
import { CalculatingPage } from '@/modules/quote/rating';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Calculando prima');

export default function Page() {
  return <CalculatingPage />;
}
