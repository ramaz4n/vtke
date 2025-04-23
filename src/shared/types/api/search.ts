export interface SearchCoreProps {
  description: string;
  id: number;
  title: string;
  type: 'product' | 'news';
}

export enum SearchType {
  news = 'news',
  product = 'product',
  service = 'service',
}

export enum SearchTypeRu {
  news = 'Новости',
  product = 'Товары',
  service = 'Услуги',
}
