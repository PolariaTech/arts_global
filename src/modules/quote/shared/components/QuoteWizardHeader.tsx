import { QuoteStepper } from './QuoteStepper';
import type { QuoteStepIndex } from '../constants/steps';

type QuoteWizardHeaderProps = {
  active: QuoteStepIndex;
};

export function QuoteWizardHeader({ active }: QuoteWizardHeaderProps) {
  return (
    <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 pt-[22px] pb-5">
      <div className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="m-0 text-[21px] font-semibold tracking-tight text-[#0F1E33]">
            Nueva cotización
          </h1>
          <span className="text-xs font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
            Paso {active + 1} de 5
          </span>
        </div>
        <QuoteStepper active={active} />
      </div>
    </div>
  );
}
