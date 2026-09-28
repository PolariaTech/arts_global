type Option<T extends string | boolean> = {
  value: T;
  label: string;
};

type SegmentedToggleProps<T extends string | boolean> = {
  value: T;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
  size?: 'md' | 'sm';
  ariaLabel: string;
};

export function SegmentedToggle<T extends string | boolean>({
  value,
  options,
  onChange,
  size = 'md',
  ariaLabel,
}: SegmentedToggleProps<T>) {
  const height = size === 'sm' ? 40 : 46;
  const fontSize = size === 'sm' ? 13.5 : 14;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex overflow-hidden rounded-[3px] border border-[#C8CFD9]"
      style={{ height }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.label)}
            type="button"
            onClick={() => onChange(opt.value)}
            className="min-w-14 flex-1 cursor-pointer border-none transition-[background,color] duration-100"
            style={{
              fontFamily: 'inherit',
              fontSize,
              fontWeight: active ? 600 : 500,
              background: active ? '#0F1E33' : '#FFFFFF',
              color: active ? '#FFFFFF' : '#5C6675',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
