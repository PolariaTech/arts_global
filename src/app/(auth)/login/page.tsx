import type { Metadata } from 'next';
import { LoginPage } from '@/modules/auth';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Iniciar sesión');

export default function Page() {
  return <LoginPage />;
}
