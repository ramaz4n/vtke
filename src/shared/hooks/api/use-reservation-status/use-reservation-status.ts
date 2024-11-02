import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchDictionary } from '../../../api/dictionary.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export const useReservationStatus = () => {
  const defaultQueries = useQuery({
    placeholderData: keepPreviousData,
    queryFn: fetchDictionary.reservationStatus,
    queryKey: [QueryKeys.dictionaryReservationStatus],
  });

  return { statusList: defaultQueries.data?.data };
};
