export const TODAY_ISO = "2026-06-19";

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function daysUntil(iso: string | null, today: string = TODAY_ISO): number | null {
  if (!iso) return null;
  const target = parseISODate(iso).getTime();
  const ref = parseISODate(today).getTime();
  return Math.round((target - ref) / (1000 * 60 * 60 * 24));
}

export function dueLabel(iso: string | null, today: string = TODAY_ISO): string {
  if (!iso) return "No due date";
  const delta = daysUntil(iso, today) ?? 0;
  if (delta < 0) return `Overdue · ${iso}`;
  if (delta === 0) return `Due today · ${iso}`;
  if (delta === 1) return `Due tomorrow · ${iso}`;
  if (delta <= 7) return `Due in ${delta} days · ${iso}`;
  return `Due ${iso}`;
}

export function dueTone(
  iso: string | null,
  today: string = TODAY_ISO,
): "danger" | "warn" | "muted" | "neutral" {
  if (!iso) return "muted";
  const delta = daysUntil(iso, today) ?? 0;
  if (delta < 0) return "danger";
  if (delta <= 3) return "danger";
  if (delta <= 7) return "warn";
  return "neutral";
}
