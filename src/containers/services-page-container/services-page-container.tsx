'use client';
import { Text } from '@gravity-ui/uikit';

import { ServiceItem } from '@/components/service-item/service-item.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { useService } from '@/shared/hooks/api/use-service.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const ServicesPageContainer = () => {
  const { groupByCategory } = useService();

  return (
    <MainContainer className='py-6'>
      <Breadcrumbs />

      {Object.entries(groupByCategory).map(
        ([categoryId, { category, services }]) => (
          <section key={categoryId} className='mt-8 space-y-8'>
            <Text as='h3' className='mb-4' variant='header-2'>
              {category.name}
            </Text>

            <div className='relative grid w-full grid-cols-2 pb-16 max-md:gap-y-4 md:gap-x-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6'>
              {services?.map((model) => (
                <ServiceItem key={model.id} {...model} />
              ))}
            </div>
          </section>
        ),
      )}
    </MainContainer>
  );
};
