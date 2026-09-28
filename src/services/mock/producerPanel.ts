import { ROUTES } from '@/config/routes';
import { loadQuoteDraft } from '@/lib/storage/quoteDraft';
import { getPolicyByNumber, listPoliciesByProducer } from './policies';

type QuoteRow = {
  number: string;
  insured: string;
  aircraft: string;
  reg: string;
  status: 'Borrador' | 'Cotizada' | 'Vinculada';
  date: string;
  href: string;
};

type RenewalRow = {
  number: string;
  insured: string;
  policy: string;
  reg: string;
  days: number;
  daysLabel: string;
  urgent: boolean;
  href: string;
};

/** Pipeline demo del mockup (aún no están en el libro). */
const PIPELINE_QUOTES: QuoteRow[] = [
  {
    number: '',
    insured: 'Aerocarga David S.A.',
    aircraft: 'Cessna 208B Caravan · Comercial',
    reg: 'HP-9902',
    status: 'Cotizada',
    date: '18 sep',
    href: ROUTES.producer.cotizacion.resultado,
  },
  {
    number: '',
    insured: 'Vuelos Ejecutivos Panamá S.A.',
    aircraft: 'Citation CJ2 · Ayuda industrial',
    reg: 'HP-4471',
    status: 'Borrador',
    date: '15 sep',
    href: ROUTES.producer.cotizacion.resultado,
  },
];

const BOUND_QUOTE_NUMBERS = ['2724', '2679', '2674'] as const;

const RENEWAL_SEED = [
  {
    number: '2396',
    insured: 'Aeroservicios del Istmo S.A.',
    policy: 'POL-2026-2396',
    reg: 'HP-1791',
    days: 4,
  },
  {
    number: '2432',
    insured: 'Vuelos del Canal S.A.',
    policy: 'POL-2026-2432',
    reg: 'HP-2688',
    days: 39,
  },
  {
    number: '2445',
    insured: 'Transportes Aéreos Darién S.A.',
    policy: 'POL-2026-2445',
    reg: 'HP-5911',
    days: 55,
  },
] as const;

function boundQuotesFromBook(): QuoteRow[] {
  return BOUND_QUOTE_NUMBERS.flatMap((num) => {
    const p = getPolicyByNumber(num);
    if (!p) return [];
    const date = p.date.replace(/\s*2026\s*$/, '').trim() || p.date;
    return [
      {
        number: p.number,
        insured: p.insured,
        aircraft: p.aircraft,
        reg: p.reg,
        status: 'Vinculada' as const,
        date,
        href: ROUTES.producer.polizaDetalle(p.number),
      },
    ];
  });
}

function liveDraftQuote(): QuoteRow | null {
  if (typeof window === 'undefined') return null;
  const draft = loadQuoteDraft();
  const name = draft.insuredStep?.insured?.trim();
  if (!name) return null;

  const ac = draft.aircraft?.[0];
  const reg = ac?.reg?.trim() || '—';
  const model = ac?.model?.trim() || 'Borrador sin matrícula';

  return {
    number: '',
    insured: name,
    aircraft: model,
    reg,
    status: 'Borrador',
    date: 'hoy',
    href: ROUTES.producer.cotizacion.paso1,
  };
}

export function getProducerPanelData(producerDisplayName: string) {
  const mine = listPoliciesByProducer(producerDisplayName);
  const vinculadas = mine.filter((p) => p.status === 'Vinculada').length;

  const live = liveDraftQuote();
  const pipeline = live
    ? [live, ...PIPELINE_QUOTES.filter((q) => q.status !== 'Borrador')]
    : PIPELINE_QUOTES;

  const quotes = [...pipeline, ...boundQuotesFromBook()].slice(0, 5);

  const renewals: RenewalRow[] = RENEWAL_SEED.map((r) => {
    const p = getPolicyByNumber(r.number);
    return {
      number: r.number,
      insured: p?.insured ?? r.insured,
      policy: r.policy,
      reg: p?.reg ?? r.reg,
      days: r.days,
      daysLabel: `${r.days} días`,
      urgent: r.days <= 15,
      href: ROUTES.producer.polizaDetalle(r.number),
    };
  });

  const stats = [
    {
      count: 1,
      label: 'Borradores',
      note: 'Sin enviar',
      accent: '#C2C9D3',
    },
    {
      count: 1,
      label: 'Cotizadas',
      note: 'Pendientes de vinculación',
      accent: '#C9A24A',
    },
    {
      count: vinculadas > 0 ? vinculadas : 8,
      label: 'Vinculadas',
      note: 'Cobertura en firme',
      accent: '#0F1E33',
    },
  ] as const;

  return {
    stats,
    quotes,
    renewals,
    dateLine: 'Domingo, 20 de septiembre de 2026 · Panamá',
    policyCount: mine.length || 67,
  };
}
