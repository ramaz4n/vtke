import { MASKS } from '../constants/masks.ts';
import { FormatWithMaskProps, FormatWithMaskResult } from '../types/mask.ts';

export const formatWithMask = (
  props: FormatWithMaskProps,
): FormatWithMaskResult => {
  const text = props?.text ? props.text.toString() : undefined;

  const { mask, obfuscationCharacter = '*', maskAutoComplete = false } = props;

  if (!text) return { masked: '', obfuscated: '', unmasked: '' };

  if (!mask)
    return {
      masked: text || '',
      obfuscated: text || '',
      unmasked: text || '',
    };

  const maskArray = typeof mask === 'function' ? mask(text) : mask;

  let masked = '';
  let obfuscated = '';
  let unmasked = '';

  let maskCharIndex = 0;
  let valueCharIndex = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (maskCharIndex === maskArray.length) {
      break;
    }

    const maskChar = maskArray[maskCharIndex];
    const valueChar = text[valueCharIndex] as string;

    if (valueCharIndex === text.length) {
      if (typeof maskChar === 'string' && maskAutoComplete) {
        masked += maskChar;
        obfuscated += maskChar;

        maskCharIndex += 1;
        continue;
      }
      break;
    }

    if (maskChar === valueChar) {
      masked += maskChar;
      obfuscated += maskChar;

      valueCharIndex += 1;
      maskCharIndex += 1;
      continue;
    }

    const unmaskedValueChar = text[valueCharIndex];

    if (typeof maskChar === 'object') {
      valueCharIndex += 1;

      const shouldObsfucateChar = Array.isArray(maskChar);

      const maskCharRegex = Array.isArray(maskChar) ? maskChar[0] : maskChar;

      const matchRegex = new RegExp(maskCharRegex).test(valueChar);

      if (matchRegex) {
        masked += valueChar;
        obfuscated += shouldObsfucateChar ? obfuscationCharacter : valueChar;
        unmasked += unmaskedValueChar;

        maskCharIndex += 1;
      }

      continue;
    } else {
      masked += maskChar;
      obfuscated += maskChar;

      maskCharIndex += 1;
      continue;
    }
  }

  return { masked, obfuscated, unmasked };
};

export const getPhoneWithMask = (phone?: number | string): string => {
  if (!phone) return '';

  return formatWithMask({ mask: MASKS.phone, text: phone.toString() }).masked;
};
