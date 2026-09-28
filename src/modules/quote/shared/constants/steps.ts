import { ROUTES } from '@/config/routes';

export const QUOTE_STEP_LABELS = [
  '1 · Asegurado',
  '2 · Aeronaves',
  '3 · Piloto(s)',
  '4 · Historial y operación',
  '5 · Cobertura',
] as const;

export const QUOTE_STEP_ROUTES = [
  ROUTES.producer.cotizacion.paso1,
  ROUTES.producer.cotizacion.paso2,
  ROUTES.producer.cotizacion.paso3,
  ROUTES.producer.cotizacion.paso4,
  ROUTES.producer.cotizacion.paso5,
] as const;

/** Índice 0-based del paso activo del wizard. */
export type QuoteStepIndex = 0 | 1 | 2 | 3 | 4;
