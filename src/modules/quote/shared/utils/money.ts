export function formatMoneyInput(raw: string): string {
  const digits = String(raw).replace(/[^\d]/g, '');
  return digits ? Number(digits).toLocaleString('en-US') : '';
}
