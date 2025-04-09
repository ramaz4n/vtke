import { Portal } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react/effector-react.umd';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollLock } from 'usehooks-ts';

import { $modal, hideModalEvent } from '@/shared/models/modal.ts';
import { cn } from '@/shared/utils/cn.ts';

export const MobileMenu = () => {
  const [store, resetStore] = useUnit([$modal, hideModalEvent]);
  const name = 'mobile-menu';

  const isVisible = Boolean(store?.has(name));

  function handleClose() {
    resetStore(name);
  }

  useScrollLock({
    autoLock: isVisible,
  });

  return (
    <Portal>
      <motion.div
        className={cn(
          'z-drawer fixed inset-0 flex justify-center py-8 transition-all duration-300',
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
                'h-full w-10/12 bg-white p-4 shadow-lg sm:w-1/2 xl:w-1/3',
              )}
              transition={{
                damping: 10,
                stiffness: 10_000,
                type: 'keyframes',
              }}
              onClick={(e) => e.stopPropagation()}
            ></motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal>
  );
};
