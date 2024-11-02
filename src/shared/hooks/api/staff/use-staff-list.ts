import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchStaff } from '../../../api/staff.ts';
import { PromoCodesList } from '../../../types/api/promo-code.ts';
import { StaffList } from '../../../types/api/staffProps.ts';
import { QueryKeys } from '../../../types/query-keys.ts';
import { parseQueryParamsForApi } from '../../../utils/table-default-query-params.ts';
import { useGetParams } from '../../use-get-params.ts';

export const useStaffList = (params?: PromoCodesList['params']) => {
  const { paramsEntries } = useGetParams<StaffList['params']>();

  const staffQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchStaff.list({
        ...params,
        ...parseQueryParamsForApi<StaffList['params']>(paramsEntries),
      }),
    queryKey: [QueryKeys.staff, params, paramsEntries],
  });

  return {
    staffList: staffQuery.data?.data.models,
    ...staffQuery,
  };
};
