
export function roundTo2Decimals(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
