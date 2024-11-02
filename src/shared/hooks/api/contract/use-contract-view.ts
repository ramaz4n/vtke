import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchContract } from '../../../api/contract.ts';
import { UseFetchViewProps } from '../../../types/global.ts';

export const useContractView = ({ id, queryKey }: UseFetchViewProps) => {
  const contractViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchContract.view(id),
    queryKey: [queryKey, id],
  });

  return {
    contractView: contractViewQuery.data?.data,
    isLoading: contractViewQuery.isLoading,
    ...contractViewQuery,
  };
};
