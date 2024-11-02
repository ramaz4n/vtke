import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import cc from 'classcat';
import toast from 'react-hot-toast';

import { AlertShowOptions, AlertTypes } from '../types/alerts.ts';
import { TOAST_OPTIONS } from '../types/toast-options.ts';
import { Icon } from '../ui/icon/icon.tsx';

export interface ShowToastProps {
  message: AlertShowOptions['message'];
  errorMessage?: AlertShowOptions['errorMessage'];
  options?: Partial<AlertShowOptions>;
  type?: AlertTypes;
}
export const showToast = ({
  errorMessage,
  message,
  options,
  type,
}: ShowToastProps) => {
  const { icon, title, iconClass, textClass } =
    TOAST_OPTIONS[type || 'success'];

  toast.custom(
    (t) => (
      <Card
        radius='sm'
        className={cc([
          'group w-[250px]',
          {
            'animate-enter': t.visible,
            'animate-leave': !t.visible,
          },
        ])}
      >
        <CardHeader className='bg-default-600 dark:bg-default flex items-center justify-between px-2 py-1 font-bold'>
          <Icon className={cc(['size-6', iconClass])} name={icon} />

          <span className={textClass}>{title}</span>

          <Button
            isIconOnly
            className='invisible opacity-0 animated group-hover:visible group-hover:opacity-100'
            color='danger'
            size='sm'
            onClick={() => toast.dismiss(t.id)}
          >
            <Icon name='common/close' />
          </Button>
        </CardHeader>

        <CardBody className='text-default-400 px-2 py-4 text-sm'>
          {message}
        </CardBody>

        {errorMessage && import.meta.env.DEV && (
          <CardFooter>
            <span className='text-danger'>{errorMessage}</span>
          </CardFooter>
        )}
      </Card>
    ),
    { duration: options?.duration || 3000 },
  );
};
