import { useCallback } from 'react';

import { useUnit } from 'effector-react';

import {
  $cart,
  CartModel,
  clearSelectedCartItems,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  resetCart,
  selectAllCartItems,
  setCartItem,
  toggleSelectedCartItems,
} from '@/shared/models/cart.ts';
import { ProductProps } from '@/shared/types/api/products.ts';

export const useCart = () => {
  const {
    cartStore,
    setCartItemFn,
    resetCartFn,
    selectAllCartItemsFn,
    clearSelectedItemsFn,
    removeCartItemFn,
    toggleSelectedCartItem,
    incrementCartItemFn,
    decrementCartItemFn,
  } = useUnit({
    cartStore: $cart,
    clearSelectedItemsFn: clearSelectedCartItems,
    decrementCartItemFn: decrementCartItem,
    incrementCartItemFn: incrementCartItem,
    removeCartItemFn: removeCartItem,
    resetCartFn: resetCart,
    selectAllCartItemsFn: selectAllCartItems,
    setCartItemFn: setCartItem,
    toggleSelectedCartItem: toggleSelectedCartItems,
  });

  const { arrayItems = [], selectedCartItems = [] } = Object.values(
    cartStore,
  ).reduce(
    (
      acc: {
        arrayItems: ProductProps[];
        selectedCartItems: CartModel[];
      },
      el,
    ) => {
      if (el.isActive) {
        acc?.selectedCartItems?.push(el);
      }

      arrayItems?.push(el.item);

      return acc;
    },
    {
      arrayItems: [],
      selectedCartItems: [],
    },
  );

  const isInCart = useCallback(
    (id: number) => Boolean(cartStore?.[id]),
    [cartStore],
  );

  const getTotalSum = useCallback(() => {
    const values = Object.values(cartStore);

    const selectedValues = values.filter((el) => el.isActive);

    return selectedValues.reduce((acc, { item, count }) => {
      acc += Number.isNaN(item.price) ? 0 : Number(item.price) * count;

      return acc;
    }, 0);
  }, [cartStore]);

  const getTotalSelectedItems = useCallback(() => {
    const values = Object.values(cartStore);

    const selectedValues = values.filter((el) => el.isActive);

    return selectedValues.reduce((acc, { count }) => acc + count, 0);
  }, [cartStore]);

  const removeItem = useCallback(removeCartItemFn, [removeCartItemFn]);

  const getLength = useCallback(
    () =>
      Object.values(cartStore ?? {}).reduce(
        (acc, item) => acc + (item?.count ?? 0),
        0,
      ),
    [cartStore],
  );

  const removeOutCartSelected = () => {
    const selectedCartItems = Object.values(cartStore).filter(
      ({ isActive }) => isActive,
    );

    for (const { item } of selectedCartItems) {
      removeCartItemFn(item.id);
    }
  };

  const isAllSelected = Object.values(cartStore).every(
    ({ isActive }) => isActive,
  );

  return {
    cartStore,
    clearSelectedItems: clearSelectedItemsFn,
    decrementCartItem: decrementCartItemFn,
    getLength,
    getTotalSelectedItems,
    getTotalSum,
    incrementCartItem: incrementCartItemFn,
    initSelectedItems: selectAllCartItemsFn,
    isAllSelected,
    isInCart,
    remove: removeItem,
    removeOutCartSelected,
    reset: resetCartFn,
    selectedCartItems,
    setCartItem: setCartItemFn,
    toggleSelectedCartItem,
  };
};
