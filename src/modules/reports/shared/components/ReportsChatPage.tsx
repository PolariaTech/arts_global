'use client';

import { useEffect, useRef, useState } from 'react';
import { StatCard } from '@/components/shared/cards/StatCard';
import { useAuth } from '@/providers/auth/AuthProvider';
import {
  REPORT_KPIS,
  REPORT_SUGGESTIONS,
  reportCountNote,
  resolveAgentMessage,
} from '@/services/mock/reports';
import type { ReportChatMode } from '@/types/reports/chat';
import { useReportsChat } from '../hooks/useReportsChat';
import { ChatMessageBubble } from './ChatMessageBubble';

type ReportsChatPageProps = {
  mode: ReportChatMode;
};

export function ReportsChatPage({ mode }: ReportsChatPageProps) {
  const { session } = useAuth();
  const initials = session?.initials ?? 'AR';
  const { messages, draft, setDraft, send } = useReportsChat(mode);
  const [focus, setFocus] = useState(false);
  const [toast, setToast] = useState('');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const kpis = REPORT_KPIS[mode];
  const suggestions = REPORT_SUGGESTIONS[mode];
  const note = reportCountNote(mode);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2600);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(draft);
  }

  return (
    <div className="flex h-[100vh] min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex-none border-b border-[#E4E8EE] bg-white px-6 py-5">
        <div className="mx-auto grid max-w-[min(1300px,94vw)] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3.5">
          {kpis.map((k) => (
            <StatCard
              key={k.label}
              value={k.value}
              label={k.label}
              note={k.note}
              accent={k.accent}
              compact
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto bg-[#F7F8FA] px-6 pt-6 pb-2"
      >
        <div className="mx-auto flex max-w-[min(1300px,94vw)] flex-col gap-5">
          {messages.map((m) => {
            if (m.role === 'user') {
              return (
                <ChatMessageBubble
                  key={m.id}
                  kind="user"
                  text={m.text}
                  initials={initials}
                />
              );
            }
            const resolved = resolveAgentMessage(
              mode,
              m.reportKey,
              m.thinking,
              m.query,
            );
            return (
              <ChatMessageBubble
                key={m.id}
                kind="agent"
                text={resolved.text}
                thinking={resolved.thinking}
                report={resolved.report}
                followUps={resolved.followUps}
                onFollowUp={send}
                onToast={showToast}
              />
            );
          })}
          <div className="h-1" />
        </div>
      </div>

      <div className="flex-none border-t border-[#E4E8EE] bg-white px-6 pt-4 pb-5">
        <div className="mx-auto flex max-w-[min(1300px,94vw)] flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-0.5 text-[11px] font-semibold tracking-[0.08em] text-[#9AA3AE] uppercase">
              Sugerencias
            </span>
            {suggestions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => send(label)}
                className="h-[34px] cursor-pointer rounded-full border border-[#D8DDE5] bg-white px-[13px] text-[12.5px] font-medium whitespace-nowrap text-[#3B4553] hover:border-[#C9A24A] hover:bg-[#FDFBF6] hover:text-[#0F1E33]"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-[11px]">
            <div className="relative min-w-0 flex-1">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder="Pregúntame sobre tus reportes…"
                className="h-[50px] w-full rounded-[3px] border bg-white px-4 font-[inherit] text-[14.5px] text-[#14181F] outline-none transition-[border-color,box-shadow] duration-100"
                style={{
                  borderColor: focus ? '#C9A24A' : '#C8CFD9',
                  boxShadow: focus ? '0 0 0 3px rgba(201,162,74,.18)' : 'none',
                }}
              />
            </div>
            <button
              type="submit"
              className="h-[50px] min-w-[116px] flex-none cursor-pointer rounded-[3px] border-0 bg-[#C9A24A] px-[26px] text-[15px] font-semibold tracking-wide text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
            >
              Enviar
            </button>
          </form>

          <span className="text-[11.5px] text-[#9AA3AE]">{note}</span>
        </div>
      </div>

      {toast ? (
        <div className="fixed right-6 bottom-6 z-40 rounded-[3px] bg-[#0F1E33] px-4 py-2.5 text-[13px] font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
