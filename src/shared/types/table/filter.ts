import { DatePickerProps } from '@nextui-org/react';

import { CustomAutocompleteProps } from '../../ui/form-elements/custom-autocomplete/custom-autocomplete.tsx';
import { CustomInputProps } from '../../ui/form-elements/custom-input/custom-input.tsx';
import { SelectElementProps } from './filter-elements/custom-select.ts';

export type FiltersTypes =
  | 'input'
  | 'datepicker'
  | 'select'
  | 'autocomplete'
  | 'date-range-picker';

export interface TableFilterProps {
  title: string;
  type: FiltersTypes;
  key?: string;
  props?: Partial<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | CustomInputProps<any>
    | SelectElementProps
    | DatePickerProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | CustomAutocompleteProps<any>
  >;
}

export type TableFilterWithKey = Omit<TableFilterProps, 'key'> &
  Required<Pick<TableFilterProps, 'key'>>;
