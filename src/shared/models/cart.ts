import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { ProductProps } from '@/shared/types/api/products.ts';

export type CartModel = {
  count: number;
  isActive: boolean;
  item: ProductProps;
};

export type CartStore = Record<number, CartModel>;

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
          isActive: true,
          item,
        },
      });

      return;
    }

    this.setter({ [item.id]: { count: 1, isActive: true, item } });
  }

  removeItem(id: number) {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    delete store[id];

    this.setter({ ...store });
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

  clearSelectedCartItems() {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    this.setter(
      Object.fromEntries(
        Object.entries(store).map(([id, model]) => [
          id,
          { ...model, isActive: false },
        ]),
      ),
    );
  }

  selectAllCartItems() {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    this.setter(
      Object.fromEntries(
        Object.entries(store).map(([id, model]) => [
          id,
          { ...model, isActive: true },
        ]),
      ),
    );
  }

  toggleSelectedCartItems(payload: number) {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    this.setter(
      Object.fromEntries(
        Object.entries(store).map(([id, model]) => {
          if (id === payload.toString()) {
            return [id, { ...model, isActive: !model.isActive }];
          }

          return [id, model];
        }),
      ),
    );
  }

  removeSelectedCartItems(payload: number) {
    const store = this.toStore(localStorage.getItem('CART') || '{}');

    this.setter(
      Object.fromEntries(
        Object.entries(store).map(([id, model]) => {
          if (id === payload.toString()) {
            return [id, { ...model, isActive: false }];
          }

          return [id, model];
        }),
      ),
    );
  }
}

export const resetCart = createEvent();
export const setCartItem = createEvent<ProductProps>();
export const removeCartItem = createEvent<number>();
export const incrementCartItem = createEvent<number>();
export const decrementCartItem = createEvent<number>();
export const clearSelectedCartItems = createEvent();
export const selectAllCartItems = createEvent();
export const toggleSelectedCartItems = createEvent<number>();
export const removeSelectedCartItems = createEvent<number>();

export const $cart = createStore<CartStore>(new CartApi().getStore())
  .on(resetCart, () => ({}))
  .on(removeCartItem, (state, payload) => {
    delete state[payload];

    return { ...state };
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
        isActive: true,
        item: payload,
      },
    };
  })
  .on(clearSelectedCartItems, (store) =>
    Object.fromEntries(
      Object.entries(store).map(([id, model]) => [
        id,
        { ...model, isActive: false },
      ]),
    ),
  )
  .on(selectAllCartItems, (store) =>
    Object.fromEntries(
      Object.entries(store).map(([id, model]) => [
        id,
        { ...model, isActive: true },
      ]),
    ),
  )
  .on(toggleSelectedCartItems, (store, payload) =>
    Object.fromEntries(
      Object.entries(store).map(([id, model]) => {
        if (id === payload.toString()) {
          return [id, { ...model, isActive: !model.isActive }];
        }

        return [id, model];
      }),
    ),
  )
  .on(removeSelectedCartItems, (store, payload) =>
    Object.fromEntries(
      Object.entries(store).map(([id, model]) => {
        if (id === payload.toString()) {
          return [id, { ...model, isActive: false }];
        }

        return [id, model];
      }),
    ),
  );

const setCartItemFx = createEffect((item: ProductProps) => {
  new CartApi().setItem(item);

  toaster.add({
    isClosable: false,
    name: 'set-to-cart-item',
    theme: 'success',
    title: `${item.name} успешно добавлен в корзину.`,
  });
});

sample({
  source: setCartItem,
  target: setCartItemFx,
});

const resetCartFx = createEffect(() => {
  new CartApi().reset();
});

const removeCartItemFx = createEffect((id: number) => {
  new CartApi().removeItem(id);
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

//SAMPLES

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

sample({
  source: clearSelectedCartItems,
  target: createEffect(() => new CartApi().clearSelectedCartItems()),
});

sample({
  source: selectAllCartItems,
  target: createEffect(() => new CartApi().selectAllCartItems()),
});

sample({
  source: toggleSelectedCartItems,
  target: createEffect((id: number) =>
    new CartApi().toggleSelectedCartItems(id),
  ),
});

sample({
  source: removeSelectedCartItems,
  target: createEffect((id: number) =>
    new CartApi().removeSelectedCartItems(id),
  ),
});
