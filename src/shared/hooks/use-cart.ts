import { useCallback } from 'react';

import { useUnit } from 'effector-react';

import {
  $cart,
  $selectedCartItems,
  clearSelectedCartItems,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  resetCart,
  selectAllCartItems,
  setCartItem,
  toggleSelectedCartItems,
} from '@/shared/models/cart.ts';

export const useCart = () => {
  const {
    cartStore,
    setCartItemFn,
    resetCartFn,
    selectedCartItems,
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
    selectedCartItems: $selectedCartItems,
    setCartItemFn: setCartItem,
    toggleSelectedCartItem: toggleSelectedCartItems,
  });

  console.log(selectedCartItems, 'selectedCartItems');

  const arrayItems = Object.values(cartStore).map((el) => el.item);

  const isInCart = useCallback(
    (id: number) => Boolean(cartStore?.[id]),
    [cartStore],
  );

  const getTotalSum = useCallback(() => {
    const values = Object.values(cartStore);

    const ids = new Set(selectedCartItems.map((el) => el.id));

    const selectedValues = values.filter((el) => ids.has(el.item.id));

    return selectedValues.reduce((acc, { item, count }) => {
      acc += Number.isNaN(item.price) ? 0 : Number(item.price) * count;

      return acc;
    }, 0);
  }, [cartStore, selectedCartItems]);

  const getTotalSelectedItems = useCallback(() => {
    const values = Object.values(cartStore);

    const ids = new Set(selectedCartItems.map((el) => el.id));

    const selectedValues = values.filter((el) => ids.has(el.item.id));

    return selectedValues.reduce((acc, { count }) => acc + count, 0);
  }, [cartStore, selectedCartItems]);

  const removeItem = useCallback(removeCartItemFn, [removeCartItemFn]);

  const getLength = useCallback(
    () =>
      Object.values(cartStore ?? {}).reduce(
        (acc, item) => acc + (item?.count ?? 0),
        0,
      ),
    [cartStore],
  );

  const initSelectedItems = () => {
    selectAllCartItemsFn(arrayItems);
  };

  const removeOutCartSelected = () => {
    for (const { id } of selectedCartItems) {
      removeCartItemFn(id);
    }
  };

  const isAllSelected = arrayItems.length === selectedCartItems.length;

  return {
    cartStore,
    clearSelectedItems: clearSelectedItemsFn,
    decrementCartItem: decrementCartItemFn,
    getLength,
    getTotalSelectedItems,
    getTotalSum,
    incrementCartItem: incrementCartItemFn,
    initSelectedItems,
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
