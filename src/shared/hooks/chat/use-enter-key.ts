import { KeyboardEvent, RefObject, useCallback, useEffect } from 'react';
export const useEnterKey = (
  callback?: (e: KeyboardEvent) => void,
  ref?: RefObject<Element>,
) => {
  const memoized = useCallback(
    (event: KeyboardEvent) => callback?.(event),
    [callback],
  );

  useEffect(() => {
    function handler(event: globalThis.KeyboardEvent) {
      if (!event.shiftKey && event.key === 'Enter') {
        event.preventDefault();

        memoized?.(event as unknown as KeyboardEvent);
      }
    }

    ((ref?.current as HTMLElement) || document)?.addEventListener(
      'keydown',
      handler,
    );

    return () => {
      ((ref?.current as HTMLElement) || document).removeEventListener(
        'keydown',
        handler,
      );
    };
  }, []);
};
