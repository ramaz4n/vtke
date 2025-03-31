import { useCallback } from 'react';

import { useUnit } from 'effector-react';

import { $cart, resetCart, setCartItem } from '@/shared/models/cart.ts';

export const useCart = () => {
  const { cartStore, setCartItemFn, resetCartFn } = useUnit({
    cartStore: $cart,
    resetCartFn: resetCart,
    setCartItemFn: setCartItem,
  });

  const isInCart = useCallback(
    (id: number) => Boolean(cartStore?.[id]),
    [cartStore],
  );

  const getLength = useCallback(
    () =>
      Object.values(cartStore ?? {}).reduce(
        (acc, item) => acc + (item?.count ?? 0),
        0,
      ),
    [cartStore],
  );

  return {
    cartStore,
    getLength,
    isInCart,
    reset: resetCartFn,
    setCartItem: setCartItemFn,
  };
};
