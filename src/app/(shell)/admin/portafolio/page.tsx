import type { Metadata } from 'next';
import { PortfolioDashboardPage } from '@/modules/portfolio/dashboard';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Panel de portafolio');

export default function Page() {
  return <PortfolioDashboardPage />;
}
