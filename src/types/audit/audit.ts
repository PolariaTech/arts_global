export type AuditActionType =
  | 'Cotización'
  | 'Vinculación'
  | 'Renovación'
  | 'Endoso'
  | 'Cancelación'
  | 'Vencimiento'
  | 'Reclamo'
  | 'Configuración'
  | 'Usuario';

export type AuditEvent = {
  date: string;
  user: string;
  role: string;
  country: string;
  type: AuditActionType | string;
  entity: string;
};

export type PolicyAuditEntry = {
  action: string;
  who: string;
  when: string;
  current?: boolean;
};

export type AuditKpi = {
  value: string;
  label: string;
  note: string;
  accent: string;
};
