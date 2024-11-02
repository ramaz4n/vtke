import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchInstitution } from '../../../api/institution.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export const useInstitution = () => {
  const { id } = useParams();
  const institutionQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => fetchInstitution.view(id),
    queryKey: [QueryKeys.institution, id],
  });

  return {
    id,
    institution: institutionQuery.data?.data,
    ...institutionQuery,
  };
};
