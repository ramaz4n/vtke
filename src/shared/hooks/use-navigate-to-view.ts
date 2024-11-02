import { router } from '../../pages/router.tsx';
import { Grants, usePermission } from './api/use-rbac/use-rbac.ts';

export const useNavigateToView = (
  callback: (id: string) => string,
  grants: Grants,
) => {
  const permissions = usePermission(grants);

  if (!permissions) return;

  return async (id: string) => {
    await router.navigate(callback(id));
  };
};
