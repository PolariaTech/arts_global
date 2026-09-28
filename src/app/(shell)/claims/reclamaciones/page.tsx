import type { Metadata } from 'next';
import { ClaimsListPage } from '@/modules/claims/list';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Pólizas con reclamación');

export default function Page() {
  return <ClaimsListPage />;
}
