import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchWiki } from '../../../api/wiki.ts';
import { FetchPaginationRequest } from '../../../types/global.ts';

interface UseArticleListProps {
  params: FetchPaginationRequest<{ sectionId: number }>;
  queryKey: string;
}

export const useArticlesList = ({ params, queryKey }: UseArticleListProps) => {
  const articlesListQuery = useQuery({
    enabled: !!params?.sectionId,
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchWiki.article.list({
        ...params,
      }),
    queryKey: [queryKey, params],
  });

  return {
    articleList: articlesListQuery.data?.data?.models,
    isLoading: articlesListQuery.isLoading,
  };
};
