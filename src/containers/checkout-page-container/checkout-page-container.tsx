'use client';

import { Fragment, useState } from 'react';

import { Card, Divider, Icon, RadioGroup, Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useBoolean, useIsomorphicLayoutEffect } from 'usehooks-ts';

import { LoadCheckoutPageContainer } from '@/containers/checkout-page-container/load-checkout-page-container.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { orderApi } from '@/shared/api/order.ts';
import { DELIVERY_PERSON_TYPES } from '@/shared/constants/delivery-person-types.ts';
import { DELIVERY_TYPES } from '@/shared/constants/delivery-types.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { MASKS } from '@/shared/constants/masks.ts';
import { ORGANIZATIONS_TYPES } from '@/shared/constants/organizations-types.ts';
import { REGEXP } from '@/shared/constants/regex.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { OrderCreateProps } from '@/shared/types/api/orders.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';
import { Button } from '@/shared/ui/button/button.tsx';
import { FieldRow } from '@/shared/ui/field-row/field-row.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Select } from '@/shared/ui/select/select.tsx';
import { Textarea } from '@/shared/ui/textarea/textarea.tsx';
import { Uploader } from '@/shared/ui/uploader/uploader.tsx';
import { apiErrorParse } from '@/shared/utils/api-error-parse.ts';
import { cn } from '@/shared/utils/cn.ts';
import { vld } from '@/shared/utils/form-validator.ts';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';
import { maskito } from '@/shared/utils/maskito.ts';

export enum DeliveryTypes {
  company = 'company',
  self = 'self',
}

export enum ClientTypes {
  organization = 'organization',
  person = 'person',
}

export enum DeliverCity {
  kazan = 'kazan',
  moscow = 'moscow',
}

let timeout: NodeJS.Timeout;

export const CheckoutPageContainer = () => {
  const methods = useForm<OrderCreateProps>({
    defaultValues: {
      email: 'tester@mail.ru',
      full_name: 'Тестов Тест',
      phone: '+7 (999) 999-99-99',
    },
  });

  const cartApi = useCart();
  const router = useRouter();

  const [currentDeliveryType, setCurrentDeliveryType] = useState(
    DeliveryTypes.self,
  );

  const [currentClientType, setCurrentClientType] = useState(
    ClientTypes.person,
  );

  const [currentDeliverCity, setCurrentDeliverCity] = useState(
    DeliverCity.kazan,
  );

  const totalSum = cartApi.getTotalSum();
  const totalSelectedItems = cartApi.getTotalSelectedItems();

  const mutation = useMutation({
    mutationFn: orderApi.create,
    onError: () => {
      router.push(LINKS.successOrderCompletion);
      cartApi.reset();
    },
    onSuccess: async ({ errors }) => {
      if (errors) {
        return apiErrorParse(errors, { setError: methods.setError });
      }

      router.push(LINKS.successOrderCompletion);
    },
  });

  const citiesDescriptions = {
    [DeliverCity.kazan]:
      '420111, Республика Татарстан, г. Казань, ул. Московская, дом 25, офис 212 Бизнес Центр "Булгар-офис"',
    [DeliverCity.moscow]:
      'г.Москва, ул.Скаковая, дом 36, офис 205 Бизнес Центр "Скаковая 36"',
  };

  const onSubmit = ({ ...submitData }: OrderCreateProps) => {
    submitData.phone = maskito.remain(submitData.phone);

    if (Array.isArray(submitData.organizational_form)) {
      submitData.organizational_form = submitData.organizational_form[0];
    }

    if (currentDeliveryType === DeliveryTypes.self) {
      submitData.city = citiesDescriptions[currentDeliverCity];
    }

    const selectedItems = cartApi.selectedCartItems;

    const { product_ids, product_quantities } = selectedItems.reduce(
      (
        acc: {
          product_ids: number[];
          product_quantities: number[];
        },
        { item, count },
      ) => {
        acc.product_ids.push(item.id);
        acc.product_quantities.push(count);

        return acc;
      },
      {
        product_ids: [],
        product_quantities: [],
      },
    );

    submitData.product_ids = product_ids;
    submitData.product_quantities = product_quantities;
    submitData.delivery_method = currentDeliveryType;

    // const formData = formDataParse(submitData, {
    //   files,
    // });

    mutation.mutate(submitData as unknown as FormData);
  };

  const loadingControl = useBoolean(true);

  useIsomorphicLayoutEffect(() => {
    timeout = setTimeout(() => {
      if (!cartApi.getLength()) {
        router.push(LINKS.home);

        return;
      }

      loadingControl.setFalse();
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [cartApi, router]);

  if (loadingControl.value) {
    return <LoadCheckoutPageContainer />;
  }

  return (
    <FormProvider {...methods}>
      <MainContainer className='py-6'>
        <Breadcrumbs />

        <div className='mt-6 grid gap-6 lg:grid-cols-[1fr_33%] lg:gap-10'>
          <div className='flex flex-col'>
            <Text variant='header-1'>Оформление заказа</Text>

            <Card className='mt-8' size='l' view='filled'>
              <div className='mb-8 flex-wrap flex-between max-md:mb-6 max-md:gap-2'>
                <Text variant='subheader-2'>Ваши данные</Text>

                <RadioGroup
                  options={DELIVERY_PERSON_TYPES}
                  value={currentClientType}
                  onUpdate={(v) => setCurrentClientType(v as ClientTypes)}
                />
              </div>

              <div className='flex flex-col gap-4'>
                {currentClientType === ClientTypes.organization && (
                  <Fragment>
                    <FieldRow isRequired title='Организационная форма'>
                      <Select
                        className='!md:max-w-[75%] w-full'
                        filterable={false}
                        name='organizational_form'
                        options={ORGANIZATIONS_TYPES}
                        placeholder='Выберите организационную форму'
                        rules={vld().required('Организационная форма')}
                        size='l'
                      />
                    </FieldRow>

                    <FieldRow isRequired title='Организация'>
                      <Input
                        className='w-full md:max-w-[75%]'
                        name='organization'
                        placeholder='Лучшая организация'
                        rules={vld().required('Организация')}
                        size='l'
                      />
                    </FieldRow>

                    <FieldRow isRequired title='ИНН'>
                      <Input
                        className='w-full md:max-w-[75%]'
                        mask={MASKS.inn}
                        name='inn'
                        placeholder='99999999999'
                        size='l'
                        rules={vld()
                          .required('ИНН')
                          .minLength(MASKS.inn.length, 'Не корректный ИНН')}
                      />
                    </FieldRow>
                  </Fragment>
                )}

                <FieldRow isRequired title='ФИО'>
                  <Input
                    className='w-full md:max-w-[75%]'
                    name='full_name'
                    placeholder='Иванов Иван Иванович'
                    rules={vld().required('ФИО')}
                    size='l'
                  />
                </FieldRow>

                <FieldRow isRequired title='Телефон'>
                  <Input
                    className='w-full md:max-w-[75%]'
                    mask={MASKS.phone}
                    name='phone'
                    placeholder='+7 (999) 999-99-99'
                    size='l'
                    rules={vld()
                      .required('Телефон')
                      .minLength(MASKS.phone.length, 'Не корректный телефон')}
                  />
                </FieldRow>

                <FieldRow title='Эл. почта'>
                  <Input
                    className='w-full md:max-w-[75%]'
                    name='email'
                    placeholder='ivanov@example.com'
                    rules={vld().pattern(REGEXP.email)}
                    size='l'
                  />
                </FieldRow>

                {currentDeliveryType === DeliveryTypes.company && (
                  <FieldRow isRequired title='Город / Населенный пункт'>
                    <Input
                      className='w-full md:max-w-[75%]'
                      name='city'
                      placeholder='Индекс, область, населенный пункт, улица, дом, квартира'
                      rules={vld().required('Город / Населенный пункт')}
                      size='l'
                    />
                  </FieldRow>
                )}

                <FieldRow title='Коммантарий к заказу'>
                  <Textarea
                    className='w-full md:max-w-[75%]'
                    name='comment'
                    placeholder='Введите комментарий к заказу'
                  />
                </FieldRow>

                <FieldRow title='Файлы'>
                  <div className='flex w-full justify-start md:max-w-[75%]'>
                    <Uploader
                      name='files'
                      uploadButtonProps={{
                        children: 'Выберите необходимые файлы',
                      }}
                    />
                  </div>
                </FieldRow>
              </div>
            </Card>
          </div>

          <div className='h-fit lg:sticky lg:top-32'>
            <Text variant='subheader-3'>
              Способы доставки <span className='text-danger'>*</span>
            </Text>

            <Card className='mt-8 max-lg:mt-6' size='l' view='filled'>
              <div className='grid gap-4 md:grid-cols-2'>
                {DELIVERY_TYPES.map(({ icon, content, value }) => (
                  <button
                    key={value}
                    className={cn(
                      'flex w-full items-start rounded-xl bg-[var(--g-color-private-brand-50-solid)] p-4 ring-1 transition-all duration-300 hover:ring-[var(--g-color-private-brand-350-solid)] max-2xl:gap-2 max-md:items-center md:flex-col',
                      {
                        'ring-[var(--g-color-private-brand-350-solid)]':
                          currentDeliveryType === value,
                        'ring-transparent': currentDeliveryType !== value,
                      },
                    )}
                    onClick={() =>
                      setCurrentDeliveryType(value as DeliveryTypes)
                    }
                  >
                    <Icon className='text-primary' data={icon} size={22} />

                    <Text className='text-start'>{content}</Text>
                  </button>
                ))}
              </div>

              {currentDeliveryType === DeliveryTypes.self && (
                <div className='mt-4 flex flex-col gap-4'>
                  <button
                    className='block rounded-2xl p-2.5 transition-all duration-300 flex-between hover:bg-zinc-100'
                    onClick={() => setCurrentDeliverCity(DeliverCity.kazan)}
                  >
                    <div className='flex flex-col items-start'>
                      <Text variant='subheader-1'>Центральный офис:</Text>

                      <Text
                        as='p'
                        className='mt-1.5 text-balance text-start'
                        color='secondary'
                      >
                        {citiesDescriptions[DeliverCity.kazan]}
                      </Text>
                    </div>

                    <div
                      className={cn(
                        'relative rounded-full border border-transparent bg-primary text-primary clamp-4 before:rounded-full before:bg-background before:transition-all before:duration-300 before:clamp-1 before:pos-abs before:[content:""]',
                        {
                          'before:clamp-1':
                            DeliverCity.kazan === currentDeliverCity,
                        },
                        {
                          'border-zinc-200 before:clamp-3.5':
                            DeliverCity.kazan !== currentDeliverCity,
                        },
                      )}
                    />
                  </button>

                  <button
                    className='block rounded-2xl p-2.5 transition-all duration-300 flex-between hover:bg-zinc-100'
                    onClick={() => setCurrentDeliverCity(DeliverCity.moscow)}
                  >
                    <div className='flex flex-col items-start'>
                      <Text variant='subheader-1'>Московский офис:</Text>

                      <Text
                        as='p'
                        className='mt-1.5 text-balance text-start'
                        color='secondary'
                      >
                        {citiesDescriptions[DeliverCity.moscow]}
                      </Text>
                    </div>

                    <div
                      className={cn(
                        'relative rounded-full border border-transparent bg-primary text-primary clamp-4 before:rounded-full before:bg-background before:transition-all before:duration-300 before:clamp-1 before:pos-abs before:[content:""]',
                        {
                          'before:clamp-1':
                            DeliverCity.moscow === currentDeliverCity,
                        },
                        {
                          'border-zinc-200 before:clamp-3.5':
                            DeliverCity.moscow !== currentDeliverCity,
                        },
                      )}
                    />
                  </button>
                </div>
              )}
            </Card>

            <Card className='mt-8' size='l' view='filled'>
              <div className='flex flex-col gap-4'>
                <div>
                  <Link
                    className='g-text g-text_variant_subheader-2 mb-8 block transition-all duration-300 hover:text-primary'
                    href={LINKS.cart()}
                  >
                    Ваша корзина
                  </Link>

                  <div className='flex-between'>
                    <span>Товары ({totalSelectedItems})</span>

                    <span className='font-bold'>{getFormatSum(totalSum)}</span>
                  </div>

                  <Divider className='mb-4 mt-2' />

                  <div className='flex-between'>
                    <span className='text-xl font-bold'>Итого</span>

                    <span className='text-success text-base font-bold'>
                      {getFormatSum(totalSum)}
                    </span>
                  </div>
                </div>
              </div>

              <Text
                as='p'
                className='mb-1.5 mt-6 max-lg:text-balance'
                color='secondary'
                variant='caption-2'
              >
                Перед оформлением заказа, пожалуйста, проверьте правильность
                всех данных.
              </Text>

              <Button
                isLoading={mutation.isPending}
                size='xl'
                width='max'
                onClick={methods.handleSubmit(onSubmit)}
              >
                Оформить
              </Button>
            </Card>
          </div>
        </div>
      </MainContainer>
    </FormProvider>
  );
};
