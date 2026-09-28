import { QuoteWizardHeader } from '@/modules/quote/shared/components/QuoteWizardHeader';
import { HistoryStepForm } from './HistoryStepForm';

export function HistoryStepPage() {
  return (
    <>
      <QuoteWizardHeader active={3} />
      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <HistoryStepForm />
      </main>
    </>
  );
}
