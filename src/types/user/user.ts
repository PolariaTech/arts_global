import type { ArtsRole } from '@/constants/roles';

export type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: ArtsRole;
  countries: string[];
  active: boolean;
  lastActive: string;
};
