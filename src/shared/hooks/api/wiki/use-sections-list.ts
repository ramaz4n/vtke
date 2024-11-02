import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchWiki, SectionListRequestProps } from '../../../api/wiki.ts';
import { FetchPaginationRequest } from '../../../types/global.ts';

interface UseSectionsListProps
  extends FetchPaginationRequest<SectionListRequestProps> {
  queryKey: string;
}

export const useSectionsList = ({
  categoryId,
  sectionId,
  queryKey,
  limit,
  page,
  sort,
}: UseSectionsListProps) => {
  const sectionListQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchWiki.section.list({ categoryId, limit, page, sectionId, sort }),
    queryKey: [queryKey, categoryId, sectionId, limit, page, sort],
  });

  return {
    isLoading: sectionListQuery.isLoading,
    refetchSectionList: sectionListQuery.refetch,
    sectionList: sectionListQuery.data?.data?.models,
  };
};
