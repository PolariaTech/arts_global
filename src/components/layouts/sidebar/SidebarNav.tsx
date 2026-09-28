'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/config/navigation';

type SidebarNavProps = {
  items: NavItem[];
};

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  // Cotización: marcar activo en cualquier paso del wizard
  if (href.includes('/cotizacion/') && pathname.includes('/cotizacion/')) return true;
  return pathname.startsWith(`${href}/`);
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="arts-sb-nav">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? 'arts-sb-link arts-sb-link-active' : 'arts-sb-link'}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
