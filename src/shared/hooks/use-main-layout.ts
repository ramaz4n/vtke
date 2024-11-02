import { useRbac } from './api/use-rbac/use-rbac.ts';

export const useMainLayout = () => {
  const rbacQuery = useRbac();

  return {
    isQueriesLoading: [rbacQuery.isLoading].every(Boolean),
  };
};
