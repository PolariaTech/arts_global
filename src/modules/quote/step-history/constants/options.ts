export const TERRAINS = [
  'Llano',
  'Montañoso',
  'Gran altitud sobre 8,000 pies',
  'Sobre agua',
] as const;

export const BACKGROUND_QUESTIONS = [
  { key: 'violations', label: '¿Violaciones a regulaciones aeronáuticas?' },
  { key: 'dui', label: '¿Condena por conducir bajo efectos del alcohol (DUI)?' },
  { key: 'felony', label: '¿Condena por delito grave?' },
] as const;

export type BackgroundKey = (typeof BACKGROUND_QUESTIONS)[number]['key'];

export const USE_TYPES = ['Placer personal', 'Placer y negocios'] as const;
