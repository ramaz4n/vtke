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

  return (
    <>
      <video ref={currentVideoRef} autoPlay loop muted
        className={cc([{ 'opacity-0 -z-1': isFadingOut }, 'absolute left-0 top-0 z-0 size-full object-cover transition-opacity duration-200 ease'])}>
        <source src={currentVideo} type="video/mp4" />
      </video>
      <video ref={nextVideoRef} autoPlay loop muted
        className={cc([{ 'opacity-1 z-0': isFadingOut }, 'absolute left-0 top-0 -z-1 size-full object-cover transition-opacity duration-200 ease'])}>
        <source src={nextVideo} type="video/mp4" />
      </video>
      <div className="fixed flex size-full">
        <div
          className="group flex h-full w-1/4 cursor-pointer items-center justify-center border-x-2 border-transparent hover:border-white"
          data-video-src="videos/1.mp4"
          onClick={() => router.push('/about')}
          onMouseEnter={(event) => onMouseEnterHandler(event.target)}
        >
          <div className="relative">
            <h2 className="text-center text-5xl font-bold text-white">Компания</h2>
            <div className="invisible absolute left-0 top-24 ml-1 flex flex-col gap-3 text-white group-hover:visible">
              <Link className="text-xl hover:underline" href="/about">О нас</Link>
              <Link className="text-xl hover:underline" href="/about">Видео</Link>
              <Link className="text-xl hover:underline" href="/about">Команда</Link>
              <Link className="text-xl hover:underline" href="/about">Цели</Link>
            </div>
          </div>
        </div>
        <div
          className="group flex h-full w-1/4 cursor-pointer items-center justify-center border-x-2 border-transparent hover:border-white"
          data-video-src="videos/2.mp4"
          onClick={() => router.push('/products')}
          onMouseEnter={(event) => onMouseEnterHandler(event.target)}
        >
          <div className="relative">
            <h2 className="text-center text-5xl font-bold text-white">Продукты</h2>
            <div className="invisible absolute left-0 top-24 ml-1 flex flex-col gap-3 text-white group-hover:visible">
              <Link className="text-xl hover:underline" href="/about">О нас</Link>
              <Link className="text-xl hover:underline" href="/about">Видео</Link>
              <Link className="text-xl hover:underline" href="/about">Команда</Link>
              <Link className="text-xl hover:underline" href="/about">Цели</Link>
            </div>
          </div>
        </div>
        <div
          className="group flex h-full w-1/4 cursor-pointer items-center justify-center border-x-2 border-transparent hover:border-white"
          data-video-src="videos/3.mp4"
          onClick={() => router.push('/services')}
          onMouseEnter={(event) => onMouseEnterHandler(event.target)}
        >
          <div className="relative">
            <h2 className="text-center text-5xl font-bold text-white">Услуги</h2>
            <div className="invisible absolute left-0 top-24 ml-1 flex flex-col gap-3 text-white group-hover:visible">
              <Link className="text-xl hover:underline" href="/about">О нас</Link>
              <Link className="text-xl hover:underline" href="/about">Видео</Link>
              <Link className="text-xl hover:underline" href="/about">Команда</Link>
              <Link className="text-xl hover:underline" href="/about">Цели</Link>
            </div>
          </div>
        </div>
        <div
          className="group flex h-full w-1/4 cursor-pointer items-center justify-center border-x-2 border-transparent hover:border-white"
          data-video-src="videos/4.mp4"
          onClick={() => router.push('/news')}
          onMouseEnter={(event) => onMouseEnterHandler(event.target)}
        >
          <div className="relative">
            <h2 className="text-center text-5xl font-bold text-white">Новости</h2>
            <div className="invisible absolute left-0 top-24 ml-1 flex flex-col gap-3 text-white group-hover:visible">
              <Link className="text-xl hover:underline" href="/about">О нас</Link>
              <Link className="text-xl hover:underline" href="/about">Видео</Link>
              <Link className="text-xl hover:underline" href="/about">Команда</Link>
              <Link className="text-xl hover:underline" href="/about">Цели</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
