/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Breadcrumbs as BreadcrumbsUI,
  type BreadcrumbsProps as BreadcrumbsPropsUI,
  FirstDisplayedItemsCount,
  LastDisplayedItemsCount,
  Skeleton,
  Text,
} from '@gravity-ui/uikit';
import { useUnit } from 'effector-react';
import Link from 'next/link';

import { LINKS } from '@/shared/constants/links.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';

export interface BreadcrumbsProps
  extends Omit<
    BreadcrumbsPropsUI,
    'firstDisplayedItemsCount' | 'lastDisplayedItemsCount' | 'items'
  > {
  enabledStartLink?: boolean;
  isLoading?: boolean;
  skeletonCount?: number;
}

export const Breadcrumbs = ({
  isLoading,
  skeletonCount = 3,
  enabledStartLink,
}: BreadcrumbsProps) => {
  const breadcrumbs = useUnit($breadcrumbs);

  const list = (() => {
    if (enabledStartLink) {
      return breadcrumbs;
    }

    return [{ href: LINKS.home, text: 'Главная' }, ...breadcrumbs];
  })();

  if (isLoading) {
    return (
      <div className='g-breadcrumbs__inner'>
        {Array.from({ length: skeletonCount }).map((_, key) => (
          <Skeleton key={key} className='h-4 max-w-28' />
        ))}
      </div>
    );
  }

  return (
    <BreadcrumbsUI
      firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
      items={list}
      lastDisplayedItemsCount={LastDisplayedItemsCount.One}
      renderItem={({ item }) => (
        <Text
          as={item?.href ? Link : 'span'}
          color='hint'
          // @ts-ignore
          href={item?.href}
        >
          {item.text}
        </Text>
      )}
    />
  );
};
