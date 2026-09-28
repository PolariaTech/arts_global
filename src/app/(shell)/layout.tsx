import { AppShell } from '@/components/layouts/shell/AppShell';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
