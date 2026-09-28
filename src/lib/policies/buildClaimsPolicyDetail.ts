import { CLAIM_STAGES, CLAIMS } from '@/data/mock/claims';
import { formatUsd } from '@/lib/format/money';
import { parseMoneyInput } from '@/lib/format/money';
import type { ClaimRecord } from '@/types/claim/claim';
import type { PolicyDetail } from '@/types/policy/detail';

const STAGE_BADGE = [
  { label: 'Reclamo registrado', bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  { label: 'Ajustador asignado', bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  { label: 'En liquidación', bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF' },
] as const;

const TAX_ES: Record<string, number> = {
  Panamá: 0,
  Ecuador: 0,
  'República Dominicana': 0,
  Colombia: 0.02,
  Chile: 0.02,
  Guatemala: 0.05,
  Perú: 0.0625,
  Bolivia: 0.029,
};

const RATE_TABLE = {
  'Ala fija': { Privado: 1.429, 'Ayuda industrial': 1.12, Comercial: 1.719 },
  Helicóptero: { Privado: 1.622, 'Ayuda industrial': 1.683, Comercial: 1.817 },
} as const;

const RATE_TIER: Record<string, keyof (typeof RATE_TABLE)['Ala fija']> = {
  Privado: 'Privado',
  'Ayuda industrial': 'Ayuda industrial',
  Comercial: 'Comercial',
  Chárter: 'Comercial',
  Instrucción: 'Privado',
};

const GUERRA_RATE = 0.112;
const RC_RATE = 0.6065;

function classifyUse(aircraft: string): string {
  const a = aircraft.toLowerCase();
  if (a.includes('150') || a.includes('152')) return 'Instrucción';
  if (a.includes('206') && !a.includes('caravan') && !a.includes('208')) {
    return 'Ayuda industrial';
  }
  if (
    ['king air', 'citation', 'phenom', 'pc-12', 'premier', 'caravan', '208'].some((k) =>
      a.includes(k),
    )
  ) {
    return 'Chárter';
  }
  if (['commander', 'navajo', 'twin', 'm700', '690'].some((k) => a.includes(k))) {
    return 'Comercial';
  }
  if (
    ['robinson', 'bell', 'eurocopter', 'as350', 'ec130', 'h125', 'airbus h'].some((k) =>
      a.includes(k),
    )
  ) {
    return 'Ayuda industrial';
  }
  return 'Privado';
}

function isHelicopter(aircraft: string): boolean {
  const a = aircraft.toLowerCase();
  return ['robinson', 'bell', 'eurocopter', 'as350', 'ec130', 'h125', 'airbus h'].some((k) =>
    a.includes(k),
  );
}

function policyMath(c: ClaimRecord) {
  const premiumNum = parseMoneyInput(c.premium);
  const tax = TAX_ES[c.country] ?? 0;
  const neta = premiumNum / (1 + tax);
  const useCat = classifyUse(c.aircraft);
  const cat = isHelicopter(c.aircraft) ? 'Helicóptero' : 'Ala fija';
  const tier = RATE_TIER[useCat] ?? 'Privado';
  const rate = RATE_TABLE[cat][tier];
  const cascoPremium = Math.round(neta * 0.85 * 100) / 100;
  const cascoSuma = Math.round(cascoPremium / (rate / 100));
  const guerraPremium = Math.round(cascoSuma * (GUERRA_RATE / 100) * 100) / 100;
  const rcPremium = Math.round((neta - cascoPremium - guerraPremium) * 100) / 100;
  const rcSuma = Math.round(rcPremium / (RC_RATE / 100));
  return { useCat, cascoSuma, rcSuma, premiumNum };
}

function usdInt(n: number): string {
  return formatUsd(n, 0).replace('.00', '');
}

/** Detalle de póliza para Claims Viewer (solo lectura), alineado al mockup. */
export function buildClaimsPolicyDetail(pol?: string | null): PolicyDetail {
  const claim =
    CLAIMS.find((c) => c.number === pol) ?? CLAIMS[0]!;
  const pm = policyMath(claim);
  const stageIdx = Math.min(claim.stageIdx, CLAIM_STAGES.length - 1);
  const stageBadge = STAGE_BADGE[stageIdx] ?? STAGE_BADGE[0];

  const allNotes = [
    {
      stage: 'Reclamo registrado',
      date: claim.reported,
      author: claim.producer,
      text: `El asegurado reporta: ${claim.claimCause.toLowerCase()}. Aeronave ${claim.aircraft} (${claim.reg}) en tierra en ${claim.country}.`,
    },
    {
      stage: 'Ajustador asignado',
      date: claim.reported,
      author: 'Suscripción',
      text: 'Se asigna ajustador independiente para inspección en sitio. Estimación preliminar en revisión.',
    },
    {
      stage: 'En liquidación',
      date: claim.reported,
      author: 'Suscripción',
      text: 'Informe de inspección recibido. Reclamo en proceso de liquidación con el asegurado.',
    },
  ];

  return {
    number: claim.number,
    certificate: '',
    insured: claim.insured,
    country: claim.country,
    aircraftLine: `${claim.aircraft} · ${claim.reg} · ${claim.country} · Vinculada el ${claim.boundDate}`,
    headerSummary: claim.insured,
    badge: {
      label: 'Vinculada',
      bg: '#EEF1F6',
      color: '#0F1E33',
      border: '#C9D2DF',
    },
    renewalOpen: false,
    renewalNote: '',
    facts: [
      { label: 'Producer', value: claim.producer },
      { label: 'Asegurado', value: claim.insured },
      { label: 'Aeronave', value: claim.aircraft },
      { label: 'Matrícula', value: claim.reg },
      { label: 'País', value: claim.country },
      { label: 'Vinculada el', value: claim.boundDate },
      { label: 'Colocado por', value: 'ARTS Global' },
    ],
    schedule: [],
    coverageSummary: true,
    coverage: [
      {
        label: 'Límite de responsabilidad civil',
        note: 'Combinado, por evento',
        sum: '',
        rate: '',
        premium: usdInt(pm.rcSuma),
      },
      {
        label: 'Límite de casco',
        note: 'Valor declarado · todo riesgo',
        sum: '',
        rate: '',
        premium: usdInt(pm.cascoSuma),
      },
      {
        label: 'Deducible de casco',
        note: 'Aplicable a daños en movimiento',
        sum: '',
        rate: '',
        premium: usdInt(Math.round((pm.cascoSuma * 0.01) / 100) * 100),
      },
      {
        label: 'Deducible en tierra',
        note: 'Daños sin movimiento',
        sum: '',
        rate: '',
        premium: usdInt(Math.round((pm.cascoSuma * 0.0025) / 100) * 100),
      },
      {
        label: 'Vigencia',
        note: '12 meses desde la vinculación',
        sum: '',
        rate: '',
        premium: `${claim.boundDate} — próxima renovación`,
      },
      {
        label: 'Tipo de uso',
        note: 'Declarado en la cotización',
        sum: '',
        rate: '',
        premium: pm.useCat,
      },
    ],
    primaNeta: formatUsd(pm.premiumNum),
    taxLabel: '',
    taxAmount: 'US$ 0.00',
    primaTotal: formatUsd(pm.premiumNum),
    documents: [
      {
        name: 'Cotización',
        meta: `COT-${claim.number} · ${claim.boundDate} · 214 KB`,
        signature: 'No requiere firma',
        state: 'neutral',
      },
      {
        name: 'Nota de cobertura',
        meta: `NC-${claim.number} · ${claim.boundDate} · 188 KB`,
        signature: 'Firmada',
        state: 'ok',
      },
      {
        name: 'Carátula de póliza',
        meta: `POL-${claim.number} · ${claim.boundDate} · 402 KB`,
        signature: 'Firmada',
        state: 'ok',
      },
      {
        name: 'Factura',
        meta: `FAC-${claim.number} · ${claim.boundDate} · 96 KB`,
        signature: 'Firmada',
        state: 'ok',
      },
    ],
    audit: [
      {
        action: `Reclamo ${CLAIM_STAGES[stageIdx]!.toLowerCase()} · ${claim.claimCause}`,
        who: 'Suscripción',
        when: claim.reported,
        current: true,
      },
      { action: 'Factura emitida', who: 'Sistema', when: claim.boundDate },
      {
        action: 'Carátula de póliza generada y firmada',
        who: claim.producer,
        when: claim.boundDate,
      },
      {
        action: 'Póliza vinculada desde cotización',
        who: claim.producer,
        when: claim.boundDate,
      },
      { action: 'Cotización calculada', who: claim.producer, when: claim.boundDate },
    ],
    hasClaims: true,
    claimNotes: allNotes.slice(0, stageIdx + 1),
    claimStage: CLAIM_STAGES[stageIdx],
    claimNumber: `REC-2026-${claim.number}`,
    claimCause: claim.claimCause,
    claimReported: claim.reported,
    claimBadge: {
      label: stageBadge.label,
      bg: stageBadge.bg,
      color: stageBadge.color,
      border: stageBadge.border,
    },
  };
}
