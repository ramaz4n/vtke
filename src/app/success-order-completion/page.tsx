'use client';
import { Check, Circles4Square } from '@gravity-ui/icons';
import { Icon, Text } from '@gravity-ui/uikit';
import Head from 'next/head';
import Link from 'next/link';

import { Confetti } from '@/components/confetti/confetti.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links';
import { Button } from '@/shared/ui/button/button';

export default function Page() {
  return (
    <MainContainer>
      <Head>
        <title>Успешная оплата</title>
        <meta content='Ура, оплата заказа прошла успешно!' name='description' />
      </Head>

      <Confetti />

      <section className='relative mt-4 flex-col flex-center lg:mt-10'>
        <div className='rounded-full bg-background p-4.5 flex-center'>
          <Icon className='size-16 text-primary' data={Check} />
        </div>

        <Text as='h1' className='mt-4' variant='header-2'>
          Успешная оплата
        </Text>

        <p className='mb-10 mt-2.5 text-sm font-medium'>
          Ура, оплата заказа прошла успешно!
        </p>

        <Link href={LINKS.products()}>
          <Button size='xl'>
            <Icon data={Circles4Square} />
            Заказать еще
          </Button>
        </Link>
      </section>
    </MainContainer>
  );
}
