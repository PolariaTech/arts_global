import { DEMO_ACCOUNTS, type ArtsRole } from '@/constants/roles';
import type { ArtsSession } from '@/types/auth/session';

export const SESSION_KEY = 'arts.session.v1';

export function initialsFromName(displayName: string): string {
  const parts = displayName.replace(/\./g, '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function loadSession(): ArtsSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ArtsSession;
    if (!parsed?.email || !parsed?.role || !parsed?.displayName) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: ArtsSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function sessionFromEmail(email: string): ArtsSession | null {
  const account = DEMO_ACCOUNTS.find((a) => a.email === email);
  if (!account) return null;
  return {
    email: account.email,
    displayName: account.displayName,
    role: account.role as ArtsRole,
    initials: initialsFromName(account.displayName),
  };
}
