import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { apiRequest } from '../../../api/api-request.ts';
import { Rbac, RbacKeys, RbacValueKey } from '../../../types/api/rbac.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export type Grants = [RbacKeys] | [RbacKeys, RbacValueKey];

export const useRbac = () => {
  const rbacQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => apiRequest({ url: '/rbac' }),
    queryKey: [QueryKeys.rbac],
  });

  return { rbacData: rbacQuery.data?.data as Rbac, ...rbacQuery };
};

export const usePermission = (grants?: Grants) => {
  const { rbacData } = useRbac();

  if (!grants || !grants.length) return true;

  if (grants.length === 1) {
    return rbacData?.[grants[0]];
  }

  return rbacData?.[grants[0]][grants[1]];
};
