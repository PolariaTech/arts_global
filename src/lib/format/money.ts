export function formatUsd(n: number, fractionDigits = 2): string {
  return (
    'US$ ' +
    n.toLocaleString('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })
  );
}

export function parseMoneyInput(value: string): number {
  return Number(String(value).replace(/[^\d]/g, '')) || 0;
}

export function formatMoneyInput(value: string): string {
  const digits = String(value).replace(/[^\d]/g, '');
  return digits ? Number(digits).toLocaleString('en-US') : '';
}
