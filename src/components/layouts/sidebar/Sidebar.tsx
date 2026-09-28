'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import type { RoleNav } from '@/config/navigation';
import { APP_VERSION } from '@/constants/app/version';
import { useAuth } from '@/providers/auth/AuthProvider';
import { ArtsLogo } from './ArtsLogo';
import { SidebarNav } from './SidebarNav';

type SidebarProps = {
  nav: RoleNav;
  displayName: string;
  initials: string;
  onCollapse: () => void;
};

export function Sidebar({ nav, displayName, initials, onCollapse }: SidebarProps) {
  const { logout } = useAuth();
  const router = useRouter();

  function onLogout(e: React.MouseEvent) {
    e.preventDefault();
    logout();
    router.replace(ROUTES.login);
  }

  return (
    <aside id="arts-sb" className="arts-sb" aria-label="Menú principal">
      <button
        type="button"
        className="arts-sb-toggle"
        title="Ocultar menú"
        aria-label="Ocultar menú"
        onClick={onCollapse}
      >
        <MenuIcon />
      </button>

      <div className="arts-sb-brand">
        <ArtsLogo size={24} />
        <div className="arts-sb-brand-text">
          <span className="arts-sb-brand-name">
            ARTS <em>Global</em>
          </span>
        </div>
      </div>

      <div className="arts-sb-user">
        <span className="arts-sb-avatar" aria-hidden="true">
          {initials}
        </span>
        <div className="arts-sb-user-text">
          <span className="arts-sb-u-name">{displayName}</span>
          <span className="arts-sb-u-role">{nav.roleLabel}</span>
        </div>
      </div>

      <div className="arts-sb-group">{nav.group}</div>
      <SidebarNav items={nav.items} />

      <p className="arts-sb-version" aria-label={`Versión ${APP_VERSION}`}>
        v{APP_VERSION}
      </p>
      <div className="arts-sb-logout">
        <a href={ROUTES.login} onClick={onLogout}>
          Cerrar sesión
        </a>
      </div>
    </aside>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 3h12M2 8h12M2 13h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
