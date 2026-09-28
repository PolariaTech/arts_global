import { QUOTE_STEP_LABELS, type QuoteStepIndex } from '../constants/steps';

type QuoteStepperProps = {
  active: QuoteStepIndex;
};

export function QuoteStepper({ active }: QuoteStepperProps) {
  return (
    <div className="flex flex-wrap items-stretch gap-2.5">
      {QUOTE_STEP_LABELS.map((label, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <div key={label} className="flex min-w-[130px] flex-1 basis-[150px] flex-col gap-2">
            <span
              className="block h-[3px] rounded-[2px]"
              style={{
                background: on ? '#C9A24A' : done ? '#8A6E22' : '#E4E8EE',
              }}
            />
            <span
              className="text-[12.5px] leading-snug"
              style={{
                fontWeight: on ? 600 : 500,
                color: on ? '#0F1E33' : done ? '#5C6675' : '#8A93A1',
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
