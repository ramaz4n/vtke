import { Check } from '@gravity-ui/icons';
import { Icon, Text } from '@gravity-ui/uikit';
import type { Metadata } from 'next';
import Link from 'next/link';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links';
import { Button } from '@/shared/ui/button/button';

export const metadata: Metadata = {
  description: 'Ура, оплата заказа прошла успешно!',
  title: 'Успешная оплата',
};

export default function Page() {
  return (
    <MainContainer>
      <section className='relative mt-4 flex-col flex-center lg:mt-10'>
        <div className='bg-default-100 rounded-full p-4.5 flex-center'>
          <Icon className='size-16 text-primary' data={Check} />
        </div>

        <Text as='h1' className='mt-4' variant='header-2'>
          Успешная оплата
        </Text>

        <p className='mb-10 mt-2.5 text-sm font-medium'>
          Ура, оплата заказа прошла успешно!
        </p>

        <Link href={LINKS.products()}>
          <Button>Перейти в каталог</Button>
        </Link>
      </section>
    </MainContainer>
  );
}
