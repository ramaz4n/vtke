export const getFormatSum = (
  value?: number,
  options?: Intl.NumberFormatOptions,
): string =>
  new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    maximumSignificantDigits: 6,
    style: 'currency',
    ...options,
  }).format(value ?? 0);
