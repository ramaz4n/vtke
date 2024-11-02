import { keepPreviousData, useQueries } from '@tanstack/react-query';

import { queryClient } from '../../main.tsx';
import { fetchDictionary, KeyValue } from '../api/dictionary.ts';
import { ApiResponse } from '../types/global.ts';
import { CustomAutocompleteItem } from '../ui/form-elements/custom-autocomplete/custom-autocomplete.tsx';

export const useDictionary = (requests: Array<'account-system'>) => {
  const queries = useQueries({
    queries: [
      {
        enabled: new Set(requests).has('account-system'),
        placeholderData: keepPreviousData,
        queryFn: () => fetchDictionary.accountSystem(),
        queryKey: ['account-system'],
      },
    ],
  });

  const accountSystems =
    ((
      queryClient.getQueryData(['account-system']) as ApiResponse<KeyValue[]>
    )?.data.map((el) => ({
      id: el.key,
      name: el.value,
    })) as CustomAutocompleteItem[]) || [];

  return {
    accountSystems: accountSystems,
    accountSystemsObject: Object.fromEntries(
      accountSystems.map((el) => [el.id, el.name]),
    ),
    ...queries,
  };
};
