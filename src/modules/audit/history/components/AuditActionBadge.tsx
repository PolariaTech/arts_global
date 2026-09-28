import { AUDIT_TYPE_STYLE } from '@/services/mock/audit';

type AuditActionBadgeProps = {
  type: string;
};

export function AuditActionBadge({ type }: AuditActionBadgeProps) {
  const s = AUDIT_TYPE_STYLE[type] ?? {
    bg: '#F0F2F6',
    color: '#5C6675',
    border: '#E0E4EA',
  };
  return (
    <span
      className="inline-flex items-center gap-[7px] self-center justify-self-start rounded-[3px] border px-2.5 py-[5px] text-[11.5px] font-semibold tracking-wide whitespace-nowrap"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      {type}
    </span>
  );
}
