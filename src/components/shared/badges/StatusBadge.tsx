const STYLES: Record<string, { bg: string; color: string; border: string }> = {
  Borrador: { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA' },
  Cotizada: { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  Vinculada: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Renovada: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Renovación: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  Endosada: { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  Cancelada: { bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC' },
  Vencida: { bg: '#FDF2F2', color: '#8E2B29', border: '#E9BDBC' },
  'Reclamo registrado': { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  'Ajustador asignado': { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  'En liquidación': { bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF' },
};

type StatusBadgeProps = {
  label: string;
};

export function StatusBadge({ label }: StatusBadgeProps) {
  const s = STYLES[label] ?? STYLES.Borrador;
  return (
    <span
      className="inline-flex items-center rounded-[3px] border px-2.5 py-1 text-[11.5px] font-semibold tracking-wide whitespace-nowrap"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      {label}
    </span>
  );
}
