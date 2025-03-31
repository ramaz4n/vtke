export const getFormatSum = (
  value?: number | string,
  options?: Intl.NumberFormatOptions,
): string => {
  if (!value) {
    value = 0;
  }

  if (typeof value !== 'number') {
    value = Number.parseFloat(value);
  }

  return new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    maximumSignificantDigits: 6,
    style: 'currency',
    ...options,
  }).format(value ?? 0);
};
