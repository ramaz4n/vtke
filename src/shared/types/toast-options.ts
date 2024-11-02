import { AlertOptions, AlertTypes } from './alerts.ts';

export const TOAST_OPTIONS: Record<AlertTypes, AlertOptions> = {
  error: {
    icon: 'common/warning',
    iconClass: 'fill-danger',
    textClass: 'text-danger',
    title: 'Ошибка',
  },
  success: {
    icon: 'common/success',
    iconClass: 'fill-success',
    textClass: 'text-success',
    title: 'Успешно',
  },
};
