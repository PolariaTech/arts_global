'use client';

import { PageHeader } from '@/components/shared/module/PageHeader';
import { PageMain } from '@/components/shared/module/PageMain';
import { SectionCard } from '@/components/shared/module/SectionCard';
import { ROLE_HINTS } from '@/constants/roles';
import { useAuth } from '@/providers/auth/AuthProvider';

const SCOPE_BY_ROLE: Record<string, string> = {
  Producer: 'Panamá',
  Administrator: 'Global',
  'Claims Viewer': 'Todos los países · solo lectura',
  Auditor: 'Registro histórico · solo lectura',
};

export function ProfilePage() {
  const { session } = useAuth();

  if (!session) {
    return (
      <>
        <PageHeader title="Perfil" subtitle="Sesión no disponible" />
        <PageMain>
          <SectionCard title="Cuenta">
            <p className="m-0 px-6 py-10 text-center text-[13.5px] text-[#8A93A1]">
              Inicia sesión para ver tu perfil.
            </p>
          </SectionCard>
        </PageMain>
      </>
    );
  }

  const rows = [
    { label: 'Nombre', value: session.displayName },
    { label: 'Correo', value: session.email },
    { label: 'Rol', value: session.role },
    { label: 'Alcance', value: SCOPE_BY_ROLE[session.role] ?? '—' },
    { label: 'Permisos', value: ROLE_HINTS[session.role] },
  ];

  return (
    <>
      <PageHeader
        title="Perfil"
        subtitle="Datos de la sesión actual · solo lectura"
        actions={
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8DDE5] bg-[#EEF1F6] text-[13px] font-semibold text-[#0F1E33]">
            {session.initials}
          </span>
        }
      />
      <PageMain>
        <SectionCard title="Cuenta">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-6 ${
                i === rows.length - 1 ? '' : 'border-b border-[#F0F2F6]'
              }`}
            >
              <span className="text-[12px] font-semibold tracking-[0.06em] text-[#8A93A1] uppercase">
                {r.label}
              </span>
              <span className="text-[14.5px] font-medium text-[#14181F]">{r.value}</span>
            </div>
          ))}
        </SectionCard>
      </PageMain>
    </>
  );
}
