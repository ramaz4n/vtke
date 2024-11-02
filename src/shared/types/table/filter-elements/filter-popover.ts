import type { DebouncedState } from 'usehooks-ts';

import { TableFilterWithKey } from '../filter.ts';
import { TableFilter } from '../table-model.ts';

export interface FilterPopoverProps {
  filter: TableFilterWithKey;
  onFilterRemove: (key: string) => void;
  tableFilters: TableFilter;
  tableName: string;
  onDatePickerBlur?: () => void;
  onDatePickerChange?: (name: string, value: string) => void;
  onInputChange?: DebouncedState<(key: string, value: string) => void>;
  onSelectChange?: (key: string, value: string) => void;
}
