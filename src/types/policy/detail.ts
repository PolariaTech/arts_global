export type PolicyBadge = {
  label: string;
  bg: string;
  color: string;
  border: string;
};

export type PolicyFact = { label: string; value: string };

export type PolicyScheduleRow = {
  reg: string;
  aircraft: string;
  useType: string;
  premium: number;
};

export type PolicyCoverageRow = {
  label: string;
  note: string;
  sum: string;
  rate: string;
  premium: string;
};

export type PolicyDocument = {
  name: string;
  meta: string;
  signature: string;
  state: 'ok' | 'pending' | 'neutral';
  detail?: string;
};

export type PolicyAuditRow = {
  action: string;
  who: string;
  when: string;
  current?: boolean;
};

export type PolicyClaimNote = {
  stage: string;
  date: string;
  author: string;
  text: string;
};

export type PolicyDetail = {
  number: string;
  certificate: string;
  insured: string;
  country: string;
  aircraftLine: string;
  headerSummary: string;
  badge: PolicyBadge;
  renewalOpen: boolean;
  renewalNote: string;
  facts: PolicyFact[];
  schedule: PolicyScheduleRow[];
  coverage: PolicyCoverageRow[];
  /** Si true, la UI de cobertura usa filas resumen (label/note/premium) sin columnas de tasa. */
  coverageSummary?: boolean;
  primaNeta: string;
  taxLabel: string;
  taxAmount: string;
  primaTotal: string;
  documents: PolicyDocument[];
  audit: PolicyAuditRow[];
  hasClaims: boolean;
  claimNotes: PolicyClaimNote[];
  claimStage?: string;
  claimNumber?: string;
  claimCause?: string;
  claimReported?: string;
  claimBadge?: PolicyBadge;
};
