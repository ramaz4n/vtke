import { AnyObjectType } from '../global.ts';

export type TableFilter = Record<string, AnyObjectType>;

export interface UpdateTableFilterProps {
  filter: AnyObjectType;
  tableName: string;
}

export interface EditTableFilterProps {
  filterName: string;
  tableName: string;
}
