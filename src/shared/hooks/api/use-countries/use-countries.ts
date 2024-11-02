import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';

import { clientStaleTime } from '../../../../main.tsx';
import { fetchDictionary } from '../../../api/dictionary.ts';
import { DEFAULT_DEBOUNCE_TIME } from '../../../constants/debounce.ts';
import { CountriesList } from '../../../types/api/dictionary.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export const useCountries = (params?: CountriesList['params']) => {
  const [queryString, setQueryString] = useState('');
  const defaultQueries = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchDictionary.countriesList({ name: queryString, ...params }),
    queryKey: [QueryKeys.dictionaryCountry, queryString, params],
    staleTime: clientStaleTime,
  });

  const onSearch = debounce((q: string) => {
    setQueryString(q);
  }, DEFAULT_DEBOUNCE_TIME);

  const onSearchWithoutDebounce = (q: string) => {
    setQueryString(q);
  };

  return { ...defaultQueries, onSearch, onSearchWithoutDebounce };
};
