import Link from 'next/link';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { NAVIGATIONS } from '@/shared/constants/navigations.ts';

export default function Footer() {
  return (
    <footer className='bg-mainBlue flex w-full items-center justify-between pb-6 pt-14'>
      <MainContainer>
        <div className='mx-auto grid max-w-7xl gap-8 px-6 text-white md:grid-cols-3'>
          {/* Контакты */}
          <div>
            <h3 className='mb-3 text-xl font-bold'>КОНТАКТЫ</h3>
            <p className='text-sm'>
              г. Москва, ул. Скаковая, дом 36, офис 205 Бизнес Центр "Скаковая
              36"
            </p>
            <p className='mt-2 text-sm'>
              г. Казань, ул. Московская, дом 25, офис 212 Бизнес Центр
              "Булгар-офис"
            </p>
            <p className='mt-3 text-sm'>
              +7 800 511-22-96 <br />
              +7 937 625-07-07 <br />
              +7 963 862-58-58
            </p>
            <Link
              className='mt-2 block transition hover:text-blue-300'
              href='mailto:info@vtk-lift.ru'
            >
              info@vtk-lift.ru
            </Link>
          </div>

          {/* Продукция */}
          <div>
            <h3 className='mb-3 text-xl font-bold'>НАША ПРОДУКЦИЯ</h3>
            <ul className='space-y-2 text-sm'>
              {[
                'Панорамные лифты',
                'Больничные лифты',
                'Грузовые лифты',
                'Сервисные подъемники',
                'Коттеджные лифты',
                'Подъемники для инвалидов',
                'Пассажирские лифты',
                'Автомобильные лифты',
              ].map((item) => (
                <li key={item}>
                  <Link
                    className='transition hover:text-gray-400'
                    href={LINKS.products()}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Навигация */}
          <div>
            <h3 className='mb-3 text-xl font-bold'>НАВИГАЦИЯ ПО САЙТУ</h3>
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
        </div>

        {/* Копирайт */}
        <div className='mt-12 text-center text-xsm text-gray-300'>
          Copyright © 2020-2023 ООО "ВНЕШНЕТОРГОВАЯ КОМПАНИЯ "ПРОМТЕХ"
        </div>
      </MainContainer>
    </footer>
  );
}
