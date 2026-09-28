export type ClaimStage =
  | 'Reclamo registrado'
  | 'Ajustador asignado'
  | 'En liquidación';

export type ClaimRecord = {
  number: string;
  insured: string;
  aircraft: string;
  reg: string;
  country: string;
  producer: string;
  premium: string;
  boundDate: string;
  claimCause: string;
  reported: string;
  stageIdx: number;
  stage: ClaimStage;
};
