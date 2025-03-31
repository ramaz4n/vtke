import { EffectorNext } from '@effector/next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fork, serialize } from 'effector';
import type { Metadata } from 'next';

import { CartPageContainer } from '@/containers/cart-page-container/cart-page-container.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const metadata: Metadata = {
  description:
    'Готовы оформить заказ? Проверьте товары в корзине перед оформлением заказа. Быстрая доставка и удобная оплата в ООО "ВНЕШНЕТОРГОВАЯ КОМПАНИЯ "ПРОМТЕХ"',
  keywords:
    'Корзина, корзина, корзина товаров, интернет магазин, купить товар, купить на сайте, купить товар на сайте, купить товар в интернет магазине, купить товар в интернет магазине, купить товар в интернет магазине, купить товар в интернет магаз',
  title: 'Корзина',
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => productsApi.list(),
    queryKey: [QueryKeys.PRODUCTS_VIEW, null],
  });

  const scope = fork({
    values: [
      [
        $breadcrumbs,
        [{ href: LINKS.products(), text: 'Каталог' }, { text: 'Корзина' }],
      ],
    ],
  });

  const serialized = serialize(scope);
  const dehydratedState = dehydrate(queryClient);

  return (
    <EffectorNext values={serialized}>
      <HydrationBoundary state={dehydratedState}>
        <CartPageContainer />
      </HydrationBoundary>
    </EffectorNext>
  );
}
