'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HOME_BY_ROLE } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { roleAllowedForPath } from '@/lib/auth/rolePath';
import { useAuth } from '@/providers/auth/AuthProvider';
import { ShellAuthSkeleton } from '@/components/shared/skeleton';

/** Protege rutas del shell: sesión requerida + rol correcto. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace(ROUTES.login);
      return;
    }
    if (!roleAllowedForPath(session.role, pathname)) {
      router.replace(HOME_BY_ROLE[session.role]);
    }
  }, [ready, session, pathname, router]);

  if (!ready || !session) {
    return <ShellAuthSkeleton />;
  }

  if (!roleAllowedForPath(session.role, pathname)) {
    return <ShellAuthSkeleton />;
  }

  return <>{children}</>;
}
