type EquipmentChipsProps = {
  options: string[];
  selected: string[];
  onToggle: (label: string) => void;
};

export function EquipmentChips({ options, selected, onToggle }: EquipmentChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((label) => {
        const on = selected.includes(label);
        return (
          <button
            key={label}
            type="button"
            onClick={() => onToggle(label)}
            className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-[3px] px-[13px] text-[13.5px] transition-[background,border-color] duration-100"
            style={{
              fontFamily: 'inherit',
              fontWeight: on ? 600 : 500,
              background: on ? '#FBF6EA' : '#FFFFFF',
              color: on ? '#0F1E33' : '#5C6675',
              border: `1px solid ${on ? '#C9A24A' : '#D8DDE5'}`,
            }}
          >
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px]"
              style={{
                background: on ? '#C9A24A' : '#FFFFFF',
                border: `1px solid ${on ? '#C9A24A' : '#C8CFD9'}`,
              }}
            >
              {on ? (
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M2 6.4 L4.6 9 L10 3.2"
                    fill="none"
                    stroke="#0F1E33"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : null}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
