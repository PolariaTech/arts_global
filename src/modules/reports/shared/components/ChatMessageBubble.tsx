'use client';

import { ArtsLogo } from '@/components/layouts/sidebar/ArtsLogo';
import type { ReportCardData } from '@/types/reports/chat';
import { ReportCard } from './ReportCard';

type ChatMessageBubbleProps =
  | { kind: 'user'; text: string; initials: string }
  | {
      kind: 'agent';
      text: string;
      thinking: boolean;
      report: ReportCardData | null;
      followUps: string[];
      onFollowUp: (label: string) => void;
      onToast: (msg: string) => void;
    };

export function ChatMessageBubble(props: ChatMessageBubbleProps) {
  if (props.kind === 'user') {
    return (
      <div className="arts-msg-in flex justify-end">
        <div className="flex max-w-[620px] items-start gap-[11px]">
          <div className="rounded-[4px_4px_0_4px] bg-[#0F1E33] px-[17px] py-[13px] text-[14.5px] leading-normal text-white text-pretty">
            {props.text}
          </div>
          <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border border-[#D8DDE5] bg-[#EEF1F6] text-[11px] font-semibold text-[#0F1E33]">
            {props.initials}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="arts-msg-in flex justify-start">
      <div className="flex max-w-[780px] items-start gap-3">
        <span className="mt-0.5 flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-[#0F1E33]">
          <ArtsLogo size={15} />
        </span>
        <div className="flex min-w-0 flex-col gap-[13px]">
          <p className="m-0 text-[14.5px] leading-relaxed text-[#14181F] text-pretty">
            {props.text}
          </p>

          {props.thinking ? (
            <span className="inline-flex items-center gap-[5px] py-0.5">
              <span className="arts-dot h-1.5 w-1.5 rounded-full bg-[#C9A24A]" />
              <span className="arts-dot arts-dot-2 h-1.5 w-1.5 rounded-full bg-[#C9A24A]" />
              <span className="arts-dot arts-dot-3 h-1.5 w-1.5 rounded-full bg-[#C9A24A]" />
            </span>
          ) : null}

          {!props.thinking && props.report ? (
            <ReportCard report={props.report} onToast={props.onToast} />
          ) : null}

          {!props.thinking && props.followUps.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {props.followUps.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => props.onFollowUp(label)}
                  className="h-8 cursor-pointer rounded-full border border-[#D8DDE5] bg-white px-3 text-[12.5px] font-medium whitespace-nowrap text-[#3B4553] hover:border-[#C9A24A] hover:bg-[#FDFBF6] hover:text-[#0F1E33]"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
