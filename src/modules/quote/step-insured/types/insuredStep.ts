export type InsuredType = 'Individual' | 'Empresa';

export type PilotRelation =
  | ''
  | 'El asegurado es el piloto'
  | 'Piloto empleado'
  | 'Otro';

export type InsuredStepData = {
  insured: string;
  insuredType: InsuredType;
  taxId: string;
  relation: PilotRelation | string;
  carrier: string;
  expiry: string;
  declined: boolean | null;
  declinedDetail: string;
  lien: boolean | null;
  lienName: string;
  lienAmount: string;
};
