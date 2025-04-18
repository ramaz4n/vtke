import { ReactNode } from 'react';

import { Xmark } from '@gravity-ui/icons';
import { Icon, Portal } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
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
  animate?: {
    x?: number;
    y?: number;
  };
  children?: ReactNode;
  exit?: {
    x?: string;
    y?: string;
  };
  initial?: {
    x?: string;
    y?: string;
  };
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
  animate,
  initial,
  exit,
}: DrawerProps) => {
  const { store, resetStore } = useUnit({
    resetStore: hideDrawerEvent,
    store: $drawer,
  });

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
          'fixed inset-0 z-drawer flex justify-end transition-all duration-300',
          { 'visible bg-black/50 backdrop-blur-md': isVisible },
          { 'pointer-events-none invisible': !isVisible },
        )}
        onClick={handleClose}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              animate={animate ?? { x: 0 }}
              exit={exit ?? { x: '100%' }}
              initial={initial ?? { x: '100%' }}
              className={cn(
                'h-full w-10/12 bg-white p-4 shadow-lg sm:w-1/2 xl:w-1/3',
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
                    <Icon className='text-secondary' data={Xmark} />
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
