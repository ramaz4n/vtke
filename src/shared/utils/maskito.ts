import { MASKS } from '@/shared/constants/masks.ts';
import { Mask } from '@/shared/types/mask.ts';
import formatWithMask from '@/shared/utils/format-with-mask.ts';

export class Maskito {
  format(text?: string, mask?: Mask): string {
    return formatWithMask({ mask: mask || MASKS.phone, text }).masked;
  }

  remain(text?: string) {
    if (!text) return '';

    return text.replace(/\D/g, '');
  }
}

export const maskito = new Maskito();
