import { useQuery } from '@tanstack/react-query';

import { fetchWiki } from '../../../api/wiki.ts';

interface UseArticleView {
  queryKey: string;
  id?: string;
}

export const useArticleView = ({ id, queryKey }: UseArticleView) => {
  const articleViewQuery = useQuery({
    enabled: !!id,
    queryFn: () => fetchWiki.article.view(id),
    queryKey: [queryKey, id],
    staleTime: 0,
  });

  return {
    articleView: articleViewQuery.data?.data,
    isLoading: articleViewQuery.isLoading,
    refetchArticleView: articleViewQuery.refetch,
  };
};
