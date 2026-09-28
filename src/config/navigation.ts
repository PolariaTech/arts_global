import { ROUTES } from '@/config/routes';
import { ROLES, type ArtsRole } from '@/constants/roles';

export type NavItem = {
  label: string;
  href: string;
};

export type RoleNav = {
  group: string;
  roleLabel: string;
  items: NavItem[];
};

/** Sidebar por rol — alineado al mockup ARTS. */
export const NAV_BY_ROLE: Record<ArtsRole, RoleNav> = {
  [ROLES.producer]: {
    group: 'Producer',
    roleLabel: 'Producer · Panamá',
    items: [
      { label: 'Panel', href: ROUTES.producer.panel },
      { label: 'Mis pólizas', href: ROUTES.producer.misPolizas },
      { label: 'Reportes', href: ROUTES.producer.reportes },
      { label: 'Nueva cotización', href: ROUTES.producer.cotizacion.paso1 },
    ],
  },
  [ROLES.administrator]: {
    group: 'Administrator',
    roleLabel: 'Administrator · Global',
    items: [
      { label: 'Panel de portafolio', href: ROUTES.admin.portafolio },
      { label: 'Registro de pólizas', href: ROUTES.admin.registro },
      { label: 'Reportes', href: ROUTES.admin.reportes },
      { label: 'Gestión de países', href: ROUTES.admin.paises },
      { label: 'Gestión de usuarios', href: ROUTES.admin.usuarios },
    ],
  },
  [ROLES.claimsViewer]: {
    group: 'Claims Viewer',
    roleLabel: 'Claims Viewer',
    items: [
      { label: 'Pólizas con reclamación', href: ROUTES.claims.reclamaciones },
    ],
  },
  [ROLES.auditor]: {
    group: 'Auditor',
    roleLabel: 'Auditor · Solo lectura',
    items: [{ label: 'Historial de auditoría', href: ROUTES.auditor.auditoria }],
  },
};

export const HOME_BY_ROLE: Record<ArtsRole, string> = {
  [ROLES.producer]: ROUTES.producer.panel,
  [ROLES.administrator]: ROUTES.admin.portafolio,
  [ROLES.claimsViewer]: ROUTES.claims.reclamaciones,
  [ROLES.auditor]: ROUTES.auditor.auditoria,
};
