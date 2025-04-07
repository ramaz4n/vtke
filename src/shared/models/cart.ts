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

  removeItem(id: number) {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    delete store[id];

    this.setter(store);
  }

  incrementCartItem(id: number) {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    const current = store[id];

    if (!current) return;

    this.setter({ ...store, [id]: { ...current, count: current.count + 1 } });
  }

  decrementCartItem(id: number) {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    const current = store[id];

    if (!current) return;

    this.setter({ ...store, [id]: { ...current, count: current.count - 1 } });
  }
}

export const clearSelectedCartItems = createEvent();
export const toggleSelectedCartItems = createEvent<ProductProps>();
export const removeSelectedCartItems = createEvent<number>();
export const selectAllCartItems = createEvent<ProductProps[]>();

export const $selectedCartItems = createStore<ProductProps[]>([])
  .on(selectAllCartItems, (_, payload) => payload)
  .on(removeSelectedCartItems, (store, payload) =>
    store.filter(({ id }) => id !== payload),
  )
  .on(toggleSelectedCartItems, (store, payload) => {
    const ids = new Set(store.map(({ id }) => id));

    if (ids.has(payload.id)) {
      return store.filter(({ id }) => id !== payload.id);
    }

    return [...store, payload];
  })
  .on(clearSelectedCartItems, () => []);

export const resetCart = createEvent();
export const setCartItem = createEvent<ProductProps>();
export const removeCartItem = createEvent<number>();
export const incrementCartItem = createEvent<number>();
export const decrementCartItem = createEvent<number>();

export const $cart = createStore<CartStore>(new CartApi().getStore())
  .on(resetCart, () => ({}))
  .on(removeCartItem, (state, payload) => {
    delete state[payload];

    return state;
  })
  .on(incrementCartItem, (state, payload) => {
    const current = state[payload];

    return { ...state, [payload]: { ...current, count: current.count + 1 } };
  })
  .on(decrementCartItem, (state, payload) => {
    const current = state[payload];

    return { ...state, [payload]: { ...current, count: current.count - 1 } };
  })
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
  clearSelectedCartItems();
});

const removeCartItemFx = createEffect((id: number) => {
  new CartApi().removeItem(id);
  removeSelectedCartItems(id);
});

const incrementCartItemFx = createEffect((id: number) => {
  new CartApi().incrementCartItem(id);
});

sample({
  source: incrementCartItem,
  target: incrementCartItemFx,
});

const decrementCartItemFx = createEffect((id: number) => {
  new CartApi().decrementCartItem(id);
});

sample({
  source: decrementCartItem,
  target: decrementCartItemFx,
});

sample({
  source: resetCart,
  target: resetCartFx,
});

sample({
  source: removeCartItem,
  target: removeCartItemFx,
});

sample({
  source: setCartItem,
  target: setCartItemFx,
});
