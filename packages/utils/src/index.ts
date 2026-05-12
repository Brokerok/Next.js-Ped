/**
 * Russian pluralization.
 * forms: [one, few, many] — e.g. ["проект", "проекта", "проектов"]
 *
 * 1 проект, 2 проекта, 5 проектов
 */
export function pluralize(
  n: number,
  forms: readonly [string, string, string]
): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}
