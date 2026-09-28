import { QuoteWizardHeader } from '@/modules/quote/shared/components/QuoteWizardHeader';
import { InsuredStepForm } from './InsuredStepForm';

export function InsuredStepPage() {
  return (
    <>
      <QuoteWizardHeader active={0} />
      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <InsuredStepForm />
      </main>
    </>
  );
}
