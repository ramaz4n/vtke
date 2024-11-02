import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchContract } from '../../../api/contract.ts';
import { ContractList } from '../../../types/api/contract.ts';
import { UseFetchListProps } from '../../../types/global.ts';

export const useContractList = ({
  params,
  queryKey,
}: UseFetchListProps<ContractList['request']>) => {
  const contractQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchContract.list({
        ...params,
      }),
    queryKey: [queryKey, params],
  });

  return {
    contractList: contractQuery.data?.data?.models,
    formatted: (contractQuery.data?.data?.models || []).map((e) => ({
      id: e.id,
      name: e.nameOrganization || `Договор №${e.id}`,
    })),
    isLoading: contractQuery.isLoading,
  };
};
