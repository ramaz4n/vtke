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
    className={cn(
      'flex justify-between gap-4 max-md:flex-col max-md:gap-2 md:items-center',
      className,
    )}
    {...props}
  >
    <span className='font-semibold max-md:px-1.5'>
      {title}
      {isRequired && <span className='text-danger'>*</span>}
    </span>

    {children}
  </div>
);
