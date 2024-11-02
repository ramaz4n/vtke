import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchUser } from '../../../api/user.ts';
import { NewsEventsList } from '../../../types/api/news-events.ts';
import { UseFetchListProps } from '../../../types/global.ts';

export const useUsersList = ({
  params,
  queryKey,
}: UseFetchListProps<NewsEventsList['request']>) => {
  const usersListQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => fetchUser.list({ ...params }),
    queryKey: [queryKey, params],
  });

  return {
    isLoading: usersListQuery.isLoading,
    lastPage: usersListQuery.data?.data?.lastPage,
    usersList: usersListQuery.data?.data?.models,
  };
};
