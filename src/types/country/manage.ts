export type CountryLifecycleStatus =
  | 'Activo'
  | 'En progreso'
  | 'No iniciado'
  | 'Inactivo';

export type ConfigItemStatus = 'Falta' | 'Pendiente' | 'Validado' | 'Rechazado';

export type ManagedCountry = {
  id: number;
  name: string;
  code: string;
  currency: string;
  currencyLabel: string;
  contact: string;
  validated: number;
  policies: number;
  note: string;
  active: boolean;
};

export type ConfigFileItem = {
  key: string;
  name: string;
  kind: 'xlsx' | 'docx';
  status: ConfigItemStatus;
  meta: string;
  error?: string;
};

export type ConfigMetaItem = {
  key: 'currency' | 'contact' | 'code';
  name: string;
  status: ConfigItemStatus;
  meta: string;
  value: string;
  placeholder: string;
};

export type CountryConfigDetail = {
  country: ManagedCountry;
  lifecycle: CountryLifecycleStatus;
  xlsx: ConfigFileItem[];
  docx: ConfigFileItem[];
  meta: ConfigMetaItem[];
};
