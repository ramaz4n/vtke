import { Card, Divider, Skeleton } from '@gravity-ui/uikit';

import MainContainer from '@/containers/main-container/main-container.tsx';

export const LoadCheckoutPageContainer = () => (
  <MainContainer className='py-6'>
    <div className='flex gap-4'>
      <Skeleton className='h-5 max-w-20' />
      <Skeleton className='h-5 max-w-20' />
      <Skeleton className='h-5 max-w-20' />
      <Skeleton className='h-5 max-w-28' />
    </div>

    <div className='mt-6 grid gap-6 lg:grid-cols-[1fr_33%] lg:gap-10'>
      <div className='flex flex-col gap-8'>
        <Skeleton className='h-6 max-w-40' />

        <Card size='l' view='filled'>
          <div className='flex flex-col'>
            <div className='mb-6 flex-between'>
              <Skeleton className='h-5 max-w-20' />

              <Skeleton className='h-5 max-w-40' />
            </div>

            <div className='flex flex-col gap-4'>
              <Skeleton className='h-9' />
              <Skeleton className='h-9' />
              <Skeleton className='h-9' />
              <Skeleton className='h-9' />
              <Skeleton className='h-9' />
              <Skeleton className='h-9' />
            </div>
          </div>
        </Card>
      </div>

      <div className='flex flex-col gap-8'>
        <Skeleton className='h-6 max-w-24' />

        <Card className='flex flex-col gap-4' size='l' view='filled'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Skeleton className='h-20 max-w-full' />

            <Skeleton className='h-20 max-w-full' />
          </div>

          <Skeleton className='h-14' />

          <Skeleton className='h-14' />
        </Card>

        <Card size='l' view='filled'>
          <div className='flex flex-col gap-4'>
            <div>
              <Skeleton className='mb-4 h-4 max-w-20' />

              <div className='flex-between'>
                <Skeleton className='h-4 max-w-12' />

                <Skeleton className='h-4 max-w-12' />
              </div>

              <Divider className='mb-4 mt-2' />

              <div className='flex-between'>
                <Skeleton className='h-6 max-w-12' />

                <Skeleton className='h-6 max-w-12' />
              </div>
            </div>
          </div>

          <Skeleton className='mb-2 mt-4 h-2.5' />

          <Skeleton className='h-12' />
        </Card>
      </div>
    </div>
  </MainContainer>
);
