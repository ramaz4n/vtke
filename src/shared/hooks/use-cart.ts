import { useCallback } from 'react';

import { useUnit } from 'effector-react';

import { $cart, setCartItem } from '@/shared/models/cart.ts';

export const useCart = () => {
  const { cartStore, setCartItemFn } = useUnit({
    cartStore: $cart,
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
    setCartItem: setCartItemFn,
  };
};
