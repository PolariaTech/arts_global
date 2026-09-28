import type { Metadata } from 'next';
import { AuditHistoryPage } from '@/modules/audit/history';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Historial de auditoría');

export default function Page() {
  return <AuditHistoryPage />;
}
