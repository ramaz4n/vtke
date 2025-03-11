'use client';

import { Text } from '@gravity-ui/uikit';
import { motion } from 'framer-motion';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { Button } from '@/shared/ui/button/button.tsx';

export default function Page() {
  return (
    <div className='w-full pb-16'>
      <div className='relative overflow-hidden py-20'>
        <img
          alt='main'
          className='absolute inset-0 -z-10 h-full bg-center bg-no-repeat object-cover'
          src='/images/about/lift.png'
        />
        <div className='-z-5 absolute inset-0 size-full bg-black opacity-70'></div>
        <MainContainer>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className='mb-6 text-center text-5xl font-bold text-white'
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            ВТК "ПРОМТЕХ"
          </motion.h1>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className='rounded-2xl p-6 shadow-md'
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex flex-col gap-4 text-xl text-white'>
              <p>
                Общество с ограниченной ответственностью «Внешнеторговая
                компания «ПРОМТЕХ» специализируется на импорте в Российскую
                Федерацию запасных частей и узлов для лифтов турецких
                производителей.
              </p>

              <p>
                ООО «ВТК «ПРОМТЕХ» сотрудничает непосредственно с заводами
                производителями лифтового оборудования, и имеет отлаженные
                каналы поставки продукции из Турецкой республики в Россию.
                Благодаря тесному сотрудничеству с производителями, мы имеем
                возможность предоставить нашим покупателям техническую поддержку
                от специалистов производителя.
              </p>

              <p>
                Наши сотрудники предоставят Вам качественный сервис, помогут в
                выборе нужных Вам запасных частей и быстро обработают Вашу
                заявку. Также у нас имеется складской запас часто закупаемых
                позиций, а если запрашиваемая Вами позиция отсутствует на
                складе, то мы в кратчайшие сроки доставим эту позицию с завода,
                срок поставки заказных позиций не превышает трёх недель.
              </p>

              <p>
                Приглашаем к сотрудничеству производственные предприятия,
                специализирующиеся на выпуске лифтов, сервисные и
                эксплуатирующие лифтовые организации, а также организации,
                торгующие лифтовыми запасными частями.
              </p>
            </div>
          </motion.div>
        </MainContainer>
      </div>

      <MainContainer>
        <div className='mx-auto flex flex-col gap-16'>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='mt-10'
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='mb-4 text-center text-3xl font-semibold'>
              Наши ценности
            </h2>
            <div className='grid gap-6 md:grid-cols-2'>
              <motion.div
                className='rounded-xl bg-white p-5 text-center shadow-lg'
                whileHover={{ scale: 1.05 }}
              >
                <h3 className='text-xl font-semibold'>Широкий ассортимент</h3>

                <img
                  alt='assortment'
                  className='mt-6 h-menu w-full lg:h-[440px]'
                  src='/images/about/assortment.png'
                />

                <div className='mt-6 text-start'>
                  <Text variant='body-3'>
                    В течение нескольких лет мы занимаемся производством и
                    монтажом лифтов и подъемников. Цель нашей компании
                    заключается в поставке надёжного и качественного
                    оборудования, способного при минимальных затратах повысить
                    эффективность любого предприятия. Мы предоставляем для наших
                    клиентов полный комплекс услуг: от проектирования лифтов, их
                    производства и поставки до монтажа.
                  </Text>
                  <br />
                  <Text className='mt-6 block font-bold' variant='body-3'>
                    <strong>В нашей компании вы можете заказать:</strong>
                  </Text>
                  <ul className='mt-2 text-sm'>
                    <li>- Пассажирские лифты</li>
                    <li>- Панорамные лифты</li>
                    <li>- Больничные лифты</li>
                    <li>- Грузовые лифты</li>
                    <li>- Грузовые подъемники</li>
                    <li>- Коттеджные лифты</li>
                    <li>- Подъемники для инвалидов и др.</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className='rounded-xl bg-white p-5 text-center shadow-lg'
                whileHover={{ scale: 1.05 }}
              >
                <h3 className='text-xl font-semibold'>Индивидуальный подход</h3>

                <img
                  alt='assortment'
                  className='mt-6 h-menu w-full lg:h-[440px]'
                  src='/images/about/individuals.webp'
                />

                <div className='mt-6 text-start'>
                  <Text className='mt-6 block font-bold' variant='body-3'>
                    <strong>В нашей компании вы можете заказать:</strong>
                  </Text>
                  <ul className='mt-2 text-sm'>
                    <li>- Пассажирские лифты</li>
                    <li>- Панорамные лифты</li>
                    <li>- Больничные лифты</li>
                    <li>- Грузовые лифты</li>
                    <li>- Грузовые подъемники</li>
                    <li>- Коттеджные лифты</li>
                    <li>- Подъемники для инвалидов и др.</li>
                  </ul>

                  <p className='mt-6 block'>
                    Мы стремимся предоставлять только качественные услуги, и с
                    гордостью можем сказать, что у нас это отлично получается.
                    Круг партнеров нашей компании необычайно широк, в него
                    входят частные лица, заводы, холдинги и крупные оптовики.
                  </p>

                  <p className='mt-6 block'>
                    Обратившись однажды в нашу компанию, наши партнеры
                    по-настоящему оценили, насколько качественно и чётко мы
                    выполняем свою работу, что и послужило мотивацией
                    долгосрочного сотрудничества с нашей компанией.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='mt-10'
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='mb-4 text-center text-3xl font-semibold'>
              Наша команда
            </h2>
            <div className='grid gap-6 md:grid-cols-3'>
              {['Рамазан', 'Глеб', 'Константин'].map((name, index) => (
                <motion.div
                  key={index}
                  className='rounded-xl bg-gray-100 p-5 text-center shadow-md'
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className='text-xl font-semibold'>{name}</h3>
                  <p className='text-gray-600'>Разработчик</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='mt-10 text-center'
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='mb-4 text-3xl font-semibold'>Свяжитесь с нами</h2>
            <p className='mb-4 text-lg text-gray-700'>
              Email: contact@company.com
            </p>
            <Button>Написать нам</Button>
          </motion.div>
        </div>
      </MainContainer>
    </div>
  );
}
