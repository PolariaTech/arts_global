import type { Metadata } from 'next';
import { AdminReportsPage } from '@/modules/reports/admin';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Centro de reportes');

export default function Page() {
  return <AdminReportsPage />;
}
