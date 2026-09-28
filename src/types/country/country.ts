export type CountryStat = {
  name: string;
  code: string;
  policies: number;
  usd: number;
};

/** Nombres en inglés tal como aparecen en el registro de pólizas. */
export type PolicyCountryEn =
  | 'Panama'
  | 'Ecuador'
  | 'Dominican Republic'
  | 'Chile'
  | 'Colombia'
  | 'Guatemala'
  | 'Bolivia'
  | 'Argentina'
  | 'Peru'
  | 'El Salvador'
  | 'Honduras'
  | 'Paraguay'
  | 'Venezuela';
