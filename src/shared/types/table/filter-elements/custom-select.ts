import { SelectProps } from '@nextui-org/react';

export interface SelectItemProps {
  label: string;
  value: string;
}

export interface SelectElementProps
  extends Omit<SelectProps, 'items' | 'children'> {
  items: SelectItemProps[];
}
