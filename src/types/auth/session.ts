import type { ArtsRole } from '@/constants/roles';

export type ArtsSession = {
  email: string;
  displayName: string;
  role: ArtsRole;
  initials: string;
};
