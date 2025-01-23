'use client';

import { Fragment } from 'react';

import { Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '@/containers/form/form.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { authApi } from '@/shared/api/auth.ts';
import { REGEXP } from '@/shared/constants/regex.ts';
import { login } from '@/shared/models/auth.ts';
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
        <title>Пользователь</title>
        <meta content='Форма авторизации пользователя' name='description' />
      </Head>
      <FormProvider {...methods}>
        <Form
          className='shadow-auth-shadow mx-auto mt-compact-menu-padding flex h-fit w-full max-w-2xl flex-col gap-y-3 rounded-3xl p-6'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {({ isValid }) => (
            <Fragment>
              <div className='flex justify-between'>
                <Text className='text-foreground-text mb-2' variant='display-1'>
                  Авторизация
                </Text>

                <Button
                  className='w-fit'
                  size='xl'
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Зарегистрироваться
                </Button>
              </div>

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
            </Fragment>
          )}
        </Form>
      </FormProvider>
    </MainContainer>
  );
}
