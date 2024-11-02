import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchInstitution } from '../../../api/institution.ts';
import { UseFetchViewProps } from '../../../types/global.ts';

export const useInstitutionView = ({ id, queryKey }: UseFetchViewProps) => {
  const institutionViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchInstitution.view(id),
    queryKey: [queryKey, id],
    staleTime: 0,
  });

  return {
    institutionView: institutionViewQuery.data?.data,
    isLoading: institutionViewQuery.isLoading,
  };
};
