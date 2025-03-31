import { useUnit } from 'effector-react';

import {
  $modal,
  hideModalEvent,
  showModalEvent,
} from '@/shared/models/modal.ts';

export const useModal = () =>
  useUnit({
    hide: hideModalEvent,
    show: showModalEvent,
    state: $modal,
  });
