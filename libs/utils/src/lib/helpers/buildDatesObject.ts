import { buildDateTimeString } from '../helpers';
import { DateFormats } from '../types';

export function buildDatesObject(separator: string | undefined = '/'): DateFormats {
  const dateTimeFormat = buildDateTimeString(separator);
  const dateFormat = dateTimeFormat.slice(0, dateTimeFormat.length - 6);
  return {
    dateTimeFormat,
    dateFormat,
    clientDateFormat: dateTimeFormat.replace('DD', 'dd'),
    monthYear: dateFormat.slice(3)
  };
}
