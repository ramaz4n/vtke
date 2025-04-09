import Link from 'next/link';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { NAVIGATIONS } from '@/shared/constants/navigations.ts';

export default function Footer() {
  return (
    <footer className='flex w-full items-center justify-between bg-mainBlue pb-6 pt-14'>
      <MainContainer>
        <div className='flex flex-col items-start justify-between gap-8 text-white sm:flex-row'>
          <div>
            <h3 className='mb-3 text-xl font-bold uppercase'>
              НАВИГАЦИЯ ПО САЙТУ
            </h3>
            <ul className='space-y-2 text-sm'>
              {NAVIGATIONS.map((item) => (
                <li key={item.id}>
                  <Link
                    className='transition hover:text-gray-400'
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-3 text-xl font-bold uppercase'>Адреса</h3>
            <p className='text-sm'>
              г. Москва, ул. Скаковая, дом 36, офис 205 Бизнес Центр "Скаковая
              36"
            </p>
            <p className='mt-2 text-sm'>
              г. Казань, ул. Московская, дом 25, офис 212 Бизнес Центр
              "Булгар-офис"
            </p>
          </div>

          <div>
            <h3 className='mb-3 text-xl font-bold uppercase'>КОНТАКТЫ</h3>

            <a className='block' href='tel:78005112296'>
              +7 800 511-22-96
            </a>
            <a className='mt-2 block' href='tel:79376250707'>
              +7 937 625-07-07
            </a>
            <a className='mt-2 block' href='tel:79638625858'>
              +7 963 862-58-58
            </a>

            <Link
              className='mt-2 block transition hover:text-blue-300'
              href='mailto:info@vtk-lift.ru'
            >
              info@vtk-lift.ru
            </Link>
          </div>
        </div>

        <div className='mt-12 text-center text-xsm text-gray-300'>
          Copyright © 2020-2023 ООО "ВНЕШНЕТОРГОВАЯ КОМПАНИЯ "ПРОМТЕХ"
        </div>
      </MainContainer>
    </footer>
  );
}
