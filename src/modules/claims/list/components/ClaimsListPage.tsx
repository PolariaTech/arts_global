import Link from 'next/link';
import { PageHeader } from '@/components/shared/module/PageHeader';
import { PageMain } from '@/components/shared/module/PageMain';
import { StatusBadge } from '@/components/shared/badges/StatusBadge';
import { listClaims } from '@/services/mock/claims';

export function ClaimsListPage() {
  const rows = listClaims();

  return (
    <>
      <PageHeader
        title="Pólizas con reclamación"
        subtitle="Acceso de Claims Viewer · solo lectura"
        maxWidth="min(1300px, 94vw)"
        below={
          <div className="flex items-start gap-2.5 rounded border border-[#E8CE84] bg-[#FBF6EA] px-4 py-3">
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            >
              <circle cx="8" cy="8" r="6.4" fill="none" stroke="#8A6E22" strokeWidth="1.4" />
              <path d="M8 5.2 V8.6" stroke="#8A6E22" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.9" fill="#8A6E22" />
            </svg>
            <p className="m-0 text-[13px] leading-relaxed text-[#6B5A2E]">
              Este rol solo ve las pólizas de la cartera de 369 que tienen un reclamo activo o
              reciente — no el registro completo. Seleccione una póliza para ver su detalle en modo
              solo lectura; no puede editar coberturas, documentos ni notas de reclamo.
            </p>
          </div>
        }
      />

      <PageMain maxWidth="min(1300px, 94vw)">
        <span className="text-[13px] text-[#6B7483]">
          {rows.length} pólizas con reclamación
        </span>

        <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
          <div className="overflow-x-auto">
            <div className="grid min-w-[980px] grid-cols-[minmax(150px,0.9fr)_minmax(190px,1.6fr)_minmax(150px,1fr)_minmax(120px,0.8fr)_minmax(150px,1fr)_minmax(108px,0.7fr)] gap-x-4 gap-y-3 border-b border-[#E4E8EE] bg-[#FAFBFC] px-[22px] py-3">
              {['Número de póliza', 'Asegurado', 'País', 'Reclamo', 'Estado', 'Reportado'].map(
                (h) => (
                  <span
                    key={h}
                    className="text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase"
                  >
                    {h}
                  </span>
                ),
              )}
            </div>
            {rows.map((c) => (
              <Link
                key={c.number}
                href={c.href}
                className="grid min-w-[980px] grid-cols-[minmax(150px,0.9fr)_minmax(190px,1.6fr)_minmax(150px,1fr)_minmax(120px,0.8fr)_minmax(150px,1fr)_minmax(108px,0.7fr)] items-center gap-x-4 gap-y-3 border-b border-[#F0F2F6] px-[22px] py-3.5 no-underline last:border-b-0 hover:bg-[#FAFBFC]"
              >
                <span className="text-[13.5px] font-semibold tracking-wide text-[#0F1E33] tabular-nums">
                  {c.number}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-sm font-medium text-[#14181F]">{c.insured}</span>
                  <span className="text-xs text-[#8A93A1]">
                    {c.aircraft} · {c.reg}
                  </span>
                </div>
                <span className="text-[13.5px] text-[#3B4553]">{c.country}</span>
                <span className="text-[13px] text-[#3B4553]">{c.claimCause}</span>
                <StatusBadge label={c.stage} />
                <span className="text-[13px] whitespace-nowrap text-[#5C6675]">{c.reported}</span>
              </Link>
            ))}
          </div>
        </section>
      </PageMain>
    </>
  );
}
