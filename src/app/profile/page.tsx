'use client';

import { Card, ClipboardButton, Text } from '@gravity-ui/uikit';
import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Head from 'next/head';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { authApi } from '@/shared/api/auth.ts';
import { userApi } from '@/shared/api/user.ts';
import { REGEXP } from '@/shared/constants/regex.ts';
import { login } from '@/shared/models/auth.ts';
import { AuthLoginProps } from '@/shared/types/api/auth.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { UserProfileResponseProps } from '@/shared/types/api/user.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { vld } from '@/shared/utils/form-validator.ts';

export default function Page() {
  const methods = useForm<AuthLoginProps>({
    defaultValues: {
      email: '',
    },
  });

  const query = useQuery(
    {
      queryFn: () => userApi.profile(),
      queryKey: [QueryKeys.PROFILE],
    },
    new QueryClient({
      queryCache: new QueryCache({
        onSuccess: (data) => {
          const { user } = data as UserProfileResponseProps;

          methods.setValue('email', user.email);
        },
      }),
    }),
  );

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      // if (status === 406) {
      //   return apiErrorParse(data, { setError: methods.setError });
      // }

      login(res);
    },
  });

  const onSubmit = (data: AuthLoginProps) => mutation.mutate(data);

  return (
    <MainContainer>
      <Head>
        <title>Профиль</title>
        <meta content='Мой профиль' name='description' />
      </Head>

      <section className='flex-wrap py-4 flex-between'>
        <Text variant='header-2'>Мой профиль</Text>

        <ClipboardButton size='l' text={query.data?.user?.id?.toString() ?? ''}>
          Мой ID: {query.data?.user.id}
        </ClipboardButton>
      </section>

      <div className='max-w-1/2 relative flex flex-col'>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            {({ isValid }) => (
              <Card className='flex flex-col gap-4 p-6' size='l' view='filled'>
                <div className='grid gap-8 lg:grid-cols-2'>
                  <Input
                    name='name'
                    placeholder='Имя'
                    rules={vld().required('Имя')}
                    size='l'
                  />

                  <Input
                    name='email'
                    placeholder='Почта'
                    rules={vld().required('Почта').pattern(REGEXP.email)}
                    size='l'
                  />
                </div>

                <Button
                  className='w-full max-w-64'
                  disabled={!isValid}
                  isLoading={mutation.isPending}
                  size='l'
                  type='submit'
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Сохранить
                </Button>
              </Card>
            )}
          </Form>
        </FormProvider>

        <Button
          className='my-6 max-w-64'
          size='l'
          view='outlined-danger'
          width='max'
          onClick={methods.handleSubmit(onSubmit)}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </MainContainer>
  );
}
