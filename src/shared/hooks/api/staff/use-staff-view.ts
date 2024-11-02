import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchStaff } from '../../../api/staff.ts';
import { UseFetchViewProps } from '../../../types/global.ts';

export const useStaffView = ({ id, queryKey }: UseFetchViewProps) => {
  const staffViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchStaff.view(id),
    queryKey: [queryKey, id],
  });

  return {
    isLoading: staffViewQuery.isLoading,
    staffView: staffViewQuery.data?.data,
  };
};
