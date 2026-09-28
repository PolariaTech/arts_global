'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/shared/module/PageHeader';
import { PageMain } from '@/components/shared/module/PageMain';
import { SectionCard } from '@/components/shared/module/SectionCard';
import { GoldLink } from '@/components/shared/module/GoldLink';
import { StatCard } from '@/components/shared/cards/StatCard';
import { StatusBadge } from '@/components/shared/badges/StatusBadge';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/providers/auth/AuthProvider';
import { getProducerPanelData } from '@/services/mock/producerPanel';

export function ProducerPanelPage() {
  const { session } = useAuth();
  const name = session?.displayName ?? 'J. Salgado';
  const { stats, quotes, renewals, dateLine } = getProducerPanelData(name);

  return (
    <>
      <PageHeader
        title={`Buenos días, ${name}`}
        subtitle={dateLine}
        actions={
          <Link
            href={ROUTES.producer.cotizacion.paso1}
            className="inline-flex h-12 items-center gap-2.5 rounded-[3px] bg-[#C9A24A] px-[26px] text-[15px] font-semibold tracking-wide whitespace-nowrap text-[#0F1E33] no-underline shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
          >
            <span className="text-lg leading-none">+</span>
            Nueva cotización
          </Link>
        }
      />

      <PageMain>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
          {stats.map((st) => (
            <StatCard
              key={st.label}
              value={st.count}
              label={st.label}
              note={st.note}
              accent={st.accent}
            />
          ))}
        </div>

        <SectionCard
          title="Cotizaciones recientes"
          action={<GoldLink href={ROUTES.producer.misPolizas}>Ver todas</GoldLink>}
        >
          {quotes.length === 0 ? (
            <p className="m-0 px-6 py-10 text-center text-[13.5px] text-[#8A93A1]">
              No hay cotizaciones recientes.
            </p>
          ) : (
            quotes.map((q, i) => (
              <Link
                key={`${q.reg}-${q.date}-${q.insured}-${i}`}
                href={q.href}
                className="grid grid-cols-1 items-center gap-3 border-b border-[#F0F2F6] px-6 py-[15px] no-underline last:border-b-0 hover:bg-[#FAFBFC] sm:grid-cols-[minmax(200px,2fr)_minmax(78px,0.62fr)_minmax(104px,0.8fr)_minmax(62px,0.5fr)] sm:gap-x-[18px]"
              >
                <div className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[14.5px] leading-snug font-medium text-[#14181F] text-pretty">
                    {q.insured}
                  </span>
                  <span className="text-[12.5px] leading-snug text-[#8A93A1] text-pretty">
                    {q.aircraft}
                  </span>
                </div>
                <span className="text-[13.5px] font-semibold tracking-wide text-[#3B4553] tabular-nums">
                  {q.reg}
                </span>
                <StatusBadge label={q.status} />
                <span className="text-[12.5px] whitespace-nowrap text-[#8A93A1] sm:text-right">
                  {q.date}
                </span>
              </Link>
            ))
          )}
        </SectionCard>

        <SectionCard
          title="Próximas renovaciones"
          action={<GoldLink href={ROUTES.producer.misPolizas}>Ver todas</GoldLink>}
        >
          {renewals.length === 0 ? (
            <p className="m-0 px-6 py-10 text-center text-[13.5px] text-[#8A93A1]">
              No hay renovaciones en los próximos 60 días.
            </p>
          ) : (
            renewals.map((r) => (
              <div
                key={r.number}
                className="grid grid-cols-1 items-center gap-3 border-b border-[#F0F2F6] px-6 py-[15px] last:border-b-0 hover:bg-[#FAFBFC] sm:grid-cols-[minmax(200px,2.2fr)_minmax(104px,0.8fr)_minmax(74px,0.55fr)] sm:gap-x-[18px]"
              >
                <div className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[14.5px] leading-snug font-medium text-[#14181F] text-pretty">
                    {r.insured}
                  </span>
                  <span className="text-[12.5px] leading-snug text-[#8A93A1] text-pretty">
                    {r.policy} · {r.reg}
                  </span>
                </div>
                <span
                  className="text-[13.5px] font-semibold whitespace-nowrap tabular-nums"
                  style={{ color: r.urgent ? '#8A6E22' : '#3B4553' }}
                >
                  {r.daysLabel}
                </span>
                <span className="sm:justify-self-end">
                  <GoldLink href={r.href}>Renovar</GoldLink>
                </span>
              </div>
            ))
          )}
        </SectionCard>
      </PageMain>
    </>
  );
}
