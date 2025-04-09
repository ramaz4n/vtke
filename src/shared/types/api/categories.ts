import { PaginationRequest } from '@/shared/types/globals.ts';

export interface CategoryCreateProps {
  name: string;
}

export type CategoryUpdateProps = CategoryCreateProps;

export interface CategoryProps {
  id: number;
  name: string;
  created_at?: number;
  updated_at?: number;
}

export type CategoryRequestProps = PaginationRequest<{
  id?: number;
}>;

export interface CategoryItemProps extends CategoryProps {
  onClick: () => void;
}
