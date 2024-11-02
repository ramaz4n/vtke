import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchNewsEvents, NewsEventsList } from '../../../api/news-events.ts';
import { UseFetchListProps } from '../../../types/global.ts';

export const useNewsEventsList = ({
  params,
  queryKey,
}: UseFetchListProps<NewsEventsList['request']>) => {
  const newsEventsListQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchNewsEvents.list({
        ...params,
      }),
    queryKey: [queryKey, params],
  });

  return {
    isLoading: newsEventsListQuery.isLoading,
    newsEventsList: newsEventsListQuery.data?.data?.models,
    refetchNewsEventsList: newsEventsListQuery.refetch,
  };
};
