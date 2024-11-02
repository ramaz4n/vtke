import { RefObject, useCallback, useEffect } from 'react';

type Key = KeyboardEvent['key'];

export interface HotKeysOptions {
  enabled?: boolean;
  node?: RefObject<Element> | null;
  onKeyUp?: (e: KeyboardEvent) => void;
}

export const useHotKeys = (
  keys: Array<Key> | Key,
  callback?: (e: KeyboardEvent) => void,
  options?: Partial<HotKeysOptions>,
) => {
  const isKeysArray = Array.isArray(keys);

  const observer = (options?.node?.current || window) as Window;

  const handler = useCallback(
    (event: KeyboardEvent) => callback?.(event),
    [callback, options],
  );

  useEffect(() => {
    const keysMap = new Map<Key, boolean>();
    let pressed = false;

    const callbackDown = (e: KeyboardEvent) => {
      if (!isKeysArray && e.key === keys) {
        handler(e);

        return;
      }

      if (!keys.includes(e.key)) {
        return;
      }

      keysMap.set(e.key, true);

      if (keysMap.size === keys.length && !pressed) {
        pressed = true;
        handler(e);
      }
    };

    const callbackUp = (e: KeyboardEvent) => {
      options?.onKeyUp?.(e);

      if (!isKeysArray) {
        return;
      }

      pressed = false;

      if (keysMap.has(e.key)) {
        keysMap.delete(e.key);
      }
    };

    if (!options?.enabled) {
      observer.addEventListener('keyup', callbackUp);
      observer.addEventListener('keydown', callbackDown);
    }

    return () => {
      observer.removeEventListener('keyup', callbackUp);
      observer.removeEventListener('keydown', callbackDown);
    };
  }, [handler, isKeysArray, keys, options?.enabled]);
};
