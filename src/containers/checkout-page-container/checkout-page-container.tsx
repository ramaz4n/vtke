'use client';

import { Fragment, useState } from 'react';

import { Card, Divider, Icon, RadioGroup, Text } from '@gravity-ui/uikit';
import { FormProvider, useForm } from 'react-hook-form';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { MASKS } from '@/shared/constants/masks.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';
import { Button } from '@/shared/ui/button/button.tsx';
import { LocationAlt } from '@/shared/ui/icons/location-alt.tsx';
import { TrackSide } from '@/shared/ui/icons/track-side.tsx';
import { Input } from '@/shared/ui/input/input.tsx';
import { Select } from '@/shared/ui/select/select.tsx';
import { Textarea } from '@/shared/ui/textarea/textarea.tsx';
import { Uploader } from '@/shared/ui/uploader/uploader.tsx';
import { cn } from '@/shared/utils/cn.ts';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

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
  const methods = useForm({
    defaultValues: {},
  });

  const cartApi = useCart();

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

  const personTypes = [
    {
      content: 'Физ.лицо',
      value: 'person',
    },
    {
      content: 'Юр.лицо',
      value: 'organization',
    },
  ];

  const deliveryTypes = [
    {
      content: 'Самовывоз',
      icon: LocationAlt,
      value: 'self',
    },
    {
      content: 'Транспортная компания',
      icon: TrackSide,
      value: 'company',
    },
  ];

  const organizations = [
    { children: 'ООО', value: '1' },
    { children: 'ИП', value: '2' },
    { children: 'ОАО', value: '3' },
    { children: 'ЗАО', value: '4' },
    { children: 'НП', value: '5' },
    { children: 'ТОО', value: '6' },
    { children: 'АО', value: '7' },
    { children: 'ЧН', value: '8' },
  ];

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
                  options={personTypes}
                  value={currentClientType}
                  onUpdate={(v) => {
                    console.log(v);
                    setCurrentClientType(v as ClientTypes);
                  }}
                />
              </div>

              <div className='flex flex-col gap-4'>
                {currentClientType === ClientTypes.organization && (
                  <Fragment>
                    <div className='flex items-center justify-between gap-4'>
                      <span className='font-semibold'>
                        Организационная форма
                        <span className='text-danger'>*</span>
                      </span>

                      <Select
                        className='w-full !max-w-[75%]'
                        filterable={false}
                        name='organization_form'
                        options={organizations}
                        placeholder='Выберите организационную форму'
                        size='l'
                      />
                    </div>

                    <div className='flex items-center justify-between gap-4'>
                      <span className='font-semibold'>
                        Организация<span className='text-danger'>*</span>
                      </span>

                      <Input
                        className='w-full max-w-[75%]'
                        name='full_name'
                        placeholder='Лучшая организация'
                        size='l'
                      />
                    </div>

                    <div className='flex items-center justify-between gap-4'>
                      <span className='font-semibold'>
                        ИНН<span className='text-danger'>*</span>
                      </span>

                      <Input
                        className='w-full max-w-[75%]'
                        mask={MASKS.inn}
                        name='full_name'
                        placeholder='99999999999'
                        size='l'
                      />
                    </div>
                  </Fragment>
                )}

                <div className='flex items-center justify-between gap-4'>
                  <span className='font-semibold'>
                    ФИО<span className='text-danger'>*</span>
                  </span>

                  <Input
                    className='w-full max-w-[75%]'
                    name='full_name'
                    placeholder='Иванов Иван Иванович'
                    size='l'
                  />
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <span className='font-semibold'>
                    Телефон<span className='text-danger'>*</span>
                  </span>

                  <Input
                    className='w-full max-w-[75%]'
                    mask={MASKS.phone}
                    name='phone'
                    placeholder='+7 (999) 999-99-99'
                    size='l'
                  />
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <span className='font-semibold'>Эл. почта</span>

                  <Input
                    className='w-full max-w-[75%]'
                    name='email'
                    placeholder='ivanov@example.com'
                    size='l'
                  />
                </div>

                {currentDeliveryType === DeliveryTypes.company && (
                  <div className='flex items-center justify-between gap-4'>
                    <span className='font-semibold'>
                      Город / Населенный пункт
                    </span>

                    <Input
                      className='w-full max-w-[75%]'
                      name='city'
                      placeholder='Москва'
                      size='l'
                    />
                  </div>
                )}

                <div className='flex items-start justify-between gap-4'>
                  <span className='font-semibold'>Коммантарий к заказу</span>

                  <Textarea
                    className='w-full max-w-[75%]'
                    name='comment'
                    placeholder='Введите комментарий'
                  />
                </div>

                <div className='flex items-start justify-between gap-4'>
                  <span className='font-semibold'>Файлы</span>

                  <div className='flex w-full max-w-[75%] justify-start'>
                    <Uploader
                      name='files'
                      uploadButtonProps={{
                        children: 'Выберите необходимые файлы',
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className='sticky top-32 h-fit'>
            <Text variant='subheader-3'>
              Способы доставки <span className='text-danger'>*</span>
            </Text>

            <Card className='mt-8' size='l' view='filled'>
              <div className='flex items-center gap-4'>
                {deliveryTypes.map(({ icon, content, value }) => (
                  <button
                    key={value}
                    className={cn(
                      'flex w-full max-w-48 flex-col items-start rounded-xl bg-[var(--g-color-private-brand-50-solid)] p-4 ring-1 transition-all duration-300 hover:ring-[var(--g-color-private-brand-350-solid)]',
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

              <Button className='mt-6' size='xl' width='max'>
                Оформить
              </Button>
            </Card>
          </div>
        </div>
      </MainContainer>
    </FormProvider>
  );
};
