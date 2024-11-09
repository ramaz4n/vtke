'use client';

import { useRef, useState } from 'react';

import cc from 'classcat';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function Home() {
  const firstVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondVideoRef = useRef<HTMLVideoElement | null>(null);
  const thirdVideoRef= useRef<HTMLVideoElement | null>(null);
  const fourthVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<number>(1);

  const router = useRouter();

  const onMouseEnterHandler = (target: EventTarget) => {
    const videoType = (target as HTMLElement).dataset.video || '1';

    const isVideoHAve = firstVideoRef.current && secondVideoRef.current && thirdVideoRef.current && fourthVideoRef.current;

    if (isVideoHAve) {
      switch (videoType) {
        case '1': {
          firstVideoRef.current?.play();
          setActiveVideo(1);
          break;
        }
        case '2': {
          secondVideoRef.current?.play();
          setActiveVideo(2);
          break;
        }
        case '3': {
          thirdVideoRef.current?.play();
          setActiveVideo(3);
          break;
        }
        case '4': {
          fourthVideoRef.current?.play();
          setActiveVideo(4);
          break;
        }
      }
    }
  };

  const mainRouteItems = [
    {
      href: '/about',
      id: 1,
      routeList: [
        {
          href: '/about',
          id: 1,
          text: 'О нас'
        },
        {
          href: '/about',
          id: 2,
          text: 'Видео'
        },
        {
          href: '/about',
          id: 3,
          text: 'Команда'
        },
        {
          href: '/about',
          id: 4,
          text: 'Цели'
        },
      ],
      title: 'Компания',
      video: '1'
    },
    {
      href: '/products',
      id: 2,
      routeList: [
        {
          href: '/about',
          id: 1,
          text: 'О нас'
        },
        {
          href: '/about',
          id: 2,
          text: 'Видео'
        },
        {
          href: '/about',
          id: 3,
          text: 'Команда'
        },
        {
          href: '/about',
          id: 4,
          text: 'Цели'
        },
      ],
      title: 'Продукты',
      video: '2'
    },
    {
      href: '/services',
      id: 3,
      routeList: [
        {
          href: '/about',
          id: 1,
          text: 'О нас'
        },
        {
          href: '/about',
          id: 2,
          text: 'Видео'
        },
        {
          href: '/about',
          id: 3,
          text: 'Команда'
        },
        {
          href: '/about',
          id: 4,
          text: 'Цели'
        },
      ],
      title: 'Услуги',
      video: '3'
    },
    {
      href: '/news',
      id: 4,
      routeList: [
        {
          href: '/about',
          id: 1,
          text: 'О нас'
        },
        {
          href: '/about',
          id: 2,
          text: 'Видео'
        },
        {
          href: '/about',
          id: 3,
          text: 'Команда'
        },
        {
          href: '/about',
          id: 4,
          text: 'Цели'
        },
      ],
      title: 'Новости',
      video: '4'
    },
  ];

  return (
    <>
      <div className="absolute left-0 top-0 -z-10 size-full bg-black"></div>
      <video ref={firstVideoRef} autoPlay loop muted
        className={cc([{ 'opacity-100': activeVideo === 1 }, 'absolute left-0 top-0 opacity-0 size-full object-cover transition-opacity duration-300 ease'])}>
        <source src="videos/1.mp4" type="video/mp4" />
      </video>
      <video ref={secondVideoRef} loop muted
        className={cc([{ 'opacity-100': activeVideo === 2 }, 'absolute left-0 top-0 opacity-0 size-full object-cover transition-opacity duration-300 ease'])}>
        <source src="videos/2.mp4" type="video/mp4" />
      </video>
      <video ref={thirdVideoRef} loop muted
        className={cc([{ 'opacity-100': activeVideo === 3 }, 'absolute left-0 top-0 opacity-0 size-full object-cover transition-opacity duration-300 ease'])}>
        <source src="videos/3.mp4" type="video/mp4" />
      </video>
      <video ref={fourthVideoRef} loop muted
        className={cc([ { 'opacity-100': activeVideo === 4 },'absolute left-0 top-0 opacity-0 size-full object-cover transition-opacity duration-300 ease'])}>
        <source src="videos/4.mp4" type="video/mp4" />
      </video>
      <div className="fixed flex size-full">
        {
          mainRouteItems.map((item, index) => (
            <div
              key={index}
              className="group flex h-full w-1/4 cursor-pointer items-center justify-center border-x-2 border-transparent hover:border-white"
              data-video={item.video}
              onClick={() => router.push(item.href)}
              onMouseEnter={(event) => onMouseEnterHandler(event.target)}
            >
              <div className="relative">
                <h2 className="text-center text-5xl font-bold text-white"> {item.title}</h2>
                <div
                  className="invisible absolute left-0 top-24 ml-1 flex flex-col gap-3 text-white group-hover:visible">
                  {
                    item.routeList.map((route, index) => (
                      <Link key={index} className="text-xl hover:underline" href={route.href}>{route.text}</Link>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
