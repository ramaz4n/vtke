import { CategoryProps } from '@/shared/types/api/categories.ts';
import { PaginationRequest } from '@/shared/types/globals.ts';

export interface ProductImage {
  createdAt: Date;
  id: number;
  name: string;
  path: string;
}

export interface ProductProps {
  article: string;
  categories: Pick<CategoryProps, 'name' | 'id'>[];
  created_at: number;
  description: string;
  features: string;
  id: number;
  images: ProductImage[];
  name: string;
  price: string;
  status: number;
  updated_at: number;
}

export type ProductRequestProps = PaginationRequest<{
  category: number;
  id: number;
}>;

export interface ProductItemProps {
  description: string;
  firm: string;
  id: number;
  imageSrc: string;
  key: number;
  name: string;
  price: string;
  createdAt?: string;
  updatedAt?: string;
}
