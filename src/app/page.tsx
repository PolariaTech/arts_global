import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Inicio');

export default function HomePage() {
  redirect(ROUTES.login);
}
