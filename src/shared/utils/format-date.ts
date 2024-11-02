import dayjs from 'dayjs';

import { DATE_FORMAT } from '../constants/date.ts';

export const formatDate = (date: number | string, format = DATE_FORMAT) => {
  if (typeof date === 'string') {
    return dayjs(date).format(format);
  }

  return dayjs(date * 1000).format(format);
};

export function formatDateByTimestamp(
  timestamp?: number,
  format = DATE_FORMAT,
) {
  if (!timestamp) return '';

  return dayjs.unix(timestamp).format(format);
}
