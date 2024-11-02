import { RefObject, useEffect, useMemo, useState } from 'react';

export const useMainFieldSize = (elementRef: RefObject<Element>) => {
  const [elementSize, setElementSize] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (!elementRef || !elementRef.current) return;

    const listener = () => {
      if (!elementRef || !elementRef.current) return;

      const { height, width } = elementRef.current.getBoundingClientRect();

      setElementSize({ height, width });
    };

    elementRef.current.addEventListener('input', listener);

    return () => elementRef.current?.removeEventListener('input', listener);
  }, [elementRef]);

  return useMemo(() => elementSize, [elementSize]);
};
