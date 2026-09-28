'use client';

import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { formatUsd } from '@/lib/format/money';
import { GoldLink } from '@/components/shared/module/GoldLink';
import { PolicyDetailSkeleton } from '@/components/shared/skeleton';
import { RemoveAircraftModal } from './RemoveAircraftModal';
import {
  usePolicyDetail,
  type PolicyDetailMode,
} from '../hooks/usePolicyDetail';

type PolicyDetailPageProps = {
  mode: PolicyDetailMode;
};

const BACK: Record<
  PolicyDetailMode,
  { href: string; label: string; crumb: string }
> = {
  producer: {
    href: ROUTES.producer.misPolizas,
    label: 'Volver a mis pólizas',
    crumb: 'Mis pólizas',
  },
  admin: {
    href: ROUTES.admin.registro,
    label: 'Volver al registro',
    crumb: 'Registro de pólizas',
  },
  claims: {
    href: ROUTES.claims.reclamaciones,
    label: 'Volver a la lista',
    crumb: 'Pólizas con reclamación',
  },
};

function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] px-6 pt-[18px] pb-[15px]">
      <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
        {children}
      </h2>
      {action}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)] ${className}`}
    >
      {children}
    </section>
  );
}

function DocBadge({ state, label }: { state: 'ok' | 'pending' | 'neutral'; label: string }) {
  const styles =
    state === 'ok'
      ? { bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF' }
      : state === 'pending'
        ? { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' }
        : { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA' };
  return (
    <span
      className="inline-flex items-center rounded-[3px] border px-2 py-1 text-[11px] font-semibold whitespace-nowrap"
      style={{ background: styles.bg, color: styles.color, borderColor: styles.border }}
    >
      {label}
    </span>
  );
}

export function PolicyDetailPage({ mode }: PolicyDetailPageProps) {
  const {
    hydrated,
    detail,
    schedule,
    documents,
    toast,
    flash,
    removeOpen,
    removeReg,
    setRemoveReg,
    openRemove,
    closeRemove,
    confirmRemove,
    creditAmount,
    creditNote,
    scheduleCountLabel,
    readOnly,
  } = usePolicyDetail(mode);

  const back = BACK[mode];
  const maxWidth = readOnly ? 'min(1500px, 94vw)' : 'min(1568px, 94vw)';

  if (!hydrated || !detail) {
    return <PolicyDetailSkeleton />;
  }

  const canRemove = schedule.length >= 2;
  const renewalOpen = detail.renewalOpen;

  const actions = [
    {
      key: 'endosar',
      title: 'Endosar',
      icon: '✎',
      desc: 'Modificar datos de la póliza (asegurado, sumas aseguradas, tasas, deducibles).',
      disabled: false,
      danger: false,
      onClick: () => flash(`Abriendo endoso · Póliza ${detail.number}`),
    },
    {
      key: 'remove',
      title: 'Remover una aeronave',
      icon: '✈',
      desc: canRemove
        ? 'Endoso parcial — genera una nota de crédito por la prima no utilizada.'
        : 'Requiere más de una aeronave en la póliza. Para una sola aeronave, use Cancelar.',
      disabled: !canRemove,
      danger: false,
      onClick: openRemove,
    },
    {
      key: 'cancel',
      title: 'Cancelar la póliza completa',
      icon: '✕',
      desc: 'Termina toda la cobertura de esta póliza para todas las aeronaves.',
      disabled: false,
      danger: true,
      onClick: () => flash('Cancelación iniciada · requiere confirmación adicional'),
    },
    {
      key: 'renew',
      title: 'Renovar',
      icon: '↻',
      desc: renewalOpen
        ? 'Dentro de la ventana de renovación. Conserva el histórico actual.'
        : 'Fuera de la ventana de renovación.',
      disabled: !renewalOpen,
      danger: false,
      onClick: () => flash(`Iniciando renovación de la Póliza ${detail.number}`),
    },
  ];

  return (
    <>
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 pt-5 pb-6">
        <div className="mx-auto flex flex-col gap-[18px]" style={{ maxWidth }}>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href={back.href}
              className="inline-flex h-10 items-center gap-2 rounded-[3px] border border-[#C2C9D3] bg-white px-4 text-[13.5px] font-semibold whitespace-nowrap text-[#0F1E33] no-underline hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
            >
              <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden="true" className="shrink-0">
                <path
                  d="M6 1 L1 6 L6 11"
                  fill="none"
                  stroke="#0F1E33"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.4 6 H13"
                  stroke="#0F1E33"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              {back.label}
            </Link>
            <nav className="flex flex-wrap items-center gap-2 text-[12.5px] text-[#8A93A1]">
              <Link href={back.href} className="text-[#5C6675] no-underline hover:text-[#0F1E33]">
                {back.crumb}
              </Link>
              <span className="text-[#C2C9D3]">/</span>
              <span className="font-semibold text-[#0F1E33]">Póliza {detail.number}</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex min-w-0 flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-3.5">
                <h1 className="m-0 text-2xl font-bold tracking-wide text-[#0F1E33] tabular-nums">
                  {readOnly ? detail.number : `Póliza ${detail.number}`}
                </h1>
                <span
                  className="inline-flex items-center gap-1.5 rounded-[3px] border px-2.5 py-1 text-[11.5px] font-semibold tracking-wide"
                  style={{
                    background: detail.badge.bg,
                    color: detail.badge.color,
                    borderColor: detail.badge.border,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: detail.badge.color }}
                  />
                  {readOnly ? 'Vinculada' : detail.badge.label}
                </span>
                {!readOnly ? (
                  <span className="text-[12.5px] font-semibold tracking-wide text-[#6B7483] tabular-nums">
                    Certificado {detail.certificate}
                  </span>
                ) : null}
              </div>
              <p className="m-0 text-[15px] font-medium text-[#14181F]">{detail.insured}</p>
              <p className="m-0 text-[13.5px] text-[#6B7483]">
                {readOnly ? detail.aircraftLine : detail.headerSummary}
              </p>
            </div>
            {readOnly ? (
              <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#C9D2DF] bg-[#EEF1F6] px-2.5 py-1 text-[11.5px] font-semibold text-[#0F1E33]">
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="7"
                    rx="1.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M5 7 V5.2 A3 3 0 0 1 11 5.2 V7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
                Vista de solo lectura
              </span>
            ) : null}
          </div>

          {!readOnly && renewalOpen ? (
            <div className="flex items-center gap-2.5 rounded border border-[#E8CE84] border-l-4 border-l-[#C9A24A] bg-[#FBF6EA] px-3.5 py-[11px]">
              <span className="text-[13px] leading-relaxed text-[#6B5A2E]">{detail.renewalNote}</span>
            </div>
          ) : null}
        </div>
      </div>

      <main className="flex-1 bg-[#F7F8FA] px-6 pt-[22px] pb-[100px]">
        <div
          className="mx-auto grid grid-cols-1 items-start gap-[18px] lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)]"
          style={{ maxWidth }}
        >
          <div className="flex min-w-0 flex-col gap-[18px]">
            {!readOnly ? (
              <Card>
                <div className="border-b border-[#F0F2F6] px-6 pt-5 pb-[18px]">
                  <h2 className="m-0 mb-[3px] text-[15px] font-semibold tracking-wide text-[#0F1E33]">
                    ¿Qué deseas hacer con esta póliza?
                  </h2>
                  <p className="m-0 text-[13px] text-[#6B7483]">
                    Selecciona una acción disponible para el{' '}
                    {mode === 'admin' ? 'Administrator' : 'Producer'}.
                  </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-px bg-[#F0F2F6]">
                  {actions.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      disabled={a.disabled}
                      onClick={a.disabled ? undefined : a.onClick}
                      className="flex flex-col items-start gap-2 bg-white px-5 py-[18px] text-left font-[inherit] transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-55 enabled:cursor-pointer enabled:hover:bg-[#FAFBFC]"
                    >
                      <span
                        className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[15px]"
                        style={{
                          background: a.disabled
                            ? '#F0F2F6'
                            : a.danger
                              ? '#FDF2F2'
                              : '#FBF6EA',
                          color: a.disabled
                            ? '#A9B2BF'
                            : a.danger
                              ? '#8E2B29'
                              : '#8A6E22',
                        }}
                      >
                        {a.icon}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: a.disabled
                            ? '#A9B2BF'
                            : a.danger
                              ? '#8E2B29'
                              : '#0F1E33',
                        }}
                      >
                        {a.title}
                      </span>
                      <span className="text-xs leading-relaxed text-[#6B7483] text-pretty">
                        {a.desc}
                      </span>
                    </button>
                  ))}
                </div>
                {renewalOpen ? (
                  <div className="flex items-center gap-2.5 border-t border-[#E8CE84] bg-[#FBF6EA] px-6 py-[11px]">
                    <span className="text-[12.5px] leading-relaxed text-[#6B5A2E]">
                      {detail.renewalNote}
                    </span>
                  </div>
                ) : null}
              </Card>
            ) : null}

            {!readOnly ? (
              <Card>
                <SectionTitle
                  action={<span className="text-xs text-[#9AA3AE]">{scheduleCountLabel}</span>}
                >
                  Aeronaves en la póliza
                </SectionTitle>
                {schedule.map((s, i) => (
                  <div
                    key={s.reg}
                    className="grid items-center gap-x-4 gap-y-3 px-6 py-[13px]"
                    style={{
                      gridTemplateColumns: 'minmax(0,1.6fr) minmax(112px,.62fr) minmax(122px,.68fr)',
                      borderBottom: i === schedule.length - 1 ? 'none' : '1px solid #F0F2F6',
                    }}
                  >
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-sm font-semibold tracking-wide text-[#14181F]">
                        {s.reg}
                      </span>
                      <span className="text-[12.5px] text-[#8A93A1]">{s.aircraft}</span>
                    </div>
                    <span className="text-[13.5px] text-[#3B4553]">{s.useType}</span>
                    <span className="text-right text-[13.5px] font-semibold text-[#14181F] tabular-nums">
                      {formatUsd(s.premium)}
                    </span>
                  </div>
                ))}
              </Card>
            ) : null}

            <Card>
              <SectionTitle
                action={
                  !readOnly ? (
                    <button
                      type="button"
                      onClick={() => flash('Abriendo cotización vinculada')}
                      className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[12.5px] font-medium text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
                    >
                      Ver cotización
                    </button>
                  ) : undefined
                }
              >
                {readOnly ? 'Resumen de cobertura' : 'Desglose de cobertura'}
              </SectionTitle>

              {readOnly ? (
                <>
                  {detail.coverage.map((c, i) => (
                    <div
                      key={c.label}
                      className="flex items-center justify-between gap-[18px] px-6 py-[13px]"
                      style={{
                        borderBottom:
                          i === detail.coverage.length - 1 ? 'none' : '1px solid #F0F2F6',
                      }}
                    >
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-medium text-[#14181F]">{c.label}</span>
                        <span className="text-xs text-[#8A93A1]">{c.note}</span>
                      </div>
                      <span className="text-[15px] font-semibold whitespace-nowrap text-[#14181F] tabular-nums">
                        {c.premium}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-4 bg-[#0F1E33] px-6 py-[18px]">
                    <div className="flex flex-col gap-[3px]">
                      <span className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
                        Prima total anual
                      </span>
                      <span className="text-xs text-[#8895A8]">Fuente: registro de pólizas</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white tabular-nums">
                      {detail.primaTotal}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="grid items-center gap-x-4 border-b border-[#E4E8EE] bg-[#F7F8FA] px-6 py-[11px]"
                    style={{
                      gridTemplateColumns: 'minmax(0,1.6fr) minmax(120px,.8fr) 86px minmax(112px,.7fr)',
                    }}
                  >
                    {['Sección', 'Suma asegurada', 'Tasa %', 'Prima'].map((h) => (
                      <span
                        key={h}
                        className={`text-[11px] font-semibold tracking-[0.1em] text-[#6B7483] uppercase ${h === 'Sección' ? '' : 'text-right'}`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  {detail.coverage.map((c, i) => (
                    <div
                      key={`${c.label}-${i}`}
                      className="grid items-center gap-x-4 px-6 py-3.5"
                      style={{
                        gridTemplateColumns:
                          'minmax(0,1.6fr) minmax(120px,.8fr) 86px minmax(112px,.7fr)',
                        borderBottom:
                          i === detail.coverage.length - 1 ? 'none' : '1px solid #F0F2F6',
                      }}
                    >
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-medium leading-snug text-[#14181F]">
                          {c.label}
                        </span>
                        <span className="text-xs leading-snug text-[#8A93A1] text-pretty">
                          {c.note}
                        </span>
                      </div>
                      <span className="text-right text-sm whitespace-nowrap text-[#3B4553] tabular-nums">
                        {c.sum}
                      </span>
                      <span className="text-right text-sm whitespace-nowrap text-[#3B4553] tabular-nums">
                        {c.rate}
                      </span>
                      <span className="text-right text-[14.5px] font-semibold whitespace-nowrap text-[#14181F] tabular-nums">
                        {c.premium}
                      </span>
                    </div>
                  ))}
                  <div className="flex flex-col gap-2.5 border-t border-[#E4E8EE] bg-[#FAFBFC] px-6 py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13.5px] text-[#5C6675]">Prima neta</span>
                      <span className="text-[14.5px] font-semibold text-[#14181F] tabular-nums">
                        {detail.primaNeta}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13.5px] text-[#5C6675]">
                        Impuesto del país · {detail.taxLabel}
                      </span>
                      <span className="text-[14.5px] font-semibold text-[#14181F] tabular-nums">
                        {detail.taxAmount}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 bg-[#0F1E33] px-6 py-[18px]">
                    <div className="flex flex-col gap-[3px]">
                      <span className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
                        Prima total anual
                      </span>
                      <span className="text-xs text-[#8895A8]">
                        Pago único · 365 días de vigencia
                      </span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white tabular-nums">
                      {detail.primaTotal}
                    </span>
                  </div>
                </>
              )}
            </Card>

            <Card>
              <SectionTitle
                action={
                  !readOnly ? (
                    <button
                      type="button"
                      onClick={() => flash('Descarga del paquete de documentos iniciada')}
                      className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[12.5px] font-medium text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
                    >
                      Descargar todo (.zip)
                    </button>
                  ) : undefined
                }
              >
                Documentos generados
              </SectionTitle>
              {documents.map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="grid items-center gap-4 px-6 py-3.5 hover:bg-[#FAFBFC]"
                  style={{
                    gridTemplateColumns: 'minmax(0,1fr) auto auto',
                    borderBottom: i === documents.length - 1 ? 'none' : '1px solid #F0F2F6',
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-[38px] w-8 shrink-0 items-end justify-center rounded-[2px] border border-[#D8DDE5] bg-[#FAFBFC] pb-1 text-[9px] font-bold tracking-wide text-[#6B7483]">
                      PDF
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-sm font-medium leading-snug text-[#14181F] text-pretty">
                        {d.name}
                      </span>
                      <span className="text-xs leading-snug text-[#8A93A1]">{d.meta}</span>
                      {d.detail ? (
                        <span className="text-xs leading-snug text-[#8A93A1] text-pretty">
                          {d.detail}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <DocBadge state={d.state} label={d.signature} />
                  <button
                    type="button"
                    onClick={() => flash(`Descargando ${d.name}`)}
                    className="cursor-pointer justify-self-end border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[13px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
                  >
                    Descargar
                  </button>
                </div>
              ))}
            </Card>

            {detail.hasClaims ? (
              <Card>
                <div className="flex items-center justify-between gap-4 border-b border-[#F0F2F6] px-6 pt-[18px] pb-[15px]">
                  <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
                    Estado de reclamos
                  </h2>
                  {readOnly ? (
                    <span className="text-xs font-semibold tracking-wide text-[#8A93A1] uppercase">
                      Solo lectura
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => flash('Actualización de reclamo · próximamente')}
                      className="inline-flex h-9 cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-3.5 text-[12.5px] font-semibold text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
                    >
                      Actualizar estado de reclamo
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-4 px-6 py-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-[3px] border px-[11px] py-[5px] text-[11.5px] font-semibold tracking-wide"
                      style={{
                        background: detail.claimBadge?.bg ?? '#FBF6EA',
                        color: detail.claimBadge?.color ?? '#6B5A2E',
                        borderColor: detail.claimBadge?.border ?? '#E8CE84',
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: 'currentColor' }}
                      />
                      {detail.claimStage ?? detail.claimBadge?.label ?? 'Reclamo abierto'}
                    </span>
                    <span className="text-[13.5px] font-semibold tracking-wide text-[#0F1E33] tabular-nums">
                      {detail.claimNumber ?? `REC-2026-${detail.number}`}
                    </span>
                    <span className="text-[13px] text-[#6B7483]">
                      {detail.claimCause && detail.claimReported
                        ? `${detail.claimCause} · reportado ${detail.claimReported}`
                        : 'Reclamo registrado'}
                    </span>
                  </div>
                  <div className="flex flex-col rounded border border-[#F0F2F6]">
                    {detail.claimNotes.map((n, i) => {
                      const last = i === detail.claimNotes.length - 1;
                      return (
                        <div
                          key={`${n.stage}-${i}`}
                          className="px-[15px] py-[13px]"
                          style={{
                            borderBottom: last ? 'none' : '1px solid #F0F2F6',
                            background: last ? '#FAFBFC' : '#FFFFFF',
                          }}
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <span className="text-[13.5px] font-semibold text-[#14181F]">
                              {n.stage}
                            </span>
                            <span className="text-xs whitespace-nowrap text-[#9AA3AE]">
                              {n.date} · {n.author}
                            </span>
                          </div>
                          <p className="mt-1 mb-0 text-[13px] leading-relaxed text-[#5C6675] text-pretty">
                            {n.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-xs leading-relaxed text-[#8A93A1]">
                    {readOnly
                      ? 'Las notas de reclamo son de solo lectura en esta vista. Los Claims Viewer y Auditores no pueden registrar nuevos movimientos.'
                      : 'Las notas de reclamo son de solo lectura. Use «Actualizar estado de reclamo» para registrar un nuevo movimiento; los registros anteriores no se modifican.'}
                  </span>
                </div>
              </Card>
            ) : (
              <Card className="px-6 py-[18px]">
                <h2 className="m-0 mb-1 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
                  Estado de reclamos
                </h2>
                <p className="m-0 text-[13.5px] text-[#6B7483]">
                  Sin reclamos registrados sobre esta póliza.
                </p>
              </Card>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-[18px]">
            <Card>
              <SectionTitle>Datos de la póliza</SectionTitle>
              <div className="flex flex-col gap-[15px] px-[22px] py-5">
                {detail.facts
                  .filter((f) => f.label || f.value)
                  .map((f, i) => (
                    <div key={`${f.label}-${i}`} className="flex flex-col gap-[3px]">
                      {f.label ? (
                        <span className="text-[11px] font-semibold tracking-wider text-[#9AA3AE] uppercase">
                          {f.label}
                        </span>
                      ) : null}
                      <span className="text-[13.5px] font-medium leading-snug text-[#14181F] text-pretty">
                        {f.value}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>

            <Card>
              <SectionTitle>Historial de auditoría</SectionTitle>
              <div className="px-[22px] pt-1.5 pb-1">
                {detail.audit.map((a, i) => (
                  <div key={`${a.action}-${i}`} className="grid grid-cols-[14px_1fr] gap-3">
                    <span className="relative flex justify-center pt-1.5">
                      <span
                        className="z-[1] h-2.5 w-2.5 rounded-full"
                        style={{
                          background: a.current ? '#C9A24A' : '#C2C9D3',
                          boxShadow: a.current ? '0 0 0 3px rgba(201,162,74,.25)' : 'none',
                        }}
                      />
                      {i < detail.audit.length - 1 ? (
                        <span className="absolute top-4 bottom-0 w-px bg-[#E4E8EE]" />
                      ) : null}
                    </span>
                    <div className="flex min-w-0 flex-col gap-[3px] pb-4">
                      <span className="text-[13.5px] font-medium leading-snug text-[#14181F] text-pretty">
                        {a.action}
                      </span>
                      <span className="text-xs text-[#8A93A1]">
                        {a.who} · {a.when}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {!readOnly ? (
                <div className="px-[22px] pb-5">
                  <GoldLink href={ROUTES.auditor.auditoria}>Ver historial completo</GoldLink>
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </main>

      {!readOnly && removeOpen ? (
        <RemoveAircraftModal
          schedule={schedule}
          selectedReg={removeReg}
          onSelect={setRemoveReg}
          onClose={closeRemove}
          onConfirm={confirmRemove}
          creditNote={creditNote}
          creditAmount={creditAmount}
        />
      ) : null}

      {toast ? (
        <div className="fixed bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-[11px] rounded border-l-[3px] border-l-[#C9A24A] bg-[#0F1E33] px-5 py-3.5 shadow-[0_8px_28px_rgba(15,30,51,.28)]">
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
            <path
              d="M3 8.6 L6.2 11.8 L13 4.6"
              fill="none"
              stroke="#C9A24A"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[13.5px] leading-snug text-white">{toast}</span>
        </div>
      ) : null}
    </>
  );
}
