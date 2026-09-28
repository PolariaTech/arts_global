'use client';

import { useState } from 'react';
import { NAV_BY_ROLE } from '@/config/navigation';
import { RequireAuth } from '@/components/auth/guards/RequireAuth';
import { Sidebar } from '@/components/layouts/sidebar/Sidebar';
import { NavigationSkeletonProvider } from '@/components/shared/skeleton/NavigationSkeletonProvider';
import { useAuth } from '@/providers/auth/AuthProvider';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { session } = useAuth();

  return (
    <RequireAuth>
      {session ? (
        <div
          id="arts-shell"
          className={collapsed ? 'arts-shell arts-shell-collapsed' : 'arts-shell'}
        >
          <button
            type="button"
            className="arts-sb-reopen"
            title="Mostrar menú"
            aria-label="Mostrar menú"
            onClick={() => setCollapsed(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 3h12M2 8h12M2 13h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Sidebar
            nav={NAV_BY_ROLE[session.role]}
            displayName={session.displayName}
            initials={session.initials}
            onCollapse={() => setCollapsed(true)}
          />

          <div className="arts-shell-main">
            <NavigationSkeletonProvider>{children}</NavigationSkeletonProvider>
          </div>
        </div>
      ) : null}
    </RequireAuth>
  );
}
