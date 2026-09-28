import type { Metadata } from 'next';
import { PolicyRegistryPage } from '@/modules/policies/registry';
import { pageMetadata } from '@/config/pageTitles';

export const metadata: Metadata = pageMetadata('Registro de pólizas');

export default function Page() {
  return <PolicyRegistryPage mode="admin" />;
}
