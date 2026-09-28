import { QuoteWizardHeader } from '@/modules/quote/shared/components/QuoteWizardHeader';
import { AircraftStepForm } from './AircraftStepForm';

export function AircraftStepPage() {
  return (
    <>
      <QuoteWizardHeader active={1} />
      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <AircraftStepForm />
      </main>
    </>
  );
}
