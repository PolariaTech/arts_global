import {
  CountryConfigSkeleton,
  DashboardSkeleton,
  ListPageSkeleton,
  LoginSkeleton,
  PolicyDetailSkeleton,
  ProfileSkeleton,
  QuoteResultSkeleton,
  QuoteWizardSkeleton,
  ReportsSkeleton,
} from './pageSkeletons';

/** Elige el skeleton que mejor refleja el layout de la ruta. */
export function resolvePageSkeleton(pathname: string): React.ReactNode {
  const path = pathname.replace(/\/$/, '') || '/';

  if (path === '/login' || path === '/') return <LoginSkeleton />;
  if (path === '/perfil') return <ProfileSkeleton />;

  if (path.includes('/reportes')) return <ReportsSkeleton />;
  if (path.endsWith('/polizas') || path.includes('/polizas')) {
    return <PolicyDetailSkeleton />;
  }
  if (path.includes('/paises/configuracion')) return <CountryConfigSkeleton />;
  if (path.includes('/cotizacion/resultado')) return <QuoteResultSkeleton />;
  if (path.includes('/cotizacion/calculando')) return <QuoteWizardSkeleton />;
  if (path.includes('/cotizacion')) return <QuoteWizardSkeleton />;

  if (path === '/producer/panel') return <DashboardSkeleton stats={3} />;
  if (path === '/admin/portafolio') {
    return <DashboardSkeleton countryCards stats={4} />;
  }

  if (
    path.includes('/mis-polizas') ||
    path.includes('/registro') ||
    path.includes('/reclamaciones') ||
    path.includes('/auditoria') ||
    path.includes('/usuarios') ||
    path.includes('/paises')
  ) {
    const cols = path.includes('/auditoria')
      ? 5
      : path.includes('/usuarios')
        ? 5
        : path.includes('/reclamaciones')
          ? 5
          : 6;
    return (
      <ListPageSkeleton
        columns={cols}
        filterCount={path.includes('/auditoria') ? 5 : 4}
        rows={8}
      />
    );
  }

  return <DashboardSkeleton />;
}
