'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  REPORT_SEED,
  matchReportKey,
} from '@/services/mock/reports';
import type { ChatMessage, ReportChatMode } from '@/types/reports/chat';

const THINK_MS = 900;

export function useReportsChat(mode: ReportChatMode) {
  const seed = REPORT_SEED[mode];
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'user', text: seed.userText },
    {
      id: 2,
      role: 'agent',
      reportKey: seed.reportKey,
      thinking: false,
      query: seed.userText,
    },
  ]);
  const [draft, setDraft] = useState('');
  const [nextId, setNextId] = useState(3);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const send = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;

      const key = matchReportKey(mode, clean);
      const userId = nextId;
      const agentId = nextId + 1;

      setDraft('');
      setNextId((n) => n + 2);
      setMessages((prev) => [
        ...prev,
        { id: userId, role: 'user', text: clean },
        {
          id: agentId,
          role: 'agent',
          reportKey: key,
          thinking: true,
          query: clean,
        },
      ]);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.role === 'agent' && m.thinking ? { ...m, thinking: false } : m,
          ),
        );
      }, THINK_MS);
    },
    [mode, nextId],
  );

  return { messages, draft, setDraft, send };
}
