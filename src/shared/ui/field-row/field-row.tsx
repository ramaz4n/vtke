import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn.ts';

interface FieldRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  isRequired?: boolean;
}

export const FieldRow = ({
  children,
  isRequired = false,
  title,
  className,
  ...props
}: FieldRowProps) => (
  <div
    className={cn('flex items-center justify-between gap-4', className)}
    {...props}
  >
    <span className='font-semibold'>
      {title}
      {isRequired && <span className='text-danger'>*</span>}
    </span>

    {children}
  </div>
);
