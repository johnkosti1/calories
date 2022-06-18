
export function buildDateTimeString(separator: string) {
  return 'DD/MM/yyyy HH:mm'.replace('/', separator)
}
