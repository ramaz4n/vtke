import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchGuest } from '../../../api/guest.ts';
import { UseFetchListProps } from '../../../types/global.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export const useGuestList = ({ params }: UseFetchListProps) => {
  const guestListQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchGuest.list({
        ...params,
      }),
    queryKey: [QueryKeys.guests, params],
  });

  return {
    guestList: guestListQuery.data?.data?.models || [],
    isLoading: guestListQuery.isLoading,
  };
};
