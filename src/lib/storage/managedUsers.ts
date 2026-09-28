import { USERS } from '@/data/mock/users';
import type { UserRecord } from '@/types/user/user';

const KEY = 'arts.users.v1';

function cloneSeed(): UserRecord[] {
  return USERS.map((u) => ({ ...u, countries: [...u.countries] }));
}

export function loadManagedUsers(): UserRecord[] {
  if (typeof window === 'undefined') return cloneSeed();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return cloneSeed();
    const parsed = JSON.parse(raw) as UserRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) return cloneSeed();
    return parsed;
  } catch {
    return cloneSeed();
  }
}

export function saveManagedUsers(users: UserRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}
