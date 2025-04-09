import { EffectorNext } from '@effector/next';
import { fork, serialize } from 'effector';
import { Metadata } from 'next';

import { CheckoutPageContainer } from '@/containers/checkout-page-container/checkout-page-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';

export const metadata: Metadata = {
  description: 'Оформление заказа и доставка товара по России',
  keywords:
    'Оформление заказа, купить товар, оформить заказ, заказать товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар, купить товар',
  title: 'Оформление заказа',
};

export default function Page() {
  const scope = fork({
    values: [
      [
        $breadcrumbs,
        [
          { href: LINKS.products(), text: 'Каталог' },
          { href: LINKS.cart(), text: 'Корзина' },
          { text: 'Оформление заказа' },
        ],
      ],
    ],
  });

  const serialized = serialize(scope);

  return (
    <EffectorNext values={serialized}>
      <CheckoutPageContainer />
    </EffectorNext>
  );
}
