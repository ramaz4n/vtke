import { ModalName, ModalStore } from '@/shared/models/modal.ts';

export function modalHasName(store: ModalStore, name: ModalName) {
  if (!store) return false;

  return store.has(name);
}
