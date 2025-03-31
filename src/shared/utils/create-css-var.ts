import type { CSSProperties } from 'react';

export const createCssVar = (name: string, value: unknown): CSSProperties =>
  (value && {
    [`--${name}`]: typeof value === 'string' ? value : `${value}px`,
  }) as unknown as CSSProperties;
