'use client';

import { useEffect, useRef, useState } from 'react';

import cc from 'classcat';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState('videos/1.mp4');
  const [nextVideo, setNextVideo] = useState('');
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();

  const onMouseEnterHandler = (target: EventTarget) => {
    const videoSrc = (target as HTMLElement).dataset.videoSrc || 'videos/1.mp4';

    if (videoSrc !== currentVideo) {
      setIsFadingOut(true);
      setTimeout(() => {
        setNextVideo(videoSrc);
      }, 200);
    }
  };

  useEffect(() => {
    const nextRef = nextVideoRef.current;

    if (nextRef && nextVideo !== '') {
      const handleLoadedData = () => {
        setCurrentVideo(nextVideo);
        setIsFadingOut(false);
      };

      nextRef.addEventListener('loadeddata', handleLoadedData);
      nextRef.load();

      return () => {
        nextRef.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [nextVideo]);

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
      videoSrc: 'videos/1.mp4'
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
      videoSrc: 'videos/2.mp4'
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
      videoSrc: 'videos/3.mp4'
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
      videoSrc: 'videos/4.mp4'
    },
  ];

  return (
    <>
      <div className="absolute left-0 top-0 -z-10 size-full bg-black"></div>
      <video ref={currentVideoRef} autoPlay loop muted
        className={cc([{ 'opacity-0 -z-1': isFadingOut }, 'absolute left-0 top-0 z-0 size-full object-cover transition-opacity duration-200 ease'])}>
        <source src={currentVideo} type="video/mp4" />
      </video>
      <video ref={nextVideoRef} autoPlay loop muted
        className={cc([{ 'opacity-1 z-0': isFadingOut }, 'absolute left-0 top-0 -z-1 size-full object-cover transition-opacity duration-200 ease'])}>
        <source src={nextVideo} type="video/mp4" />
      </video>
      <div className="fixed flex size-full">
        {
          mainRouteItems.map((item, index) => (
            <div
              key={index}
              className="group flex h-full w-1/4 cursor-pointer items-center justify-center border-x-2 border-transparent hover:border-white"
              data-video-src={item.videoSrc}
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
