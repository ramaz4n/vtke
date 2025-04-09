'use client';

import { Fragment, useState } from 'react';

import { ArrowLeft } from '@gravity-ui/icons';
import { Card, Divider, Icon, RadioGroup, Text } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

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

  const onSubmit = ({ files, ...submitData }: OrderCreateProps) => {
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

    console.log(submitData);

    // const formData = formDataParse(submitData, {
    //   files,
    // });

    // mutation.mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      <MainContainer className='py-6'>
        <Breadcrumbs />

        <div className='mt-6 grid grid-cols-[1fr_33%] gap-10'>
          <div className='flex flex-col'>
            <Text variant='header-1'>Оформление заказа</Text>

            <Card className='mt-8' size='l' view='filled'>
              <div className='flex-between'>
                <Text className='mb-8 block' variant='subheader-2'>
                  Ваши данные
                </Text>

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
                        className='w-full !max-w-[75%]'
                        filterable={false}
                        name='organization_form'
                        options={ORGANIZATIONS_TYPES}
                        placeholder='Выберите организационную форму'
                        rules={vld().required('Организационная форма')}
                        size='l'
                      />
                    </FieldRow>

                    <FieldRow isRequired title='Организация'>
                      <Input
                        className='w-full max-w-[75%]'
                        name='organization'
                        placeholder='Лучшая организация'
                        rules={vld().required('Организация')}
                        size='l'
                      />
                    </FieldRow>

                    <FieldRow isRequired title='ИНН'>
                      <Input
                        className='w-full max-w-[75%]'
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
                    className='w-full max-w-[75%]'
                    name='full_name'
                    placeholder='Иванов Иван Иванович'
                    rules={vld().required('ФИО')}
                    size='l'
                  />
                </FieldRow>

                <FieldRow isRequired title='Телефон'>
                  <Input
                    className='w-full max-w-[75%]'
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
                    className='w-full max-w-[75%]'
                    name='email'
                    placeholder='ivanov@example.com'
                    rules={vld().pattern(REGEXP.email)}
                    size='l'
                  />
                </FieldRow>

                {currentDeliveryType === DeliveryTypes.company && (
                  <FieldRow isRequired title='Город / Населенный пункт'>
                    <Input
                      className='w-full max-w-[75%]'
                      name='city'
                      placeholder='Москва'
                      rules={vld().required('Город / Населенный пункт')}
                      size='l'
                    />
                  </FieldRow>
                )}

                <FieldRow title='Коммантарий к заказу'>
                  <Textarea
                    className='w-full max-w-[75%]'
                    name='comment'
                    placeholder='Индекс, область, населенный пункт, улица, дом, квартира'
                  />
                </FieldRow>

                <FieldRow title='Файлы'>
                  <div className='flex w-full max-w-[75%] justify-start'>
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

            <Link href={LINKS.products()}>
              <Button
                className='group mt-6 w-fit after:!bg-white'
                size='l'
                view='normal'
              >
                <Icon
                  className='transition-all duration-300 group-hover:-translate-x-0.5'
                  data={ArrowLeft}
                />
                К покупкам
              </Button>
            </Link>
          </div>

          <div className='sticky top-32 h-fit'>
            <Text variant='subheader-3'>
              Способы доставки <span className='text-danger'>*</span>
            </Text>

            <Card className='mt-8' size='l' view='filled'>
              <div className='gap-4 flex-between'>
                {DELIVERY_TYPES.map(({ icon, content, value }) => (
                  <button
                    key={value}
                    className={cn(
                      'flex w-full flex-col items-start rounded-xl bg-[var(--g-color-private-brand-50-solid)] p-4 ring-1 transition-all duration-300 hover:ring-[var(--g-color-private-brand-350-solid)]',
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
                    <Icon className='text-primary' data={icon} />

                    <Text>{content}</Text>
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
                        420111, Республика Татарстан, г. Казань, ул. Московская,
                        дом 25, офис 212 Бизнес Центр "Булгар-офис"
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
                        г.Москва, ул.Скаковая, дом 36, офис 205 Бизнес Центр
                        "Скаковая 36"
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
                  <Text className='mb-8 block' variant='subheader-2'>
                    Ваша корзина
                  </Text>

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
                className='mb-1.5 mt-6'
                color='secondary'
                variant='caption-2'
              >
                Перед оформлением заказа, пожалуйста, проверьте правильность
                всех данных.
              </Text>

              <Button
                className=''
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
