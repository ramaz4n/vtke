import { createEffect, createEvent, createStore, sample } from 'effector';

import { ProductProps } from '@/shared/types/api/products.ts';

export type CartStore = Record<
  number,
  {
    count: number;
    item: ProductProps;
  }
>;

class CartApi {
  toString(store: CartStore) {
    return JSON.stringify(store);
  }

  toStore(str: string): CartStore {
    return JSON.parse(str);
  }

  setter<T extends object>(payload: T) {
    const localStorage = window.localStorage;

    localStorage.setItem(
      'CART',
      this.toString(payload as unknown as CartStore),
    );
  }

  getStore() {
    const localStorage = window.localStorage;

    return this.toStore(localStorage.getItem('CART') || '{}');
  }

  reset() {
    const localStorage = window.localStorage;

    localStorage.removeItem('CART');
  }

  setItem(item: ProductProps) {
    if (localStorage.getItem('CART')) {
      const store = this.toStore(localStorage.getItem('CART') || '{}');

      this.setter({
        ...store,
        [item.id]: {
          count: 1,
          item,
        },
      });

      return;
    }

    this.setter({ [item.id]: { count: 1, item } });
  }
}

export const resetCart = createEvent();
export const setCartItem = createEvent<ProductProps>();

export const $cart = createStore<CartStore>(new CartApi().getStore())
  .on(resetCart, () => ({}))
  .on(setCartItem, (store, payload) => {
    const { id } = payload;

    return {
      ...store,
      [id]: {
        count: 1,
        item: payload,
      },
    };
  });

const setCartItemFx = createEffect((item: ProductProps) => {
  new CartApi().setItem(item);
});

sample({
  source: setCartItem,
  target: setCartItemFx,
});

const resetCartFx = createEffect(() => {
  new CartApi().reset();
});

sample({
  source: resetCart,
  target: resetCartFx,
});

sample({
  source: setCartItem,
  target: setCartItemFx,
});
