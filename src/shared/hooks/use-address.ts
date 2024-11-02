import { useMemo, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';

import { dadataApi } from '../api/dadata.ts';
import { DEFAULT_DEBOUNCE_TIME } from '../constants/debounce.ts';
import { QueryKeys } from '../types/query-keys.ts';
import { CustomAutocompleteItem } from '../ui/form-elements/custom-autocomplete/custom-autocomplete.tsx';

interface Props {
  defaultQuery?: string;
}

export const useAddress = (props: Props = {}) => {
  const [query, setQuery] = useState(props?.defaultQuery ?? '');
  const queries = useQuery({
    enabled: !!query,
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => dadataApi.address(query, signal),
    queryKey: [QueryKeys.dadataAddress, query],
  });

  const onSearch = debounce((q: string) => {
    setQuery(q);
  }, DEFAULT_DEBOUNCE_TIME);

  const autoCompleteItems: CustomAutocompleteItem[] = useMemo(
    () =>
      (queries.data || [])?.map(({ value }) => ({
        id: value as unknown as number,
        name: value,
      })),
    [queries.data],
  );

  const emptyContent = useMemo(() => {
    if (!query.length) {
      return 'Начните искать адрес';
    }
    if (!autoCompleteItems?.length) {
      return 'Адреса не найдены';
    }
  }, [autoCompleteItems]);

  return { ...queries, autoCompleteItems, emptyContent, onSearch };
};
