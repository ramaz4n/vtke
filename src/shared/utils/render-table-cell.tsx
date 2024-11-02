import { TableActionsProps } from '../../components/actions/actions.tsx';
import { AnyObjectType } from '../types/global.ts';
import { TableColumnsProps } from '../types/table/table.ts';

export interface RenderTableCellProps extends TableActionsProps {
  columnKey: string;
  columns: TableColumnsProps<AnyObjectType>[];
  id: number;
  item: AnyObjectType;
}

export const renderTableCell = ({
  item,
  columnKey,
  columns,
  id,
}: RenderTableCellProps) => {
  if (!columns.length) return;
  let currentColumn = null;
  let currentIndex;

  for (const [i, column] of columns.entries()) {
    if (column.key === columnKey) {
      currentColumn = column;
      currentIndex = i;
      break;
    }
  }

  if (currentColumn && currentColumn?.render) {
    return currentColumn.render({
      id,
      index: currentIndex,
      item,
    });
  }

  return item[columnKey];
};
