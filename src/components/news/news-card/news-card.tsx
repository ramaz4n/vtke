import { Text } from '@gravity-ui/uikit';
import Link from 'next/link';

import { NewsProps } from '@/shared/types/api/news.ts';

export default function NewsCard({ title, image, description, id }: NewsProps) {
  return (
    <Link
      className='flex max-h-[330px] w-full items-center gap-9 rounded-3xl px-4.5 py-2 shadow-sm transition-shadow duration-300 hover:shadow-lg'
      href={`/news/${id}`}
    >
      <img alt={title} className='size-[290px] rounded-3xl' src={image} />

      <div className='flex flex-col justify-center gap-5'>
        <Text className='text-foreground-text mb-2' variant='display-1'>
          {title}
        </Text>

        <Text className='text-foreground-text mb-2' variant='body-2'>
          {description}
        </Text>
      </div>
    </Link>
  );
}
