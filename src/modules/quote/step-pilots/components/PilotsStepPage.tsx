import { QuoteWizardHeader } from '@/modules/quote/shared/components/QuoteWizardHeader';
import { PilotsStepForm } from './PilotsStepForm';

export function PilotsStepPage() {
  return (
    <>
      <QuoteWizardHeader active={2} />
      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <PilotsStepForm />
      </main>
    </>
  );
}
