import { useUnit } from 'effector-react/effector-react.umd';

import { $modal } from '../models/modal.ts';
import { DefaultType } from '../types/global.ts';
import { ModalNames } from '../types/modals.ts';

type AdditionalTypes = { sectionId: number };

export const useModal = <T = undefined>(name: ModalNames) => {
  const currentModal = useUnit($modal);

  return {
    additionalFields: currentModal?.additionalFields as DefaultType<
      AdditionalTypes,
      T extends undefined ? undefined : T
    >,
    id: currentModal?.id,
    isModalVisible: currentModal?.name === name,
    modal: currentModal,
  };
};
