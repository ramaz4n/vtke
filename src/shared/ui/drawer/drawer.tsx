import { ReactNode } from 'react';

import { Portal } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react/effector-react.umd';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import { useScrollLock } from 'usehooks-ts';

import {
  $drawer,
  DrawerName,
  hideDrawerEvent,
} from '@/shared/models/drawer.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';

export interface DrawerProps {
  name: DrawerName;
  children?: ReactNode;
  onClose?: () => void;
  shouldCloseButton?: boolean;
  shouldScrollContent?: boolean;
}

export const Drawer = ({
  children,
  shouldCloseButton = true,
  shouldScrollContent = true,
  name,
  onClose,
}: DrawerProps) => {
  const [store, resetStore] = useUnit([$drawer, hideDrawerEvent]);

  const isVisible = Boolean(store?.has(name));

  function handleClose() {
    onClose?.();
    resetStore(name);
  }

  useScrollLock({
    autoLock: isVisible,
  });

  return (
    <Portal>
      <motion.div
        className={cn(
          'z-drawer fixed inset-0 flex justify-end transition-all duration-300',
          { 'visible bg-black/50 backdrop-blur-md': isVisible },
          { 'pointer-events-none invisible': !isVisible },
        )}
        onClick={handleClose}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              initial={{ x: '100%' }}
              className={cn(
                'h-full w-10/12 bg-white p-4 shadow-lg sm:w-1/2 lg:w-1/3',
                { 'overflow-y-auto': shouldScrollContent },
              )}
              transition={{
                damping: 10,
                stiffness: 10_000,
                type: 'keyframes',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {shouldCloseButton && (
                <div className='flex items-center justify-end'>
                  <Button
                    className='clamp-11 flex-center'
                    view='flat'
                    onClick={handleClose}
                  >
                    <MdOutlineClose className='text-gray-600' size='40px' />
                  </Button>
                </div>
              )}

              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal>
  );
};
