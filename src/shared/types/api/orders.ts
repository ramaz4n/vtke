import { ProductProps } from '@/shared/types/api/products.ts';
import { UserProps } from '@/shared/types/api/user.ts';

export interface OrderCreateProps
  extends Omit<OrderProps, 'products' | 'user'> {
  files: File[];
  product_ids: number[];
  product_quantities: number[];
  user_id: string;
}

export interface OrderProps {
  city: string;
  comment: string;
  delivery_cost: string;
  delivery_method: string;
  email: string;
  file_path: string | null;
  full_name: string;
  id: number;
  inn: string;
  organization: string;
  organizational_form: string;
  phone: string;
  products: ProductProps[];
  total_cost: string;
  user: UserProps;
}
