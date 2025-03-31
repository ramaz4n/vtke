import { useCart } from '@/shared/hooks/use-cart.ts';
import { useModal } from '@/shared/hooks/use-modal';
import { Button } from '@/shared/ui/button/button';
import { Modal } from '@/shared/ui/modal/modal.tsx';

export interface ResetCartConfirmModalProps {
  onSuccess?: () => void;
}

export const ResetCartConfirmModal = ({
  onSuccess,
}: ResetCartConfirmModalProps) => {
  const cart = useCart();
  const modal = useModal();

  const onReset = () => {
    onSuccess?.();
    cart.reset();
    modal.hide('reset-cart');
  };

  return (
    <Modal name='reset-cart' title='Очистить корзину?'>
      <div className='mt-4 flex items-center justify-end gap-4'>
        <Button
          className='w-full'
          size='l'
          view='flat'
          onClick={() => modal.hide('reset-cart')}
        >
          Оставить
        </Button>

        <Button className='w-full' size='l' onClick={onReset}>
          Да, очистить
        </Button>
      </div>
    </Modal>
  );
};
