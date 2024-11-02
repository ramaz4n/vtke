import { ClipboardEvent } from 'react';

import { ControllerRenderProps } from 'react-hook-form';

import { CustomInputProps } from '../ui/form-elements/custom-input/custom-input.tsx';
import { formatWithMask } from '../utils/format-with-mask.ts';

export const usePhonePaste = <Name>(
  name: string,
  options: Partial<CustomInputProps<Name>>,
) => {
  const handlePasteValue = (
    e: ClipboardEvent<HTMLInputElement>,
    onChange: ControllerRenderProps['onChange'],
  ) => {
    if (options.enablePasteCallback) return;

    const pasteValue = e.clipboardData.getData('text');

    if (options.mask) {
      (e.target as HTMLInputElement).value = formatWithMask({
        mask: options.mask,
        text: pasteValue,
      }).masked;
    }

    onChange(pasteValue);
    options.textChange?.(name, pasteValue);
  };

  return {
    onPaste: handlePasteValue,
  };
};
