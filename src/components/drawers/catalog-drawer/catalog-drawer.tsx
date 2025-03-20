import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStoreMap } from 'effector-react';

import { CategoryItem } from '@/components/category-item/category-item.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { useProductCategories } from '@/shared/hooks/api/use-product-categories.ts';
import { $modal, hideAllModalEvent } from '@/shared/models/modal.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Drawer } from '@/shared/ui/drawer/drawer.tsx';
import { modalHasName } from '@/shared/utils/modal-has-name.ts';

export const CatalogDrawer = () => {
  const isVisible = useStoreMap($modal, (store) =>
    modalHasName(store, 'catalog'),
  );
  const { models, isLoading } = useProductCategories();

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

  return (
    <Drawer name='catalog'>
      <div className='sm-gap-3 flex flex-col items-start justify-start gap-1 px-1 py-16 lg:gap-4 lg:px-5'>
        {!isLoading &&
          models.map((category) => (
            <CategoryItem
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              {...category}
            />
          ))}
      </div>
    </Drawer>
  );
};
