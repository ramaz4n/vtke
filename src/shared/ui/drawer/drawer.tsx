import { ReactNode } from 'react';

import { Portal } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react/effector-react.umd';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';

import {
  $drawer,
  DrawerName,
  hideDrawerEvent,
} from '@/shared/models/drawer.ts';

export interface DrawerProps {
  name: DrawerName;
  children?: ReactNode;
  onClose?: () => void;
}

export const Drawer = ({ children, name, onClose }: DrawerProps) => {
  const [store, resetStore] = useUnit([$drawer, hideDrawerEvent]);

  const isVisible = store?.has(name);

  function handleClose() {
    onClose?.();
    resetStore(name);
  }

  return (
    <Portal>
      <motion.div
        className='fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-md transition-all duration-300'
        {...(isVisible && {
          style: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          },
        })}
        onClick={handleClose}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              animate={{ x: 0 }}
              className='h-full w-10/12 bg-white p-4 shadow-lg sm:w-1/2 lg:w-1/3'
              exit={{ x: '100%' }}
              initial={{ x: '100%' }}
              transition={{
                damping: 10,
                stiffness: 10_000,
                type: 'keyframes',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className='absolute right-4 top-4 text-gray-600'
                onClick={handleClose}
              >
                <MdOutlineClose size='40px' />
              </button>

              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal>
  );
};
