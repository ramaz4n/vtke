import { RefObject, useEffect } from 'react';

export const useScroll = (
  element: RefObject<Element>,
  callback?: (e: Event) => void,
) => {
  useEffect(() => {
    if (!element.current) return;

    element.current.addEventListener('scroll', (e) => callback?.(e));
  }, []);
};
