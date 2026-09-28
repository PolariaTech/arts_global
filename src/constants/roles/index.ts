export const ROLES = {
  producer: 'Producer',
  administrator: 'Administrator',
  claimsViewer: 'Claims Viewer',
  auditor: 'Auditor',
} as const;

export type ArtsRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HINTS: Record<ArtsRole, string> = {
  [ROLES.producer]: 'Cotiza y vincula pólizas propias en los países asignados.',
  [ROLES.claimsViewer]: 'Consulta siniestros y pólizas; sin permisos de emisión.',
  [ROLES.administrator]: 'Acceso total: configuración de países, usuarios y portafolio.',
  [ROLES.auditor]: 'Solo lectura sobre el registro histórico completo.',
};

/** Cuentas demo del mockup — el correo fija el rol. */
export const DEMO_ACCOUNTS = [
  {
    email: 'jsalgado@producer.arts',
    role: ROLES.producer,
    displayName: 'J. Salgado',
  },
  {
    email: 'arestrepo@administrator.arts',
    role: ROLES.administrator,
    displayName: 'A. Restrepo',
  },
  {
    email: 'smarquez@claimsviewer.arts',
    role: ROLES.claimsViewer,
    displayName: 'S. Márquez',
  },
  {
    email: 'tiriarte@auditor.arts',
    role: ROLES.auditor,
    displayName: 'T. Iriarte',
  },
] as const;
