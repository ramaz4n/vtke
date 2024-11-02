import { useQuery } from '@tanstack/react-query';

import { fetchWiki } from '../../../api/wiki.ts';

interface UseCategoryViewProps {
  queryKey: string;
  id?: string;
}

export const useCategoryView = ({ id, queryKey }: UseCategoryViewProps) => {
  const categoryViewQuery = useQuery({
    enabled: !!id,
    queryFn: () => fetchWiki.category.view(id),
    queryKey: [queryKey, id],
  });

  return {
    categoryView: categoryViewQuery.data?.data,
    ...categoryViewQuery,
  };
};
