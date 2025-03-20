import { Skeleton } from '@gravity-ui/uikit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUnit } from 'effector-react';

import { CategoryItem } from '@/components/category-item/category-item.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { useProductCategories } from '@/shared/hooks/api/use-product-categories.ts';
import { $drawer } from '@/shared/models/drawer.ts';
import { hideAllModalEvent } from '@/shared/models/modal.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Drawer } from '@/shared/ui/drawer/drawer.tsx';
import { modalHasName } from '@/shared/utils/modal-has-name.ts';

export const CatalogDrawer = () => {
  const store = useUnit($drawer);
  const isVisible = modalHasName(store, 'catalog');

  const { models, isLoading } = useProductCategories({ limit: 50 }, isVisible);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productsApi.list,
    onSuccess: (response) => {
      queryClient.setQueryData([QueryKeys.PRODUCTS_VIEW, null], response);
      onClose();
    },
  });

  const onCategoryClick = (id: number) => {
    mutation.mutate({ category: id });
  };

  const onClose = () => {
    hideAllModalEvent();
  };

  const Content = () => {
    if (isLoading) {
      return Array.from({ length: 25 }).map((_, index) => (
        <Skeleton key={index.toString()} className='h-14 w-full rounded-2xl' />
      ));
    }

    return models.map((category) => (
      <CategoryItem
        key={category.id}
        onClick={() => onCategoryClick(category.id)}
        {...category}
      />
    ));
  };

  return (
    <Drawer name='catalog' shouldScrollBody={!isLoading}>
      <div className='sm-gap-3 flex flex-col items-start justify-start gap-1 px-1 py-12 lg:gap-4 lg:px-5'>
        <Content />
      </div>
    </Drawer>
  );
};
