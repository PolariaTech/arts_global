/**
 * Paths de la app. Usar siempre estas constantes en links y redirects.
 */
export const ROUTES = {
  home: '/',
  login: '/login',
  perfil: '/perfil',

  producer: {
    panel: '/producer/panel',
    misPolizas: '/producer/mis-polizas',
    reportes: '/producer/reportes',
    cotizacion: {
      paso1: '/producer/cotizacion/paso-1',
      paso2: '/producer/cotizacion/paso-2',
      paso3: '/producer/cotizacion/paso-3',
      paso4: '/producer/cotizacion/paso-4',
      paso5: '/producer/cotizacion/paso-5',
      calculando: '/producer/cotizacion/calculando',
      resultado: '/producer/cotizacion/resultado',
    },
    polizaDetalle: (pol: string) => `/producer/polizas?pol=${encodeURIComponent(pol)}`,
  },

  admin: {
    portafolio: '/admin/portafolio',
    registro: '/admin/registro',
    reportes: '/admin/reportes',
    paises: '/admin/paises',
    paisConfig: (pais: string) =>
      `/admin/paises/configuracion?pais=${encodeURIComponent(pais)}`,
    usuarios: '/admin/usuarios',
    polizaDetalle: (pol: string) => `/admin/polizas?pol=${encodeURIComponent(pol)}`,
  },

  claims: {
    reclamaciones: '/claims/reclamaciones',
    polizaDetalle: (pol: string) => `/claims/polizas?pol=${encodeURIComponent(pol)}`,
  },

  auditor: {
    auditoria: '/auditor/auditoria',
  },
} as const;
