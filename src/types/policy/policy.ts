export type PolicyStatus =
  | 'Vinculada'
  | 'Endosada'
  | 'Renovada'
  | 'Cancelada'
  | 'Vencida';

export type PolicyRecord = {
  number: string;
  certificate: string;
  insured: string;
  aircraft: string;
  reg: string;
  country: string;
  status: PolicyStatus;
  premium: string;
  date: string;
  producer: string;
};
