'use client';

import { MouseEvent, useRef, useState } from 'react';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import { ProductProps } from '@/shared/types/api/products.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const ProductPage = () => {
  const { model } = useProduct();

  const article = model?.article?.replace('article-', '') ?? '';

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

            <h1 className='mb-4 line-clamp-2 text-lg font-semibold'>
              {model.name}
            </h1>

            <DefinitionList responsive>
              <DefinitionListItem copyText={article} name='Артикул'>
                {article}
              </DefinitionListItem>

              <DefinitionListItem name='Описание'>
                <span dangerouslySetInnerHTML={{ __html: model.description }} />
              </DefinitionListItem>
            </DefinitionList>
          </div>

          <div className='sticky bottom-8 h-fit xl:hidden'>
            <div className='w-full bg-pink-500'>Sticky</div>
          </div>
        </div>

        <div className='sticky top-28 h-fit pl-8 max-xl:hidden'>
          <div className='w-full bg-pink-500'>3</div>
        </div>
      </section>
    </MainContainer>
  );
};

import { ArrowLeft, ArrowRight, ChevronRight } from '@gravity-ui/icons';
import { DefinitionList, DefinitionListItem, Icon } from '@gravity-ui/uikit';
import Link from 'next/link';

import 'swiper/css';

import { LINKS } from '@/shared/constants/links.ts';

const ImagesPreview = ({ images = [] }: ProductProps) => {
  const [currentImage, setCurrentImage] = useState(images.at(0));

  const mainImageContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);

  const onSetCurrentImage = (image: ProductProps['images'][number]) =>
    setCurrentImage(image);

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
      <div className='w-full max-w-[84px] max-lg:hidden'>
        <Swiper
          className='h-full [&>.swiper-wrapper]:h-full'
          direction='vertical'
          slidesPerView={5.5}
          spaceBetween={4}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {[
            { id: '1', name: '1', path: '/images/about/lift.png' },
            {
              id: '2',
              name: '2',
              path: '/images/about/assortment.png',
            },
          ].map((image) => (
            <SwiperSlide key={image.id} className='max-h-28 min-h-28'>
              <div className='h-full p-0.5'>
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
          <div className='pointer-events-none invisible absolute inset-4 z-10 opacity-0 transition-all duration-300 flex-between group-hover:visible group-hover:opacity-100 max-lg:hidden'>
            <button className='pointer-events-auto size-12 rounded-full bg-white text-foreground transition-all duration-300 flex-center hover:text-primary max-lg:size-10 max-md:size-9'>
              <Icon data={ArrowLeft} size={24} />
            </button>

            <button className='pointer-events-auto size-12 rounded-full bg-white text-foreground transition-all duration-300 flex-center hover:text-primary max-lg:size-10 max-md:size-9'>
              <Icon data={ArrowRight} size={24} />
            </button>
          </div>

          {currentImage && (
            <Image
              ref={mainImageRef}
              fill
              alt={currentImage?.name}
              objectFit='cover'
              src={currentImage?.path}
            />
          )}
        </div>
      </div>
    </div>
  );
};
