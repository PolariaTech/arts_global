'use client';

import { ArtsLogo } from '@/components/layouts/sidebar/ArtsLogo';
import type { LoginLang } from '../constants/copy';
import { LOGIN_COPY } from '../constants/copy';

type LoginHeaderProps = {
  lang: LoginLang;
  onLang: (lang: LoginLang) => void;
};

export function LoginHeader({ lang, onLang }: LoginHeaderProps) {
  const t = LOGIN_COPY[lang];

  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b-2 border-[#C9A24A] bg-[#0F1E33] px-6 md:px-10">
      <div className="flex items-center gap-3.5">
        <ArtsLogo size={34} />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[19px] font-bold tracking-[0.14em] text-white">ARTS</span>
            <span className="text-[19px] font-medium italic text-[#C9A24A]">Global</span>
          </div>
          <span className="text-[10px] font-medium tracking-[0.1em] text-[#8895A8] uppercase">
            Aerospace Risk Transfer Solutions
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-[11px] font-medium tracking-[0.1em] text-[#6E7C90] uppercase sm:inline">
          {t.platformLabel}
        </span>
        <div className="flex overflow-hidden rounded-[3px] border border-[#2A3B54]">
          <button
            type="button"
            onClick={() => onLang('ES')}
            className="cursor-pointer px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors"
            style={{
              background: lang === 'ES' ? '#C9A24A' : 'transparent',
              color: lang === 'ES' ? '#0F1E33' : '#9DAABC',
              border: 'none',
              fontFamily: 'inherit',
            }}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => onLang('EN')}
            className="cursor-pointer px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors"
            style={{
              background: lang === 'EN' ? '#C9A24A' : 'transparent',
              color: lang === 'EN' ? '#0F1E33' : '#9DAABC',
              border: 'none',
              fontFamily: 'inherit',
            }}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
