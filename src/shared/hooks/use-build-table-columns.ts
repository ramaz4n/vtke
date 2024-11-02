import { RbacKeys, RbacValueKey } from '../types/api/rbac.ts';
import { AnyObjectType } from '../types/global.ts';
import { TableColumnsProps } from '../types/table/table.ts';
import { useCreateTableColumns } from './use-create-table-columns.ts';

interface Props {
  columns: TableColumnsProps<AnyObjectType>[];
  grants: Record<Partial<RbacKeys>, RbacValueKey[]>;
}

export const useBuildTableColumns = ({ columns, grants }: Props) => {
  const condition = useCreateTableColumns({ grants });

  if (!condition) {
    return columns.filter((c) => !c.isAction);
  }

  return columns;
};
