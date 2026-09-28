import { CLAIMS } from '@/data/mock/claims';
import type { ClaimRecord } from '@/types/claim/claim';
import { ROUTES } from '@/config/routes';

export type ClaimListRow = ClaimRecord & { href: string };

export function listClaims(): ClaimListRow[] {
  return CLAIMS.map((c) => ({
    ...c,
    href: ROUTES.claims.polizaDetalle(c.number),
  }));
}

export function getClaimByPolicy(number: string): ClaimRecord | undefined {
  return CLAIMS.find((c) => c.number === number);
}

export function claimCount(): number {
  return CLAIMS.length;
}
