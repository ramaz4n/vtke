import { useState } from 'react';

import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { debounce } from 'lodash-es';

import { fetchDictionary } from '../../../api/dictionary.ts';
import { DEFAULT_DEBOUNCE_TIME } from '../../../constants/debounce.ts';
import { CitiesList } from '../../../types/api/dictionary.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export const useCities = (
  params?: CitiesList['params'],
  options?: Partial<UseQueryOptions>,
) => {
  const [queryString, setQueryString] = useState('');

  const defaultQueries = useQuery({
    enabled: options?.enabled,
    placeholderData: keepPreviousData,
    queryFn: () => fetchDictionary.citiesList({ ...params, name: queryString }),
    queryKey: [QueryKeys.dictionaryCity, params, queryString],
  });

  const onSearch = debounce((q: string) => {
    setQueryString(q);
  }, DEFAULT_DEBOUNCE_TIME);

  const onSearchWithoutDebounce = (q: string) => {
    setQueryString(q);
  };

  return { ...defaultQueries, onSearch, onSearchWithoutDebounce };
};
