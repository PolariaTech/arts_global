import Link from 'next/link';

type WizardNavProps = {
  backHref: string;
  progressNote: string;
  nextLabel?: string;
  nextMinWidth?: number;
  busy?: boolean;
};

export function WizardNav({
  backHref,
  progressNote,
  nextLabel = 'Siguiente →',
  nextMinWidth = 180,
  busy = false,
}: WizardNavProps) {
  return (
    <div className="flex flex-wrap-reverse items-center justify-between gap-4 pt-0.5">
      <Link
        href={backHref}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[3px] border border-[#C2C9D3] bg-white px-[26px] text-[15px] font-medium whitespace-nowrap text-[#0F1E33] no-underline hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
      >
        ← Atrás
      </Link>
      <div className="ml-auto flex flex-wrap items-center gap-4">
        {progressNote ? (
          <span className="text-[12.5px] text-[#8A93A1]">{progressNote}</span>
        ) : null}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[3px] border-none bg-[#C9A24A] px-8 text-[15px] font-semibold tracking-wide whitespace-nowrap text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35] disabled:cursor-default disabled:opacity-75"
          style={{ fontFamily: 'inherit', minWidth: nextMinWidth }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
