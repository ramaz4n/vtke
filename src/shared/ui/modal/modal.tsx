import { ReactNode } from 'react';

import { Xmark } from '@gravity-ui/icons';
import {
  Modal as ModalUI,
  type ModalProps as ModalPropsUI,
  Text,
} from '@gravity-ui/uikit';

import { useModal } from '@/shared/hooks/use-modal.ts';
import { ModalName } from '@/shared/models/modal.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';

enum ModalSize {
  fit = 'g-modal-size-fit',
  l = 'g-modal-size-l',
  m = 'g-modal-size-m',
  s = 'g-modal-size-s',
  xl = 'g-modal-size-xl',
}

interface ModalProps extends Omit<ModalPropsUI, 'onClose'> {
  name: ModalName;
  onClose?: (name: ModalName) => void;
  size?: 's' | 'm' | 'l' | 'fit' | 'xl';
  title?: ReactNode;
}

export const Modal = ({
  name,
  title,
  className,
  children,
  onClose,
  size = 'm',
  contentClassName,
  ...props
}: ModalProps) => {
  const modalControl = useModal();
  const isVisible = modalControl.state?.has(name);

  const onCloseModal = () => {
    modalControl.hide(name);
    onClose?.(name);
  };

  return (
    <ModalUI
      className={cn(ModalSize[size], className)}
      contentClassName={cn('p-4 w-full', contentClassName)}
      open={isVisible}
      onClose={onCloseModal}
      onOutsideClick={onCloseModal}
      {...props}
    >
      <div className='mb-2.5 flex-between'>
        <Text variant='subheader-3'>{title}</Text>

        <Button
          className='clamp-7 flex-center'
          size='s'
          view='flat'
          onClick={onCloseModal}
        >
          <Xmark />
        </Button>
      </div>

      <section className='space-y-2.5'>{children}</section>
    </ModalUI>
  );
};
