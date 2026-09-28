import { CLAIMS } from '@/data/mock/claims';
import { POLICIES } from '@/data/mock/policies';
import { POLICY_AUDIT_TRAIL } from '@/data/mock/policyAuditTrail';
import { parseMoneyInput } from '@/lib/format/money';
import { formatUsd } from '@/lib/format/money';
import { countryToEs } from '@/lib/format/country';
import { loadBoundPolicy } from '@/lib/storage/boundPolicy';
import type { PolicyDetail, PolicyBadge } from '@/types/policy/detail';
import type { PolicyRecord, PolicyStatus } from '@/types/policy/policy';

const STATUS_BADGE: Record<PolicyStatus | string, PolicyBadge> = {
  Vinculada: { label: 'Vinculada', bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Renovada: { label: 'Renovación', bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Endosada: { label: 'Endosada', bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  Cancelada: { label: 'Cancelada', bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC' },
  Vencida: { label: 'Vencida', bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC' },
};

const DEMO_CLAIM_NOTES = [
  {
    stage: 'Reclamo registrado',
    date: '08 ago 2026',
    author: 'M. Herrera',
    text: 'El asegurado reporta daño en tren de aterrizaje principal durante aterrizaje en pista no pavimentada.',
  },
  {
    stage: 'Ajustador asignado',
    date: '11 ago 2026',
    author: 'Suscripción',
    text: 'Se asigna ajustador independiente para inspección en sitio. Estimación preliminar de daños: US$ 62.000.',
  },
  {
    stage: 'Documentación en revisión',
    date: '19 ago 2026',
    author: 'Suscripción',
    text: 'Recibido informe de inspección y bitácora de mantenimiento. Pendiente confirmación de horas del piloto.',
  },
];

const DEFAULT_DETAIL: PolicyDetail = {
  number: '2373',
  certificate: 'AV09202025-01',
  insured: 'Aeroservicios Austral SpA',
  country: 'Chile',
  aircraftLine: 'Cessna TH206 · CC-4471',
  headerSummary:
    '2 aeronaves · CC-4471, CC-5533 · Chile · Vigencia 20 sep 2025 — 20 sep 2026',
  badge: STATUS_BADGE.Renovada,
  renewalOpen: true,
  renewalNote:
    'Dentro de la ventana de renovación · vence el 20 sep 2026. La renovación conserva el histórico de la póliza actual.',
  facts: [
    { label: 'Producer', value: 'M. Herrera' },
    { label: 'Asegurado', value: 'Aeroservicios Austral SpA' },
    { label: 'Certificado', value: 'AV09202025-01' },
    { label: 'Aeronaves', value: 'Cessna TH206 · 2000 · CC-4471 (5 pax · 1 trip.)' },
    { label: '', value: 'Cessna 208B Caravan · 2016 · CC-5533 (9 pax · 1 trip.)' },
    { label: 'Tipo de uso', value: 'Ayuda industrial' },
    { label: 'Vigencia', value: '20 sep 2025 — 20 sep 2026 (365 días)' },
    { label: 'País / impuesto', value: 'Chile · 2%' },
    { label: 'Colocado por', value: 'ARTS Global' },
  ],
  schedule: [
    {
      reg: 'CC-4471',
      aircraft: 'Cessna TH206 · 2000 · Ala fija · 5 pasajeros · 1 tripulante',
      useType: 'Ayuda industrial',
      premium: 7726.5,
    },
    {
      reg: 'CC-5533',
      aircraft: 'Cessna 208B Caravan · 2016 · Ala fija · 9 pasajeros · 1 tripulante',
      useType: 'Ayuda industrial',
      premium: 17442,
    },
  ],
  coverage: [
    {
      label: 'Casco · CC-4471',
      note: 'Cessna TH206 · valor declarado, todo riesgo',
      sum: 'US$ 400,000',
      rate: '1.4250',
      premium: 'US$ 5,700.00',
    },
    {
      label: 'Casco · CC-5533',
      note: 'Cessna 208B Caravan · valor declarado, todo riesgo',
      sum: 'US$ 1,200,000',
      rate: '1.4250',
      premium: 'US$ 17,100.00',
    },
    {
      label: 'Casco Guerra',
      note: 'Riesgos de guerra y afines · CC-4471',
      sum: 'US$ 400,000',
      rate: '0.1875',
      premium: 'US$ 750.00',
    },
    {
      label: 'Responsabilidad Civil (RC)',
      note: 'Límite único combinado, por evento',
      sum: 'US$ 1,000,000',
      rate: '0.1125',
      premium: 'US$ 1,125.00',
    },
  ],
  primaNeta: 'US$ 24,675.00',
  taxLabel: 'Chile · 2%',
  taxAmount: 'US$ 493.50',
  primaTotal: 'US$ 25,168.50',
  documents: [
    {
      name: 'Cotización',
      meta: 'COT-2025-02188 · 12 sep 2025 · 214 KB',
      signature: 'No requiere firma',
      state: 'neutral',
    },
    {
      name: 'Nota de cobertura',
      meta: 'NC-2025-02373 · 19 sep 2025 · 188 KB',
      signature: 'Firmada 19 sep',
      state: 'ok',
    },
    {
      name: 'Carátula de póliza',
      meta: 'Póliza 2373 · AV09202025-01 · 20 sep 2025 · 402 KB',
      signature: 'Firmada 20 sep',
      state: 'ok',
    },
    {
      name: 'Factura',
      meta: 'FAC-2025-01944 · 22 sep 2025 · 96 KB',
      signature: 'Pendiente de firma',
      state: 'pending',
    },
  ],
  audit: POLICY_AUDIT_TRAIL.map((a) => ({
    action: a.action,
    who: a.who,
    when: a.when,
    current: a.current,
  })),
  hasClaims: true,
  claimNotes: DEMO_CLAIM_NOTES,
};

function addYear(dateStr: string): string {
  const m = dateStr.match(/(\d+)\s+(\w+)\s+(\d{4})/);
  if (!m) return dateStr;
  return `${m[1]} ${m[2]} ${Number(m[3]) + 1}`;
}

function fromPolicyRecord(rec: PolicyRecord): PolicyDetail {
  const country = countryToEs(rec.country);
  const premium = parseMoneyInput(rec.premium);
  const vigenciaEnd = addYear(rec.date);
  const badge = STATUS_BADGE[rec.status] ?? STATUS_BADGE.Vinculada;
  const cancelled = rec.status === 'Cancelada';
  const inClaims = CLAIMS.some((c) => c.number === rec.number);
  const neta = Math.round(premium * 0.98 * 100) / 100;
  const tax = Math.round((premium - neta) * 100) / 100;

  return {
    number: rec.number,
    certificate: rec.certificate,
    insured: rec.insured,
    country,
    aircraftLine: `${rec.aircraft} · ${rec.reg}`,
    headerSummary: `1 aeronave · ${rec.reg} · ${country} · Vigencia ${rec.date} — ${vigenciaEnd}`,
    badge,
    renewalOpen: rec.status === 'Renovada' || rec.status === 'Vinculada',
    renewalNote:
      rec.status === 'Renovada' || rec.status === 'Vinculada'
        ? `Dentro de la ventana de renovación · vence el ${vigenciaEnd}. La renovación conserva el histórico de la póliza actual.`
        : `Fuera de la ventana de renovación · vence el ${vigenciaEnd}.`,
    facts: [
      { label: 'Producer', value: rec.producer },
      { label: 'Asegurado', value: rec.insured },
      { label: 'Certificado', value: rec.certificate },
      { label: 'Aeronave', value: `${rec.aircraft} · ${rec.reg}` },
      { label: 'Tipo de uso', value: 'Ayuda industrial' },
      { label: 'Vigencia', value: `${rec.date} — ${vigenciaEnd} (365 días)` },
      { label: 'País / impuesto', value: `${country} · 0%` },
      { label: 'Colocado por', value: 'ARTS Global' },
    ],
    schedule: [
      {
        reg: rec.reg,
        aircraft: rec.aircraft,
        useType: 'Ayuda industrial',
        premium,
      },
    ],
    coverage: [
      {
        label: 'Casco',
        note: `${rec.aircraft} · valor declarado, todo riesgo`,
        sum: formatUsd(Math.round(premium / 0.014), 0).replace('.00', ''),
        rate: '1.1200',
        premium: formatUsd(Math.round(premium * 0.7 * 100) / 100),
      },
      {
        label: 'Casco Guerra',
        note: 'Riesgos de guerra y afines',
        sum: formatUsd(Math.round(premium / 0.014), 0).replace('.00', ''),
        rate: '0.1120',
        premium: formatUsd(Math.round(premium * 0.08 * 100) / 100),
      },
      {
        label: 'Responsabilidad Civil (RC)',
        note: 'Límite único combinado, por evento',
        sum: 'US$ 5,000,000',
        rate: '0.6065',
        premium: formatUsd(Math.round(premium * 0.22 * 100) / 100),
      },
    ],
    primaNeta: formatUsd(neta),
    taxLabel: `${country} · 0%`,
    taxAmount: formatUsd(tax),
    primaTotal: formatUsd(premium),
    documents: [
      {
        name: 'Cotización',
        meta: `COT-${rec.number} · ${rec.date} · 214 KB`,
        signature: 'No requiere firma',
        state: 'neutral',
      },
      {
        name: 'Nota de cobertura',
        meta: `NC-${rec.number} · ${rec.date} · 188 KB`,
        signature: cancelled ? 'Anulada' : 'Firmada',
        state: cancelled ? 'neutral' : 'ok',
      },
      {
        name: 'Carátula de póliza',
        meta: `Póliza ${rec.number} · ${rec.certificate} · ${rec.date} · 402 KB`,
        signature: cancelled ? 'Anulada' : 'Firmada',
        state: cancelled ? 'neutral' : 'ok',
      },
    ],
    audit: [
      {
        action: `${
          rec.status === 'Renovada'
            ? 'Renovación registrada'
            : rec.status === 'Endosada'
              ? 'Endoso registrado'
              : rec.status === 'Cancelada'
                ? 'Cancelación registrada'
                : 'Póliza vinculada'
        } · ${rec.number}`,
        who: rec.producer,
        when: rec.date,
        current: true,
      },
      {
        action: 'Carátula de póliza generada y firmada',
        who: rec.producer,
        when: rec.date,
      },
      { action: 'Cotización calculada', who: rec.producer, when: rec.date },
    ],
    hasClaims: inClaims,
    claimNotes: inClaims ? DEMO_CLAIM_NOTES : [],
  };
}

function fromBound(raw: Record<string, unknown>): PolicyDetail {
  const badgeRaw = (raw.badge as PolicyBadge | undefined) ?? STATUS_BADGE.Vinculada;
  const badge =
    typeof badgeRaw.label === 'string'
      ? {
          label: badgeRaw.label,
          bg: badgeRaw.bg ?? '#EEF1F6',
          color: badgeRaw.color ?? '#0F1E33',
          border: badgeRaw.border ?? '#C9D2DF',
        }
      : STATUS_BADGE.Vinculada;

  const schedule = Array.isArray(raw.schedule)
    ? (raw.schedule as PolicyDetail['schedule']).map((s) => ({
        ...s,
        premium: typeof s.premium === 'number' ? s.premium : parseMoneyInput(String(s.premium)),
      }))
    : [];

  const coverage = Array.isArray(raw.coverage)
    ? (raw.coverage as Array<Record<string, unknown>>).map((c) => ({
        label: String(c.label ?? ''),
        note: String(c.note ?? ''),
        sum:
          typeof c.sum === 'number'
            ? formatUsd(c.sum, 0).replace('.00', '')
            : String(c.sum ?? ''),
        rate:
          typeof c.rate === 'number'
            ? c.rate.toFixed(4)
            : String(c.rate ?? ''),
        premium:
          typeof c.premium === 'number' ? formatUsd(c.premium) : String(c.premium ?? ''),
      }))
    : [];

  const number = String(raw.number ?? '');
  const certificate = String(raw.certificate ?? '');
  const today = 'hoy';
  const docs =
    (raw.documents as PolicyDetail['documents'] | undefined)?.length
      ? (raw.documents as PolicyDetail['documents'])
      : [
          {
            name: 'Cotización',
            meta: `COT-${number} · ${today} · 214 KB`,
            signature: 'No requiere firma',
            state: 'neutral' as const,
          },
          {
            name: 'Nota de cobertura',
            meta: `NC-${number} · ${today} · 188 KB`,
            signature: 'Firmada',
            state: 'ok' as const,
          },
          {
            name: 'Carátula de póliza',
            meta: `Póliza ${number} · ${certificate} · ${today} · 402 KB`,
            signature: 'Firmada',
            state: 'ok' as const,
          },
        ];

  const audit =
    (raw.audit as PolicyDetail['audit'] | undefined)?.length
      ? (raw.audit as PolicyDetail['audit'])
      : [
          {
            action: `Póliza vinculada · ${number}`,
            who: 'J. Salgado',
            when: today,
            current: true,
          },
          {
            action: 'Carátula de póliza generada y firmada',
            who: 'J. Salgado',
            when: today,
          },
          { action: 'Cotización calculada', who: 'J. Salgado', when: today },
        ];

  const renewalOpen =
    raw.renewalOpen === undefined ? badge.label !== 'Cancelada' : Boolean(raw.renewalOpen);

  return {
    number,
    certificate,
    insured: String(raw.insured ?? ''),
    country: String(raw.country ?? ''),
    aircraftLine: String(raw.aircraftLine ?? ''),
    headerSummary: String(raw.headerSummary ?? ''),
    badge,
    renewalOpen,
    renewalNote:
      String(raw.renewalNote ?? '') ||
      (renewalOpen
        ? 'Dentro de la ventana de renovación. La renovación conserva el histórico de la póliza actual.'
        : 'Fuera de la ventana de renovación.'),
    facts: (raw.facts as PolicyDetail['facts']) ?? [],
    schedule,
    coverage,
    primaNeta: String(raw.primaNeta ?? 'US$ 0.00'),
    taxLabel: String(raw.taxLabel ?? ''),
    taxAmount: String(raw.taxAmount ?? 'US$ 0.00'),
    primaTotal: String(raw.primaTotal ?? 'US$ 0.00'),
    documents: docs,
    audit,
    hasClaims: Boolean(raw.hasClaims),
    claimNotes: Boolean(raw.hasClaims) ? DEMO_CLAIM_NOTES : [],
  };
}

/** Resuelve el detalle por número de póliza (bound → libro → demo). */
export function resolvePolicyDetail(pol?: string | null): PolicyDetail {
  if (!pol) return DEFAULT_DETAIL;

  const bound = loadBoundPolicy(pol);
  if (bound) return fromBound(bound);

  const rec = POLICIES.find((p) => p.number === pol);
  if (rec) return fromPolicyRecord(rec);

  return { ...DEFAULT_DETAIL, number: pol };
}
