export type QuoteMeta = {
  quoteNumber: string;
  quoteDate: string;
  boundNumber: string;
};

export const DEFAULT_QUOTE_META: QuoteMeta = {
  quoteNumber: 'COT-2026-04187',
  quoteDate: '23 ago 2026',
  boundNumber: '2802',
};

const QUOTE_META_BY_COT: Record<string, QuoteMeta> = {
  'aerocarga-david': {
    quoteNumber: 'COT-2026-04360',
    quoteDate: '18 sep 2026',
    boundNumber: '2803',
  },
};

export function getQuoteMeta(cotId?: string | null): QuoteMeta {
  if (cotId && QUOTE_META_BY_COT[cotId]) return QUOTE_META_BY_COT[cotId];
  return DEFAULT_QUOTE_META;
}
