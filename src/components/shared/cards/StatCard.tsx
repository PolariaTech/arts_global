type StatCardProps = {
  value: string | number;
  label: string;
  note?: string;
  accent?: string;
  compact?: boolean;
};

export function StatCard({
  value,
  label,
  note,
  accent = '#E0E4EA',
  compact = false,
}: StatCardProps) {
  return (
    <div
      className="flex flex-col gap-1.5 rounded-[5px] border border-[#E0E4EA] border-t-[3px] bg-white px-[22px] py-5 shadow-[0_1px_2px_rgba(15,30,51,.04)]"
      style={{ borderTopColor: accent }}
    >
      <span
        className={`leading-none font-bold tracking-tight text-[#0F1E33] tabular-nums ${compact ? 'text-[22px]' : 'text-[30px]'}`}
      >
        {value}
      </span>
      <span className="text-[13px] font-semibold tracking-wide text-[#3B4553]">{label}</span>
      {note ? <span className="text-xs text-[#8A93A1]">{note}</span> : null}
    </div>
  );
}
