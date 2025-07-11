'use client';

import { Fragment } from 'react';

import { Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { authApi } from '@/shared/api/auth.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { REGEXP } from '@/shared/constants/regex.ts';
import { AuthLoginProps } from '@/shared/types/api/auth.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { vld } from '@/shared/utils/form-validator.ts';

export default function Page() {
  const methods = useForm<AuthLoginProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      // if (res.status === 406) {
      //   return apiErrorParse(res.data, { setError: methods.setError });
      // }

      if (res.access_token) {
        router.replace(LINKS.profile);
      }
      console.log(res);
    },
  });

  const onSubmit = (data: AuthLoginProps) => mutation.mutate(data);

  return (
    <MainContainer>
      <Head>
        <title>Пользователь</title>
        <meta content='Форма авторизации пользователя' name='description' />
      </Head>
      <FormProvider {...methods}>
        <div className='flex size-full items-center justify-center py-8'>
          <Form
            className='mx-auto flex h-fit w-full max-w-2xl flex-col gap-y-3 rounded-3xl p-6 shadow-auth-shadow'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {({ isValid }) => (
              <Fragment>
                <Text className='text-foreground-text mb-2' variant='display-1'>
                  Авторизация
                </Text>

                <Input
                  autoComplete='email'
                  name='email'
                  placeholder='Почта'
                  rules={vld().required('Почта').pattern(REGEXP.email)}
                  size='xl'
                  type='email'
                />

                <Input
                  name='password'
                  placeholder='Пароль'
                  rules={vld().required('Пароль').minLength(6)}
                  size='xl'
                  type='password'
                />

                <Button
                  className='h-8 w-full'
                  disabled={!isValid}
                  isLoading={mutation.isPending}
                  size='xl'
                  type='submit'
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Войти
                </Button>

                <div className='mt-10 flex-wrap gap-3 flex-between'>
                  <span>
                    Если вы впервые на сайте, нажмите зарегистрироваться.
                  </span>

                  <Link className='' href={LINKS.register}>
                    <Button size='xl'>Зарегистрироваться</Button>
                  </Link>
                </div>
              </Fragment>
            )}
          </Form>
        </div>
      </FormProvider>
    </MainContainer>
  );
}
