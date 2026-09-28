import type { Metadata } from 'next';
import { ProfilePage } from '@/modules/auth/components/ProfilePage';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Perfil');

export default function Page() {
  return <ProfilePage />;
}
