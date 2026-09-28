'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HOME_BY_ROLE } from '@/config/navigation';
import { useAuth } from '@/providers/auth/AuthProvider';
import type { LoginLang } from '../constants/copy';
import { LOGIN_COPY } from '../constants/copy';
import { LoginForm } from './LoginForm';
import { LoginHeader } from './LoginHeader';
import { LoginSkeleton } from '@/components/shared/skeleton';
import { useMinLoad } from '@/hooks/useMinLoad';

export function LoginPage() {
  const [lang, setLang] = useState<LoginLang>('ES');
  const t = LOGIN_COPY[lang];
  const { session, ready } = useAuth();
  const router = useRouter();
  const minReady = useMinLoad(ready);

  useEffect(() => {
    if (ready && session) {
      router.replace(HOME_BY_ROLE[session.role]);
    }
  }, [ready, session, router]);

  if (!minReady || session) {
    return <LoginSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#14181F]">
      <LoginHeader lang={lang} onLang={setLang} />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-[428px]">
          <div
            className="rounded-[5px] border border-[#DFE3E9] bg-white px-8 py-10 sm:px-11 sm:pt-11 sm:pb-9"
            style={{
              boxShadow: '0 1px 2px rgba(15,30,51,.05), 0 12px 32px rgba(15,30,51,.07)',
            }}
          >
            <h1 className="m-0 mb-2 text-[26px] font-semibold tracking-tight text-[#0F1E33]">
              {t.heading}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-[#5C6675]">{t.subheading}</p>

            <LoginForm lang={lang} />

            <div className="mt-[22px] text-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="border-b border-[#C9A24A] pb-px text-[13.5px] font-medium text-[#0F1E33] no-underline hover:border-[#8A6E22] hover:text-[#8A6E22]"
              >
                {t.forgot}
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2.5">
            <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true" className="shrink-0">
              <path
                d="M6 1 L11 3 V7.2 C11 10.2 8.9 12.2 6 13 C3.1 12.2 1 10.2 1 7.2 V3 Z"
                fill="none"
                stroke="#A9B2BF"
                strokeWidth="1.2"
              />
            </svg>
            <span className="text-xs leading-relaxed text-[#77808E]">{t.security}</span>
          </div>

          <p className="mt-7 text-center text-[11px] tracking-wide text-[#9AA3AE]">{t.footer}</p>
        </div>
      </main>
    </div>
  );
}
