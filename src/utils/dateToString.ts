export function dateToString(date: Date): string {
  const isoString = date.toISOString();
  const formatedData = isoString.split('T')[0];
  return formatedData
}