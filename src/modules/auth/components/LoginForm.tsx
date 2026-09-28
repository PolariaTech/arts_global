'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { DEMO_ACCOUNTS } from '@/constants/roles';
import { HOME_BY_ROLE } from '@/config/navigation';
import { sessionFromEmail } from '@/lib/auth/session';
import { useAuth } from '@/providers/auth/AuthProvider';
import type { LoginLang } from '../constants/copy';
import { LOGIN_COPY } from '../constants/copy';

type LoginFormProps = {
  lang: LoginLang;
};

export function LoginForm({ lang }: LoginFormProps) {
  const t = LOGIN_COPY[lang];
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>(DEMO_ACCOUNTS[0].email);
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [focus, setFocus] = useState<'email' | 'password' | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fieldStyle = (name: 'email' | 'password', extra?: CSSProperties): CSSProperties => {
    const on = focus === name;
    return {
      height: 46,
      padding: '0 14px',
      width: '100%',
      fontFamily: 'inherit',
      fontSize: 15,
      color: '#14181F',
      background: '#FFFFFF',
      borderRadius: 3,
      outline: 'none',
      border: on ? '1px solid #C9A24A' : '1px solid #C8CFD9',
      boxShadow: on ? '0 0 0 3px rgba(201,162,74,.18)' : 'none',
      transition: 'border-color .12s, box-shadow .12s',
      ...extra,
    };
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const session = sessionFromEmail(email);
    if (!session) return;
    setSubmitting(true);
    login(session);
    await new Promise((r) => setTimeout(r, 700));
    router.replace(HOME_BY_ROLE[session.role]);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-[7px]">
        <label
          htmlFor="arts-email"
          className="text-xs font-semibold tracking-wider text-[#3B4553] uppercase"
        >
          {t.emailLabel}
        </label>
        <div className="relative">
          <select
            id="arts-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocus('email')}
            onBlur={() => setFocus(null)}
            style={fieldStyle('email', {
              paddingRight: 32,
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
            })}
          >
            {DEMO_ACCOUNTS.map((a) => (
              <option key={a.email} value={a.email}>
                {a.email}
              </option>
            ))}
          </select>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            aria-hidden="true"
            className="pointer-events-none absolute top-[19px] right-3.5"
          >
            <path
              d="M1 1 L5 5 L9 1"
              fill="none"
              stroke="#5C6675"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="text-xs text-[#8A93A1]">{t.emailHint}</span>
      </div>

      <div className="flex flex-col gap-[7px]">
        <label
          htmlFor="arts-pass"
          className="text-xs font-semibold tracking-wider text-[#3B4553] uppercase"
        >
          {t.passwordLabel}
        </label>
        <div className="relative">
          <input
            id="arts-pass"
            type={reveal ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocus('password')}
            onBlur={() => setFocus(null)}
            placeholder="••••••••••"
            style={fieldStyle('password', { paddingRight: 76 })}
          />
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            className="absolute top-1.5 right-1.5 h-[34px] cursor-pointer rounded-[3px] border-none bg-transparent px-2.5 text-xs font-semibold tracking-wider text-[#5C6675] uppercase hover:bg-[#F2F4F7] hover:text-[#0F1E33]"
            style={{ fontFamily: 'inherit' }}
          >
            {reveal ? t.hide : t.show}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-12 w-full cursor-pointer rounded-[3px] border-none text-[15px] font-semibold tracking-wide text-[#0F1E33] transition-colors hover:bg-[#B98F35] disabled:cursor-default disabled:opacity-75"
        style={{
          fontFamily: 'inherit',
          background: '#C9A24A',
        }}
      >
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
