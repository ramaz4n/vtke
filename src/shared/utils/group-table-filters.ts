import { AnyObjectType } from '../types/global.ts';
import { TableFilterWithKey } from '../types/table/filter.ts';

export const groupTableFilters = (
  filters: TableFilterWithKey[],
  activeFiltersObject: AnyObjectType,
) => {
  const activeFilters: TableFilterWithKey[] = [];
  const inactiveFilters = [];

  for (const filter of filters) {
    if (
      activeFiltersObject &&
      Object.keys(activeFiltersObject).includes(filter.key)
    ) {
      activeFilters.push(filter);
    } else {
      inactiveFilters.push(filter);
    }
  }

  const activeFiltersList = activeFilters.map((filter) => filter.key);

  return { activeFilters, activeFiltersList, inactiveFilters };
};
