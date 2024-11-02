import { MASKS } from '../constants/masks.ts';
import { Mask } from '../types/mask.ts';
import { formatWithMask } from './format-with-mask.ts';

class Masker {
  phone(text?: string) {
    return this.format(text, MASKS.phone);
  }

  format(text?: string, mask?: Mask) {
    return formatWithMask({ mask, text }).masked;
  }
}

export const masker = new Masker();
