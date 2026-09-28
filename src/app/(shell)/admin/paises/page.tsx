import type { Metadata } from 'next';
import { CountriesListPage } from '@/modules/countries/list';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Gestión de países');

export default function Page() {
  return <CountriesListPage />;
}
