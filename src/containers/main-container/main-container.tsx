import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn.ts';

export default function MainContainer({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('mx-auto w-full max-w-screen-2xl px-6', className)}
      {...props}
    >
      {children}
    </section>
  );
}
