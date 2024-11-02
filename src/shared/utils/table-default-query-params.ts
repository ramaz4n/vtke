import dayjs from 'dayjs';

import { DefaultType } from '../types/global.ts';
import { formatDateValue } from './format-date-value.ts';

type Result = Record<string, string | number>;

const dateKeyNames = new Set(['createdAt']);

export const parseQueryParamsForApi = <T = undefined>(
  params: unknown,
  { dateNames = dateKeyNames, formatParser = formatDateValue } = {
    dateNames: dateKeyNames,
    formatParser: formatDateValue,
  },
) => {
  const result: Result = {};
  const paramsEntries = { ...(params as Record<string, string>) };

  dateNames.add('createdAt');

  function isInteger(value: string) {
    if (Number.isNaN(Number.parseFloat(value))) {
      return false;
    }

    return Number.parseFloat(value).toString().length === value.length;
  }

  for (const paramsKey in paramsEntries) {
    if (paramsKey === 'visibleColumns') {
      continue;
    }

    if (dateNames.has(paramsKey)) {
      result[paramsKey as keyof Result] = dayjs(
        formatParser(paramsEntries[paramsKey]),
      ).unix();
      continue;
    }

    result[paramsKey as keyof Result] = isInteger(paramsEntries[paramsKey])
      ? Number(paramsEntries[paramsKey])
      : paramsEntries[paramsKey];
  }

  return result as DefaultType<Result, T>;
};
