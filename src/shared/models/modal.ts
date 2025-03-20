import { createEvent, createStore } from 'effector';

export type ModalName = 'search-products' | 'catalog';

export type ModalStore = Set<ModalName> | null;

export const showModalEvent = createEvent<ModalName>();
export const hideModalEvent = createEvent<ModalName>();
export const hideAllModalEvent = createEvent();

export const $modal = createStore<ModalStore>(null)
  .on(showModalEvent, (state, name) => {
    if (!state) {
      return new Set([name]);
    }

    state.add(name);

    return state;
  })
  .on(hideModalEvent, (state, name) => {
    if (!state) {
      return null;
    }

    if (state.has(name)) {
      state.delete(name);
    }

    return state.size === 0 ? null : state;
  })
  .reset(hideAllModalEvent);
