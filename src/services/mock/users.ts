import { COUNTRY_NAMES } from '@/data/mock/countries';
import { ROLES, type ArtsRole } from '@/constants/roles';
import {
  loadManagedUsers,
  saveManagedUsers,
} from '@/lib/storage/managedUsers';
import type { UserRecord } from '@/types/user/user';

export type UserFormState = {
  id: number | null;
  name: string;
  email: string;
  role: ArtsRole;
  countries: string[];
  active: boolean;
};

export const BLANK_USER_FORM: UserFormState = {
  id: null,
  name: '',
  email: '',
  role: ROLES.producer,
  countries: [],
  active: true,
};

export const USER_ROLE_TABS: Array<ArtsRole | 'Todos'> = [
  'Todos',
  ROLES.producer,
  ROLES.claimsViewer,
  ROLES.administrator,
  ROLES.auditor,
];

export const ROLE_BADGE: Record<
  ArtsRole,
  { bg: string; color: string; border: string }
> = {
  [ROLES.producer]: { bg: '#EEF1F6', color: '#0F1E33', border: '#C9D2DF' },
  [ROLES.administrator]: { bg: '#FBF6EA', color: '#6B5A2E', border: '#E8CE84' },
  [ROLES.auditor]: { bg: '#EDF6EF', color: '#245F35', border: '#B5D8BF' },
  [ROLES.claimsViewer]: { bg: '#F0F2F6', color: '#5C6675', border: '#E0E4EA' },
};

export function listAssignableCountries(): readonly string[] {
  return COUNTRY_NAMES;
}

export function listUsers(): UserRecord[] {
  return loadManagedUsers();
}

export function listActiveUsers(): UserRecord[] {
  return loadManagedUsers().filter((u) => u.active);
}

export function getUserByEmail(email: string): UserRecord | undefined {
  const key = email.trim().toLowerCase();
  return loadManagedUsers().find((u) => u.email.toLowerCase() === key);
}

export function listUsersByRole(role: ArtsRole): UserRecord[] {
  return loadManagedUsers().filter((u) => u.role === role);
}

export function userCount(): number {
  return loadManagedUsers().length;
}

export function usersSummary(users: UserRecord[]): string {
  const active = users.filter((u) => u.active).length;
  return `${users.length} usuarios · ${active} activos · ${users.length - active} inactivos`;
}

export function filterUsers(
  query: string,
  roleFilter: ArtsRole | 'Todos',
): UserRecord[] {
  const q = query.trim().toLowerCase();
  return loadManagedUsers().filter((u) => {
    if (roleFilter !== 'Todos' && u.role !== roleFilter) return false;
    if (q && !(u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))) {
      return false;
    }
    return true;
  });
}

export function formatUserCountries(countries: string[]): string {
  if (countries.length === COUNTRY_NAMES.length) return 'Todos los países';
  return countries.join(' · ');
}

export function userInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function toggleUserActive(id: number): UserRecord | null {
  const list = loadManagedUsers();
  const target = list.find((u) => u.id === id);
  if (!target) return null;
  const next = list.map((u) =>
    u.id === id
      ? {
          ...u,
          active: !u.active,
          lastActive: u.active
            ? 'Sin acceso desde 23 ago 2026'
            : 'Reactivado hoy',
        }
      : u,
  );
  saveManagedUsers(next);
  return next.find((u) => u.id === id) ?? null;
}

export function saveUser(form: UserFormState): UserRecord | null {
  if (!form.name.trim()) return null;
  const list = loadManagedUsers();

  if (form.id) {
    const next = list.map((u) =>
      u.id === form.id
        ? {
            ...u,
            name: form.name.trim(),
            email: form.email.trim(),
            role: form.role,
            countries: [...form.countries],
            active: form.active,
          }
        : u,
    );
    saveManagedUsers(next);
    return next.find((u) => u.id === form.id) ?? null;
  }

  const id = Math.max(0, ...list.map((u) => u.id)) + 1;
  const created: UserRecord = {
    id,
    name: form.name.trim(),
    email: form.email.trim() || `usuario${id}@arts-global.com`,
    role: form.role,
    countries: [...form.countries],
    active: form.active,
    lastActive: 'Creado hoy · sin primer acceso',
  };
  saveManagedUsers([created, ...list]);
  return created;
}

export function formFromUser(u: UserRecord): UserFormState {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    countries: [...u.countries],
    active: u.active,
  };
}
