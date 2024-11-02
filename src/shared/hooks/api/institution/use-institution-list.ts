import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchInstitution } from '../../../api/institution.ts';
import {
  Institution,
  InstitutionList,
} from '../../../types/api/institution.ts';
import { UseFetchListProps } from '../../../types/global.ts';

const formatBySelect = (list: Institution[]) => {
  if (!list?.length) return [];

  return list.map(({ id, name }) => ({ id, name }));
};

export const useInstitutionList = ({
  params,
  queryKey,
  enabled,
}: UseFetchListProps<InstitutionList['request']>) => {
  const institutionQuery = useQuery({
    enabled,
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchInstitution.list({
        ...params,
      }),
    queryKey: [queryKey, params],
  });

  return {
    institutionList: institutionQuery.data?.data?.models,
    institutionsSelect: formatBySelect(institutionQuery.data?.data?.models),
    isLoading: institutionQuery.isLoading,
  };
};
