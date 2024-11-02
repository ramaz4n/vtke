import { Selection } from '@nextui-org/react';

export const formatSelectChange = (keys: string): Selection => {
  if (!keys) {
    return new Set([]);
  }

  return new Set(keys.split(','));
};
