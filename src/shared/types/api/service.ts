import { CategoryProps } from '@/shared/types/api/categories.ts';

export interface ServiceProps {
  category: CategoryProps;
  description: string;
  id: number;
  image: string;
  name: string;
  price: string;
}

export interface CreateServiceProps {
  category_id: string | string[];
  description: string;
  name: string;
  price: string;
}

export interface ServiceRequestProps {
  name?: string;
}
