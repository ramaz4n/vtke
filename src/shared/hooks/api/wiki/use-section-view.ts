import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchWiki } from '../../../api/wiki.ts';

interface UseSectionsViewProps {
  queryKey: string;
  id?: string;
}

export const useSectionsView = ({ id, queryKey }: UseSectionsViewProps) => {
  const sectionViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchWiki.section.view(id),
    queryKey: [queryKey, id],
  });

  return {
    isLoading: sectionViewQuery.isLoading,
    sectionView: sectionViewQuery.data?.data,
  };
};
