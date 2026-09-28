import type { PolicyStatus } from '@/types/policy/policy';

const STYLES: Record<PolicyStatus, { bg: string; color: string; border: string; dot: string }> = {
  Vinculada: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF', dot: '#0F1E33' },
  Endosada: { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84', dot: '#C9A24A' },
  Renovada: { bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF', dot: '#2F7A45' },
  Cancelada: { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA', dot: '#A9B2BF' },
  Vencida: { bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC', dot: '#B4302E' },
};

type RegistryStatusBadgeProps = {
  status: PolicyStatus;
};

export function RegistryStatusBadge({ status }: RegistryStatusBadgeProps) {
  const s = STYLES[status] ?? STYLES.Vinculada;
  return (
    <span
      className="inline-flex items-center gap-[7px] self-center justify-self-start rounded-[3px] border px-2.5 py-[5px] text-[11.5px] font-semibold tracking-wide whitespace-nowrap"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}
