const PREFIX = 'arts.bound.';

export type BoundPolicyRecord = Record<string, unknown>;

export function saveBoundPolicy(number: string, data: BoundPolicyRecord): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFIX + number, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function loadBoundPolicy(number: string): BoundPolicyRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PREFIX + number);
    return raw ? (JSON.parse(raw) as BoundPolicyRecord) : null;
  } catch {
    return null;
  }
}
