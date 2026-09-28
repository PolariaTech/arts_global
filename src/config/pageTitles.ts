/**
 * Títulos de pestaña del navegador por ruta.
 * Formato final: "{título} · ARTS Global"
 */
export const APP_TAB_BRAND = 'ARTS Global';

const EXACT: Record<string, string> = {
  '/': 'Inicio',
  '/login': 'Iniciar sesión',
  '/perfil': 'Perfil',

  '/producer/panel': 'Panel del producer',
  '/producer/mis-polizas': 'Mis pólizas',
  '/producer/reportes': 'Reportes del producer',
  '/producer/polizas': 'Detalle de póliza',
  '/producer/cotizacion/paso-1': 'Cotización · Asegurado',
  '/producer/cotizacion/paso-2': 'Cotización · Aeronaves',
  '/producer/cotizacion/paso-3': 'Cotización · Pilotos',
  '/producer/cotizacion/paso-4': 'Cotización · Historial',
  '/producer/cotizacion/paso-5': 'Cotización · Cobertura',
  '/producer/cotizacion/calculando': 'Calculando prima',
  '/producer/cotizacion/resultado': 'Resultado de cotización',

  '/admin/portafolio': 'Panel de portafolio',
  '/admin/registro': 'Registro de pólizas',
  '/admin/reportes': 'Centro de reportes',
  '/admin/paises': 'Gestión de países',
  '/admin/paises/configuracion': 'Configuración de país',
  '/admin/usuarios': 'Gestión de usuarios',
  '/admin/polizas': 'Detalle de póliza',

  '/claims/reclamaciones': 'Pólizas con reclamación',
  '/claims/polizas': 'Detalle de póliza',

  '/auditor/auditoria': 'Historial de auditoría',
};

export function resolveTabTitle(
  pathname: string,
  searchParams?: URLSearchParams | null,
): string {
  const path = pathname.replace(/\/$/, '') || '/';
  let base = EXACT[path];

  if (!base) {
    if (path.startsWith('/producer/cotizacion')) base = 'Cotización';
    else if (path.startsWith('/producer')) base = 'Producer';
    else if (path.startsWith('/admin')) base = 'Administrator';
    else if (path.startsWith('/claims')) base = 'Claims Viewer';
    else if (path.startsWith('/auditor')) base = 'Auditor';
    else base = APP_TAB_BRAND;
  }

  const pol = searchParams?.get('pol')?.trim();
  if (pol && (path.endsWith('/polizas') || path.includes('/polizas'))) {
    base = `Póliza ${pol}`;
  }

  const pais = searchParams?.get('pais')?.trim();
  if (pais && path.includes('/paises/configuracion')) {
    base = `Configuración · ${pais}`;
  }

  if (base === APP_TAB_BRAND) return APP_TAB_BRAND;
  return `${base} · ${APP_TAB_BRAND}`;
}

/** Metadata estática para `export const metadata` en page.tsx */
export function pageMetadata(title: string) {
  return {
    title,
  };
}
