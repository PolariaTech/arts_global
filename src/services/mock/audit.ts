import { AUDIT_EVENTS } from '@/data/mock/auditEvents';
import { POLICY_AUDIT_TRAIL } from '@/data/mock/policyAuditTrail';
import { parseInputDate, parsePolicyDate } from '@/lib/policies/parsePolicyDate';
import type { AuditEvent, AuditKpi, PolicyAuditEntry } from '@/types/audit/audit';

export const AUDIT_ACTION_FILTERS = [
  '',
  'Cotización',
  'Vinculación',
  'Endoso',
  'Cancelación',
  'Renovación',
  'Reclamo',
  'Configuración',
  'Usuario',
  'Vencimiento',
] as const;

export const AUDIT_TYPE_STYLE: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  Cotización: { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA' },
  Vinculación: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Endoso: { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  Cancelación: { bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC' },
  Renovación: { bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF' },
  Reclamo: { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  Configuración: { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA' },
  Usuario: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Vencimiento: { bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC' },
};

export type AuditFilters = {
  query: string;
  country: string;
  actionType: string;
  user: string;
  from: string;
  to: string;
};

export const EMPTY_AUDIT_FILTERS: AuditFilters = {
  query: '',
  country: '',
  actionType: '',
  user: '',
  from: '',
  to: '',
};

export function listAuditEvents(): AuditEvent[] {
  return AUDIT_EVENTS;
}

export function listPolicyAuditTrail(): PolicyAuditEntry[] {
  return POLICY_AUDIT_TRAIL;
}

export function listAuditUserNames(): string[] {
  return [
    ...new Set(
      AUDIT_EVENTS.map((e) => e.user).filter(
        (u) => u !== 'Sistema' && u !== 'Suscripción',
      ),
    ),
  ].sort((a, b) => a.localeCompare(b, 'es'));
}

export function getAuditKpis(): AuditKpi[] {
  const byType: Record<string, number> = {};
  const byCountry = new Set<string>();
  const byUser: Record<string, number> = {};

  for (const e of AUDIT_EVENTS) {
    byType[e.type] = (byType[e.type] || 0) + 1;
    byCountry.add(e.country);
    if (e.role === 'Producer') {
      byUser[e.user] = (byUser[e.user] || 0) + 1;
    }
  }

  const topUser = Object.entries(byUser).sort((a, b) => b[1] - a[1])[0];

  return [
    {
      value: String(AUDIT_EVENTS.length),
      label: 'Eventos registrados',
      note: `${byCountry.size} países · registro inmutable`,
      accent: '#C9A24A',
    },
    {
      value: String(byType['Renovación'] || 0),
      label: 'Renovaciones',
      note: `${byType['Vinculación'] || 0} vinculaciones · ${byType['Endoso'] || 0} endosos`,
      accent: '#0F1E33',
    },
    {
      value: String((byType['Cancelación'] || 0) + (byType['Vencimiento'] || 0)),
      label: 'Cancelaciones y vencimientos',
      note: `${byType['Cancelación'] || 0} canceladas · ${byType['Vencimiento'] || 0} vencida`,
      accent: '#8E2B29',
    },
    {
      value: topUser ? topUser[0] : '—',
      label: 'Usuario más activo',
      note: topUser ? `${topUser[1]} eventos registrados` : '',
      accent: '#C2C9D3',
    },
  ];
}

export function auditEventCount(): number {
  return AUDIT_EVENTS.length;
}

export function hasAuditFilters(f: AuditFilters): boolean {
  return Boolean(f.query || f.country || f.actionType || f.user || f.from || f.to);
}

export function filterAuditEvents(filters: AuditFilters): AuditEvent[] {
  const q = filters.query.trim().toLowerCase();
  const from = parseInputDate(filters.from);
  const to = parseInputDate(filters.to);
  if (to) to.setHours(23, 59, 59, 999);

  return AUDIT_EVENTS.filter((e) => {
    if (q && !(e.user.toLowerCase().includes(q) || e.entity.toLowerCase().includes(q))) {
      return false;
    }
    if (filters.country && e.country !== filters.country) return false;
    if (filters.actionType && e.type !== filters.actionType) return false;
    if (filters.user && e.user !== filters.user) return false;

    if (from || to) {
      const d = parsePolicyDate(e.date);
      if (!d) return false;
      if (from && d < from) return false;
      if (to && d > to) return false;
    }

    return true;
  });
}

export function exportAuditEventsCsv(rows: AuditEvent[], filename: string): void {
  if (typeof window === 'undefined') return;
  const header = ['Fecha', 'Usuario', 'Rol', 'País', 'Tipo', 'Entidad'];
  const lines = [
    header.join(','),
    ...rows.map((r) =>
      [r.date, r.user, r.role, r.country, r.type, r.entity]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(','),
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
