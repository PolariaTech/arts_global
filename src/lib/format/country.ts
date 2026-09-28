/** Mapa EN (registro de pólizas) → ES (UI / usuarios / claims). */
const EN_TO_ES: Record<string, string> = {
  Panama: 'Panamá',
  Ecuador: 'Ecuador',
  'Dominican Republic': 'República Dominicana',
  Chile: 'Chile',
  Colombia: 'Colombia',
  Guatemala: 'Guatemala',
  Bolivia: 'Bolivia',
  Argentina: 'Argentina',
  Peru: 'Perú',
  'El Salvador': 'El Salvador',
  Honduras: 'Honduras',
  Paraguay: 'Paraguay',
  Venezuela: 'Venezuela',
};

const ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_ES).map(([en, es]) => [es, en]),
);

export function countryToEs(name: string): string {
  return EN_TO_ES[name] ?? name;
}

export function countryToEn(name: string): string {
  return ES_TO_EN[name] ?? name;
}

export function formatUsd(amount: number): string {
  return `US$ ${amount.toLocaleString('en-US')}`;
}
