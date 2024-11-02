/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableFilterWithKey } from '../types/table/filter.ts';
import { TableColumnsProps } from '../types/table/table.ts';

export const tableFilterCollector = (
  columns: TableColumnsProps<any>[],
): TableFilterWithKey[] =>
  columns?.reduce((acc: TableFilterWithKey[], column) => {
    if (column.filter) {
      if (column?.filter?.key) {
        acc.push({ ...column.filter, key: column.filter.key });
      } else {
        acc.push({ ...column.filter, key: column.key });
      }
    }

    return acc;
  }, []);
