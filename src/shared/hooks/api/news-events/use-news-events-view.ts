import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchNewsEvents } from '../../../api/news-events.ts';
import { UseFetchViewProps } from '../../../types/global.ts';

export const useNewsEventsView = ({ id, queryKey }: UseFetchViewProps) => {
  const newsEventsViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchNewsEvents.view(id),
    queryKey: [queryKey, id],
  });

  return {
    isLoading: newsEventsViewQuery.isLoading,
    newsEventsView: newsEventsViewQuery.data?.data,
    ...newsEventsViewQuery,
  };
};
