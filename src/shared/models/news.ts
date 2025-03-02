import { createStore } from 'effector';

import { NewsProps } from '@/shared/types/api/news.ts';

export const $news = createStore<NewsProps | null>(null);
