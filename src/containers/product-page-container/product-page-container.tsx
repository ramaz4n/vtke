'use client';

import { Fragment, HTMLAttributes, MouseEvent, useRef, useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  ArrowShapeTurnUpRight,
  ChevronRight,
  Layers,
  Minus,
  NodesRight,
  Plus,
  Tag,
} from '@gravity-ui/icons';
import {
  Card,
  ClipboardButton,
  DefinitionList,
  DefinitionListItem,
  Icon,
  Popover,
  Text,
} from '@gravity-ui/uikit';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import { ProductProps } from '@/shared/types/api/products.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const ProductPage = () => {
  const { model, id } = useProduct();

  const listParams = { category: model?.categories?.[0].id };

  const allProducts = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => productsApi.list(listParams),
    queryKey: [QueryKeys.PRODUCTS_VIEW, listParams, id],
  });

  const article = model?.article?.replace('article-', '') ?? '';

  const mightLikeProducts =
    allProducts.data?.data.filter((el) => el.id !== model?.id) || [];

  const cartApi = useCart();

  const onCartAddHandler = (props: ProductProps) => cartApi.setCartItem(props);

  if (!model) return null;

  return (
    <MainContainer className='space-y-4 max-lg:max-w-full max-lg:space-y-0 max-lg:!px-0 lg:py-6 max-lg:[&>.g-breadcrumbs]:max-lg:hidden'>
      <Breadcrumbs />

      <section className='grid grid-cols-[1fr_1fr_372px] max-xl:grid-cols-2 max-lg:grid-cols-1 max-lg:gap-4'>
        <ImagesPreview {...model} />

        <div className='w-full max-xl:relative max-lg:rounded-2xl max-lg:bg-background max-lg:p-4 lg:pl-8'>
          <div className='flex flex-col'>
            <div className='mb-2 flex flex-wrap items-center gap-2.5'>
              <Link
                className='inline-flex items-center gap-1 rounded-md bg-zinc-200 px-2.5 py-0.5 transition-all duration-300 hover:bg-zinc-200/50'
                href={LINKS.products()}
              >
                {model.firm || 'FIRMA'}

                <Icon data={ChevronRight} size={14} />
              </Link>
            </div>

            <h1 className='mb-4 text-xl font-semibold'>{model.name}</h1>

            <DefinitionList responsive>
              <DefinitionListItem name='Артикул'>
                <ClipboardButton size='xs' text={article} view='flat'>
                  {article}
                </ClipboardButton>
              </DefinitionListItem>
            </DefinitionList>

            <Text as='h3' className='mt-4' variant='subheader-2'>
              Характеристики
            </Text>

            <span
              className='mt-2 block'
              dangerouslySetInnerHTML={{ __html: model.features }}
            />

            <Text as='h3' className='mt-4' variant='subheader-2'>
              Описание
            </Text>

            <span
              className='mt-2 block'
              dangerouslySetInnerHTML={{ __html: model.description }}
            />

            <div className='mt-4 flex gap-4 max-xl:flex-col max-lg:gap-2 xl:items-center'>
              <Link className='group flex gap-2' href={LINKS.products()}>
                <span className='rounded-md bg-zinc-200 text-secondary clamp-8 flex-center'>
                  <Icon data={Tag} />
                </span>

                <div className='flex flex-col group-hover:text-primary'>
                  <div className='flex gap-0.5'>
                    <span className='line-clamp-1 break-all font-medium transition-all duration-300'>
                      {model.categories.map((el) => el.name).join(', ')}
                    </span>

                    <span className='font-medium transition-all duration-300'>
                      {model.firm || 'FIRMA'}
                    </span>
                  </div>

                  <Text
                    className='flex items-center gap-0.5 transition-all duration-300'
                    color='secondary'
                    variant='caption-2'
                  >
                    В каталог фирмы <Icon data={ChevronRight} size={12} />
                  </Text>
                </div>
              </Link>

              <Link className='group flex gap-2' href={LINKS.products()}>
                <span className='rounded-md bg-zinc-200 text-secondary clamp-8 flex-center'>
                  <Icon data={Layers} />
                </span>

                <div className='flex flex-col group-hover:text-primary'>
                  <span className='line-clamp-1 break-all font-medium transition-all duration-300'>
                    {model.categories.map((el) => el.name).join(', ')}
                  </span>

                  <Text
                    className='flex items-center gap-0.5 transition-all duration-300'
                    color='secondary'
                    variant='caption-2'
                  >
                    Все товары в категории{' '}
                    <Icon data={ChevronRight} size={12} />
                  </Text>
                </div>
              </Link>
            </div>
          </div>

          <div className='mt-4 h-fit max-lg:mt-8 xl:hidden'>
            <FloatPanel {...model} />
          </div>
        </div>

        <div className='sticky top-28 h-fit pl-8 max-xl:hidden'>
          <FloatPanel {...model} />
        </div>
      </section>

      <section className='pt-6 max-lg:px-4'>
        <Text as='h3' className='mb-4' variant='header-2'>
          Вам может понравиться
        </Text>

        <div className='relative grid w-full grid-cols-2 pb-16 max-md:gap-y-4 md:gap-x-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6'>
          {mightLikeProducts?.map((model) => (
            <ProductItem
              key={model.id}
              isInCart={cartApi.isInCart(model.id)}
              onCartAdd={onCartAddHandler}
              {...model}
            />
          ))}
        </div>
      </section>
    </MainContainer>
  );
};

const FloatPanel = (model: ProductProps) => {
  const { price, id } = model;

  const cartApi = useCart();
  const router = useRouter();

  const cartCount = cartApi.cartStore?.[id]?.count || 0;

  const onBuyNow = () => {
    if (!cartApi.isInCart(id)) {
      cartApi.setCartItem(model);
    }
    cartApi.clearSelectedItems();
    cartApi.toggleSelectedCartItem(id);

    router.push(LINKS.checkout);
  };

  const onDecrement = () => {
    if (cartCount <= 1) {
      cartApi.removeItem(id);

      return;
    }

    cartApi.decrementCartItem(id);
  };

  return (
    <Card className='w-full max-lg:!p-0 lg:p-4' size='l' view='filled'>
      <div className='mb-4 flex-wrap gap-1.5 flex-between'>
        <h3 className='text-2.5xl font-bold'>{getFormatSum(price)}</h3>

        <ShareButton
          className='max-lg:hidden'
          iconProps={{ data: ArrowShapeTurnUpRight }}
        />
      </div>

      {cartApi.isInCart(id) ? (
        <div className='flex gap-4 max-xl:grid max-xl:grid-cols-2 xl:items-center'>
          <Link
            className='bg-success-glow h-12 flex-col rounded-lg px-6 text-white flex-center xl:w-fit'
            href={LINKS.cart()}
          >
            <span className='block whitespace-nowrap text-sm font-semibold'>
              В корзине
            </span>
            <span className='text-xs'>Перейти</span>
          </Link>

          <div className='flex w-full select-none items-center justify-between'>
            <Button size='xl' view='flat-action' onClick={onDecrement}>
              <Icon data={Minus} size={16} />
            </Button>

            <span className='select-none text-center text-base font-medium'>
              {cartCount}
            </span>

            <Button
              disabled={cartCount >= 50}
              size='xl'
              view='flat-action'
              onClick={() => cartApi.incrementCartItem(id)}
            >
              <Icon data={Plus} size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className='span:font-bold'
          size='xl'
          width='max'
          onClick={() => cartApi.setCartItem(model)}
        >
          Добавить в корзину
        </Button>
      )}

      <Button
        className='after:bg-primary-light mt-2 span:font-bold'
        size='xl'
        view='flat-action'
        width='max'
        onClick={onBuyNow}
      >
        Купить сейчас
      </Button>
    </Card>
  );
};

interface ShareButtonProps extends HTMLAttributes<HTMLSpanElement> {
  iconProps: IconProps;
  textClassName?: string;
}

const ShareButton = ({
  className,
  textClassName,
  iconProps,
}: ShareButtonProps) => {
  const shareModels = Object.values({
    Skype: {
      backgroundColor: '#00aff0',
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M19.537 13.698c.115-.52.176-1.06.176-1.614 0-4.155-3.415-7.524-7.63-7.524-.444 0-.88.038-1.304.11A4.444 4.444 0 008.425 4C5.981 4 4 5.954 4 8.364c0 .805.222 1.56.608 2.207a7.428 7.428 0 00-.155 1.513c0 4.156 3.416 7.4 7.63 7.4.477 0 .944-.044 1.397-.126.623.33 1.335.642 2.092.642 2.444 0 4.425-1.953 4.425-4.364a4.3 4.3 0 00-.46-1.938zm-3.974 1.457c-.294.418-.725.747-1.293.984-.567.238-1.239.356-2.016.356-.933 0-1.702-.162-2.308-.486a2.986 2.986 0 01-1.047-.934c-.268-.39-.403-.768-.403-1.137 0-.213.08-.395.242-.547a.855.855 0 01.615-.229.76.76 0 01.512.178c.14.119.26.294.358.527.12.278.25.51.39.695.139.185.336.34.589.46.254.12.587.18 1 .18.566 0 1.027-.12 1.382-.364.354-.243.532-.547.532-.91a.919.919 0 00-.287-.702 1.88 1.88 0 00-.741-.412 13.21 13.21 0 00-1.216-.303c-.678-.146-1.247-.318-1.703-.513-.458-.196-.822-.463-1.09-.8-.269-.34-.403-.759-.403-1.26 0-.48.142-.904.426-1.275.283-.372.693-.658 1.23-.858.537-.2 1.17-.299 1.895-.299.58 0 1.082.066 1.505.198.423.133.774.309 1.053.528.28.22.484.45.612.691.13.24.194.477.194.705 0 .21-.08.4-.241.567a.8.8 0 01-.603.252c-.22 0-.386-.05-.5-.151-.114-.101-.237-.266-.37-.495a2.27 2.27 0 00-.618-.768c-.241-.184-.627-.276-1.16-.276-.494 0-.893.1-1.196.3-.303.199-.455.44-.455.72 0 .173.053.324.155.45.103.128.245.235.426.326.18.091.363.162.547.214.185.052.49.126.916.225a15.47 15.47 0 011.446.38c.432.138.8.307 1.103.503.302.198.54.45.709.752.17.302.255.673.255 1.111 0 .525-.148.998-.442 1.417z'
            fill='#FFF'
            fillRule='evenodd'
          />
        </svg>
      ),
      text: 'Skype',
    },
    Telegram: {
      backgroundColor: '#64a9dc',
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M18.92 6.089L4.747 11.555c-.967.388-.962.928-.176 1.168l3.534 1.104 1.353 4.146c.164.454.083.634.56.634.368 0 .53-.168.736-.368.13-.127.903-.88 1.767-1.719l3.677 2.717c.676.373 1.165.18 1.333-.628l2.414-11.374c.247-.99-.378-1.44-1.025-1.146zM8.66 13.573l7.967-5.026c.398-.242.763-.112.463.154l-6.822 6.155-.265 2.833-1.343-4.116z'
            fill='#FFF'
            fillRule='evenodd'
          />
        </svg>
      ),
      text: 'Telegram',
    },
    Viber: {
      backgroundColor: '#7b519d',
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <g fill='#FFF' fillRule='evenodd'>
            <path d='M18.434 15.574c-.484-.391-1.002-.743-1.511-1.102-1.016-.718-1.945-.773-2.703.38-.426.648-1.021.677-1.644.392-1.718-.782-3.044-1.989-3.821-3.743-.344-.777-.34-1.473.465-2.022.425-.29.854-.634.82-1.268-.045-.828-2.043-3.593-2.832-3.885a1.429 1.429 0 00-.984 0C4.373 4.95 3.606 6.48 4.34 8.292c2.19 5.405 6.043 9.167 11.349 11.463.302.13.638.183.808.23 1.208.012 2.623-1.158 3.032-2.318.393-1.117-.438-1.56-1.096-2.093zM12.485 4.88c3.879.6 5.668 2.454 6.162 6.38.045.363-.09.909.426.919.538.01.408-.528.413-.89.045-3.699-3.163-7.127-6.888-7.253-.281.04-.863-.195-.9.438-.024.427.466.357.787.406z' />
            <path d='M13.244 5.957c-.373-.045-.865-.222-.953.299-.09.546.458.49.811.57 2.395.538 3.23 1.414 3.624 3.802.057.349-.057.89.532.8.436-.066.278-.53.315-.802.02-2.293-1.936-4.38-4.329-4.669z' />
            <path d='M13.464 7.832c-.249.006-.493.033-.585.3-.137.4.152.496.446.544.983.158 1.5.74 1.598 1.725.027.268.195.484.452.454.356-.043.389-.361.378-.664.017-1.106-1.227-2.385-2.289-2.359z' />
          </g>
        </svg>
      ),
      text: 'Viber',
    },
    WhatsApp: {
      backgroundColor: '#65bc54',
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M20 11.794c0 4.304-3.517 7.794-7.855 7.794a7.87 7.87 0 01-3.796-.97L4 20l1.418-4.182a7.714 7.714 0 01-1.127-4.024C4.29 7.489 7.807 4 12.145 4S20 7.49 20 11.794zm-7.855-6.553c-3.641 0-6.603 2.94-6.603 6.553A6.48 6.48 0 006.8 15.636l-.825 2.433 2.537-.806a6.6 6.6 0 003.633 1.084c3.642 0 6.604-2.94 6.604-6.553s-2.962-6.553-6.604-6.553zm3.967 8.348c-.049-.08-.177-.128-.37-.223-.192-.095-1.139-.558-1.315-.621-.177-.064-.305-.096-.434.095a10.92 10.92 0 01-.61.749c-.112.128-.224.143-.416.048-.193-.096-.813-.297-1.549-.948a5.76 5.76 0 01-1.07-1.323c-.113-.191-.013-.295.084-.39.086-.086.192-.223.289-.334.096-.112.128-.191.192-.319s.032-.239-.016-.335c-.048-.095-.433-1.035-.594-1.418-.16-.382-.32-.318-.433-.318-.112 0-.24-.016-.369-.016a.71.71 0 00-.513.239c-.177.19-.674.653-.674 1.593s.69 1.848.786 1.976c.096.127 1.332 2.119 3.289 2.884 1.958.764 1.958.51 2.31.477.353-.031 1.14-.461 1.3-.908.16-.446.16-.829.113-.908z'
            fill='#FFF'
            fillRule='evenodd'
          />
        </svg>
      ),
      text: 'WhatsApp',
    },
    ВКонтакте: {
      backgroundColor: '#64a9dc',
      icon: (
        <svg fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12.878 17.304c-5.411 0-8.695-3.755-8.823-9.994h2.74c.086 4.583 2.171 6.528 3.77 6.925V7.31h2.627v3.954c1.542-.17 3.155-1.97 3.698-3.954h2.584c-.414 2.441-2.17 4.24-3.412 4.983 1.242.6 3.24 2.17 4.011 5.01h-2.84c-.6-1.898-2.07-3.369-4.04-3.569v3.57h-.315Z'
            fill='#fff'
          />
        </svg>
      ),
      text: 'ВКонтакте',
    },
    'Мой Мир': {
      backgroundColor: '#168de2',
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.889 9.667a1.333 1.333 0 100-2.667 1.333 1.333 0 000 2.667zm6.222 0a1.333 1.333 0 100-2.667 1.333 1.333 0 000 2.667zm4.77 6.108l-1.802-3.028a.879.879 0 00-1.188-.307.843.843 0 00-.313 1.166l.214.36a6.71 6.71 0 01-4.795 1.996 6.711 6.711 0 01-4.792-1.992l.217-.364a.844.844 0 00-.313-1.166.878.878 0 00-1.189.307l-1.8 3.028a.844.844 0 00.312 1.166.88.88 0 001.189-.307l.683-1.147a8.466 8.466 0 005.694 2.18 8.463 8.463 0 005.698-2.184l.685 1.151a.873.873 0 001.189.307.844.844 0 00.312-1.166z'
            fill='#FFF'
            fillRule='evenodd'
          />
        </svg>
      ),
      text: 'Мой Мир',
    },
    Одноклассники: {
      backgroundColor: '#f70',
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M14.83 10.77a3.951 3.951 0 0 1-5.604 0 3.951 3.951 0 0 1 0-5.604 3.95 3.95 0 0 1 5.604 0 3.951 3.951 0 0 1 0 5.604Zm-2.802-4.615c-.494 0-.942.2-1.271.53a1.79 1.79 0 0 0 0 2.542 1.789 1.789 0 0 0 2.543 0 1.789 1.789 0 0 0 0-2.543 1.839 1.839 0 0 0-1.272-.53Zm4.168 5.792 1.166 1.59c.059.082.047.188-.036.247-.977.8-2.119 1.33-3.308 1.613l2.249 4.332c.059.13-.024.271-.165.271H13.7a.206.206 0 0 1-.176-.118l-1.496-3.579-1.507 3.567a.181.181 0 0 1-.176.118H7.943c-.141 0-.224-.153-.165-.27l2.249-4.321a8.262 8.262 0 0 1-3.308-1.613c-.071-.06-.095-.177-.036-.248l1.166-1.589c.07-.094.188-.106.27-.035 1.096.93 2.45 1.542 3.898 1.542s2.79-.6 3.897-1.542c.094-.07.223-.06.282.035Z'
            fill='#FFF'
            fillRule='evenodd'
          />
        </svg>
      ),
      text: 'Одноклассники',
    },
  });

  return (
    <div className={className}>
      <Popover
        hasArrow={false}
        placement='bottom'
        content={
          <div className='flex flex-col gap-4'>
            <ClipboardButton
              size='l'
              text='https://www.google.com'
              view='normal'
              width='max'
            >
              Скопировать ссылку
            </ClipboardButton>

            <ul className='inline-flex items-center gap-2'>
              {shareModels.map((el) => (
                <li key={el.text}>
                  <a
                    className='size-7 rounded-md flex-center svg:size-6'
                    href='#'
                    style={{ backgroundColor: el.backgroundColor }}
                    title={el.text}
                  >
                    {el.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Text
          className={cn('inline-flex items-center', textClassName)}
          color='secondary'
          variant='subheader-1'
        >
          <Icon {...iconProps} className='mr-2' />
          <span className='max-lg:hidden'>Поделиться</span>
        </Text>
      </Popover>
    </div>
  );
};

import { type IconProps } from '@gravity-ui/uikit';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import 'swiper/css';

import { ProductItem } from '@/components/product-item/product-item.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

const ImagesPreview = ({ images = [] }: ProductProps) => {
  const [currentImage, setCurrentImage] = useState(images.at(0));
  const router = useRouter();

  const mainImageContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const swiperRef = useRef<SwiperRef['swiper']>(null);

  const onSetCurrentImage = (image: ProductProps['images'][number]) =>
    setCurrentImage(image);

  function getCurrentIndex() {
    if (!currentImage) return 0;

    return images.findIndex((img) => img.id === currentImage.id);
  }

  const currentIndex = getCurrentIndex();

  const canPrevHandler = currentIndex > 0;
  const canNextHandler = currentIndex < images.length - 1;

  function onPrev() {
    if (currentIndex <= 0) return setCurrentImage(images.at(-1));

    setCurrentImage(images[currentIndex - 1]);

    if (swiperRef.current) {
      swiperRef.current.slideTo(currentIndex - 1);
    }
  }

  function onNext() {
    if (currentIndex >= images.length - 1) return setCurrentImage(images.at(0));

    setCurrentImage(images[currentIndex + 1]);

    if (swiperRef.current) {
      swiperRef.current.slideTo(currentIndex + 1);
    }
  }

  const onMainImageHover = (event: MouseEvent<HTMLImageElement>) => {
    const container = event.currentTarget;
    const image = mainImageRef.current;

    if (!container || !image) return;

    const imageRect = image.getBoundingClientRect();

    const dx = imageRect.x + imageRect.width / 2;
    const dy = imageRect.y + imageRect.height / 2;

    const diffX = Math.abs(event.clientX - dx) * 0.2;
    const diffY = Math.abs(event.clientY - dy) * 0.2;

    image.style.transform = `translate(${diffX}px, ${diffY}px)`;
  };

  const onMainImageLeave = () => {
    const image = mainImageRef.current;

    if (!image) return;

    image.style.transform = 'translate(0, 0) scale(100%)';
  };

  const onSliderImageHover = (event: MouseEvent<HTMLImageElement>) => {
    const mainImage = mainImageRef.current;

    if (!mainImage) return;

    mainImage.srcset = event.currentTarget.srcset;
  };

  const onSliderImageLeave = () => {
    const image = mainImageRef.current;

    if (!image || !currentImage) return;

    image.srcset = currentImage.path;
  };

  if (!images.length) return null;

  return (
    <div className='flex gap-2'>
      <div className='w-full min-w-[84px] max-w-[84px] max-lg:hidden'>
        <Swiper
          className='size-full [&>.swiper-wrapper]:h-full'
          direction='vertical'
          slidesPerView={5.5}
          spaceBetween={4}
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {[
            { id: '1', name: '1', path: '/images/about/lift.png' },
            {
              id: '2',
              name: '2',
              path: '/images/about/assortment.png',
            },
          ].map((image) => (
            <SwiperSlide key={image.id} className='max-h-28 min-h-28 w-full'>
              <div className='size-full p-0.5'>
                <button
                  className='relative size-full select-none overflow-hidden rounded-2xl outline-none ring-2 ring-transparent transition-all duration-300 hover:ring-primary'
                  onClick={() => onSetCurrentImage(image)}
                >
                  <Image
                    fill
                    alt={image.name}
                    objectFit='cover'
                    src={image.path}
                    onMouseEnter={onSliderImageHover}
                    onMouseLeave={onSliderImageLeave}
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='aspect-[466/701] size-full max-h-[701px] max-lg:aspect-[466/840] max-lg:max-h-96'>
        <div
          ref={mainImageContainerRef}
          className='group relative h-full overflow-hidden rounded-2xl max-lg:rounded-none'
          // onMouseLeave={onMainImageLeave}
          // onMouseMove={onMainImageHover}
        >
          <button
            className='absolute left-2 top-2 z-10 size-8 outline-none flex-center lg:hidden'
            onClick={() => router.push(LINKS.products())}
          >
            <Icon data={ArrowLeft} size={26} />
          </button>

          <ShareButton
            className='absolute right-3 top-3 z-10 lg:!hidden'
            textClassName='!text-foreground'
            iconProps={{
              data: NodesRight,
              size: 26,
            }}
          />

          <div className='pointer-events-none invisible absolute z-10 size-full px-2.5 opacity-0 transition-all duration-300 flex-between group-hover:visible group-hover:opacity-100 max-lg:hidden'>
            <button
              className='pointer-events-auto invisible flex size-12 items-center justify-center rounded-full bg-white text-foreground opacity-0 transition-all duration-300 hover:text-primary data-[visible=true]:visible data-[visible=true]:opacity-100 max-lg:size-10 max-md:size-9'
              data-visible={canPrevHandler}
              onClick={onPrev}
            >
              <Icon data={ArrowLeft} size={24} />
            </button>

            <button
              className='pointer-events-auto invisible flex size-12 items-center justify-center rounded-full bg-white text-foreground opacity-0 transition-all duration-300 hover:text-primary data-[visible=true]:visible data-[visible=true]:opacity-100 max-lg:size-10 max-md:size-9'
              data-visible={canNextHandler}
              onClick={onNext}
            >
              <Icon data={ArrowRight} size={24} />
            </button>
          </div>

          {currentImage && (
            <Fragment>
              <Image
                ref={mainImageRef}
                fill
                alt={currentImage?.name}
                className='max-lg:invisible'
                objectFit='cover'
                src={currentImage?.path}
              />

              <Swiper
                className='h-full lg:!hidden'
                slidesPerView={images.length > 1 ? 1.1 : 1}
                spaceBetween={0}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index.toString()}>
                    <Image
                      fill
                      alt={image?.name}
                      objectFit='cover'
                      src={image?.path}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
