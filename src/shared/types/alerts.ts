import { AnyIconName } from '../ui/icon/icon.tsx';

export type AlertTypes = 'success' | 'error';

export interface AlertShowOptions {
  id: number;
  message: string;
  type: AlertTypes;
  duration?: number;
  errorMessage?: string;
}

export interface AlertOptions {
  icon: AnyIconName;
  title: string;
}
