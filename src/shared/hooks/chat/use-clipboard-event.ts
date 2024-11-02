import { useEventListener } from 'usehooks-ts';

import { chatInstance } from '../../utils/chat-service.ts';
import { UploadedFile } from '../../utils/file-service.ts';

export type ClipboardEventProps = {
  event: ClipboardEvent;
  files?: UploadedFile[];
};

export const useClipboardEvent = (
  onPaste: (props: ClipboardEventProps) => void,
) => {
  const handler = (event: ClipboardEvent) => {
    const args: ClipboardEventProps = { event };

    if (event.clipboardData && event.clipboardData.files) {
      args.files = chatInstance.createFormattedFiles(event.clipboardData.files);
    }

    onPaste(args);
  };

  useEventListener('paste', handler);
};
