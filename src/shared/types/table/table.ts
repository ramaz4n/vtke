import { ReactNode } from 'react';

import { TableFilterProps } from './filter.ts';

interface RenderCellProps<T> {
  id?: number;
  index?: number;
  item?: T;
}

export interface TableColumnsProps<T> {
  key: string;
  title: string;
  filter?: TableFilterProps;
  isAction?: boolean;
  render?: ({ id, index, item }: RenderCellProps<T>) => ReactNode;
  sortKey?: string;
  sortable?: boolean;
}
