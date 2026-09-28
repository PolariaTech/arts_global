import type { ArtsRole } from '@/constants/roles';
import { ROLES } from '@/constants/roles';

/** Prefijo de ruta permitido por rol. */
export function roleAllowedForPath(role: ArtsRole, pathname: string): boolean {
  if (pathname.startsWith('/perfil')) return true;
  if (pathname.startsWith('/producer')) return role === ROLES.producer;
  if (pathname.startsWith('/admin')) return role === ROLES.administrator;
  if (pathname.startsWith('/claims')) return role === ROLES.claimsViewer;
  if (pathname.startsWith('/auditor')) return role === ROLES.auditor;
  return true;
}
