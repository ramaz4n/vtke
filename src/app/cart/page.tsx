import { EffectorNext } from '@effector/next';
import { fork, serialize } from 'effector';
import type { Metadata } from 'next';

import { CartPageContainer } from '@/containers/cart-page-container/cart-page-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';

export const metadata: Metadata = {
  description:
    'Готовы оформить заказ? Проверьте товары в корзине перед оформлением заказа. Быстрая доставка и удобная оплата в ООО "ВНЕШНЕТОРГОВАЯ КОМПАНИЯ "ПРОМТЕХ"',
  keywords:
    'Корзина, корзина, корзина товаров, интернет магазин, купить товар, купить на сайте, купить товар на сайте, купить товар в интернет магазине, купить товар в интернет магазине, купить товар в интернет магазине, купить товар в интернет магаз',
  title: 'Корзина',
};

export default async function Page() {
  const scope = fork({
    values: [
      [
        $breadcrumbs,
        [{ href: LINKS.products(), text: 'Каталог' }, { text: 'Корзина' }],
      ],
    ],
  });

  const serialized = serialize(scope);

  return (
    <EffectorNext values={serialized}>
      <CartPageContainer />
    </EffectorNext>
  );
}
