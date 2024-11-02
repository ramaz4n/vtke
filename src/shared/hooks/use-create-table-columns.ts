import { RbacKeys, RbacValueKey } from '../types/api/rbac.ts';
import { useRbac } from './api/use-rbac/use-rbac.ts';

export const useCreateTableColumns = ({
  grants,
  isOptional = true,
}: {
  grants: Record<Partial<RbacKeys>, RbacValueKey[]>;
  isOptional?: boolean;
}): boolean => {
  const { rbacData } = useRbac();
  const resArr = [];

  if (!rbacData) return false;
  if (!Object.keys(grants).length) return false;

  for (const key in rbacData) {
    if (!grants[key]) continue;

    for (const grantsKey of grants[key]) {
      resArr.push(rbacData[key][grantsKey]);
    }
  }

  return isOptional ? resArr.includes(true) : resArr.every(Boolean);
};
