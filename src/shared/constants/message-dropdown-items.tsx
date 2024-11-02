import { Icon } from '../ui/icon/icon.tsx';

export const MESSAGE_DROPDOWN_ITEMS = [
  {
    forMessage: true,
    key: 'copy_to_clipboard',
    label: 'Копировать текст',
    startContent: <Icon name='chat/copy' />,
  },
  {
    key: 'select',
    label: 'Выбрать',
    startContent: <Icon name='chat/done_circle' />,
  },
  {
    forFile: true,
    key: 'download',
    label: 'Скачать',
    startContent: <Icon name='chat/download' />,
  },
  {
    isDanger: true,
    key: 'delete',
    label: 'Удалить',
    startContent: <Icon name='chat/trash' />,
  },
];
