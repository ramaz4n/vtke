import { Text } from '@gravity-ui/uikit';
import type { Metadata } from 'next';

import MainContainer from '@/containers/main-container/main-container.tsx';

export const metadata: Metadata = {
  description: '404',
  title: '404',
};

export default function Page() {
  return (
    <MainContainer className='flex-col gap-6 py-8 flex-center'>
      <Text as='h1' variant='header-2'>
        Ошибка 404
      </Text>
      <Text as='p'>Страница, которую вы искали, не существует</Text>
    </MainContainer>
  );
}
