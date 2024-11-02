import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchWiki } from '../../../api/wiki.ts';
import { Article } from '../../../types/api/wiki.ts';
import { UseFetchListProps } from '../../../types/global.ts';

export const useCategoryList = ({
  params,
  queryKey,
}: UseFetchListProps<Article>) => {
  const categoriesListQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchWiki.category.list({
        ...params,
      }),
    queryKey: [queryKey, params],
  });

  return {
    categoryList: categoriesListQuery.data?.data?.models,
    isLoading: categoriesListQuery.isLoading,
    lastPage: categoriesListQuery.data?.data?.lastPage,
  };
};
