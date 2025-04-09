import { Portal } from '@gravity-ui/uikit';
import ConfettiPrimitive from 'react-confetti';

export const Confetti = () => (
  <Portal>
    <ConfettiPrimitive
      height={window?.innerHeight}
      numberOfPieces={500}
      recycle={false}
      style={{ zIndex: 9999 }}
      tweenDuration={12_000}
      width={window?.innerWidth}
    />
  </Portal>
);
