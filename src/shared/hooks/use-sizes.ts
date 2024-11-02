import { useEffect, useState } from 'react';

import { useDebounceCallback } from 'usehooks-ts';

export interface Sizes {
  isFixedSidebar: boolean;
  isMobile: boolean;
}

export const useSizes = () => {
  const [sizes, setSizes] = useState<Sizes>({
    isFixedSidebar: window.innerWidth >= 1024,
    isMobile: window.innerWidth <= 767,
  });

  const handleResize = useDebounceCallback(() => {
    setSizes({
      isFixedSidebar: window.innerWidth >= 1024,
      isMobile: window.innerWidth <= 767,
    });
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return sizes;
};
