import { MotionProps } from 'framer-motion';

export const FADE_ANIMATION: MotionProps = {
  animate: { display: 'block', opacity: 1 },
  exit: { display: 'none', opacity: 0 },
  initial: { display: 'none', opacity: 0 },
  transition: { duration: 0.75 },
};

export const fadeAnimation = (duration?: number): MotionProps => ({
  ...FADE_ANIMATION,
  transition: { duration: duration || 0.75 },
});
