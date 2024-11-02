import { parseDate, parseDateTime } from '@internationalized/date';
import { DateValue } from '@nextui-org/react';

export const formatDateValue = (
  date: string | DateValue,
): DateValue | undefined => {
  if (!date) {
    return;
  }

  if (typeof date !== 'string') return date as DateValue;
  if (date.length !== 10) return;

  const dateArray = date.split('.');
  const year = dateArray[2];
  const month = dateArray[1].padStart(2, '0');
  const day = dateArray[0].padStart(2, '0');

  return parseDate(`${year}-${month}-${day}`);
};

export const formatDateWithMinuteValue = (
  date: string | DateValue,
): DateValue | undefined => {
  if (!date) {
    return;
  }

  if (typeof date !== 'string') return date as DateValue;
  if (date.length !== 16) return;

  const [first, second] = date.split(' ');
  const year = first.split('.')[2];
  const month = first.split('.')[1].padStart(2, '0');
  const day = first.split('.')[0].padStart(2, '0');

  const hour = second.split(':')[0];
  const minute = second.split(':')[1];

  return parseDateTime(`${year}-${month}-${day}T${hour}:${minute}`);
};
