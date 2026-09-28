import type { Metadata } from 'next';
import { UsersListPage } from '@/modules/users/list';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Gestión de usuarios');

export default function Page() {
  return <UsersListPage />;
}
