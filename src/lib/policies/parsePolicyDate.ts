const MONTHS: Record<string, number> = {
  ene: 0,
  feb: 1,
  mar: 2,
  abr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dic: 11,
};

/** Parsea fechas del libro mock («9 sep 2026») a Date local a medianoche. */
export function parsePolicyDate(value: string): Date | null {
  const m = value
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+([a-záéíóú]+)\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[2]];
  if (month === undefined) return null;
  const day = Number(m[1]);
  const year = Number(m[3]);
  const d = new Date(year, month, day);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

/** Parsea input type="date" (YYYY-MM-DD) a Date local. */
export function parseInputDate(value: string): Date | null {
  if (!value) return null;
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
