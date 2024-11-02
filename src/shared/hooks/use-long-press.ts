import { MouseEvent, TouchEvent, useCallback, useEffect, useRef } from 'react';

const DEFAULT_THRESHOLD = 450;

export function useLongPress(onStart: () => void, onEnd?: () => void) {
  const isLongPressActive = useRef(false);
  const isPressed = useRef(false);
  const timerId = useRef<number | undefined>();

  const start = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const canProcessEvent =
        ('button' in e && e.button === 0) ||
        ('touches' in e && e.touches.length > 0);

      if (isPressed.current || !canProcessEvent) {
        return;
      }

      isPressed.current = true;
      timerId.current = window.setTimeout(() => {
        onStart();
        isLongPressActive.current = true;
      }, DEFAULT_THRESHOLD);
    },
    [onStart],
  );

  const cancel = useCallback(() => {
    if (isLongPressActive.current) {
      onEnd?.();
    }

    isLongPressActive.current = false;
    isPressed.current = false;
    window.clearTimeout(timerId.current);
  }, [onEnd]);

  useEffect(
    () => () => {
      window.clearTimeout(timerId.current);
    },
    [],
  );

  return {
    onMouseDown: start,
    onMouseLeave: cancel,
    onMouseUp: cancel,
    onTouchEnd: cancel,
    onTouchStart: start,
  };
}
