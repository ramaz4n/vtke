import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchTags } from '../../../api/tags.ts';
import { TagList } from '../../../types/api/tags.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

interface Props {
  params?: TagList['request'];
}

export const useTags = ({ params }: Props = {}) => {
  const query = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => fetchTags.list(params),
    queryKey: [QueryKeys.tags, params],
  });

  return {
    tagsList: query.data?.data?.models || [],
    ...query,
  };
};
