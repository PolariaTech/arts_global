import { QuoteWizardHeader } from '@/modules/quote/shared/components/QuoteWizardHeader';
import { CoverageStepForm } from './CoverageStepForm';

export function CoverageStepPage() {
  return (
    <>
      <QuoteWizardHeader active={4} />
      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <CoverageStepForm />
      </main>
    </>
  );
}
