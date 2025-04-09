import { createEvent, createStore } from 'effector';

export type ModalName =
  | 'search-products'
  | 'catalog'
  | 'reset-cart'
  | 'mobile-menu';

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

    const newState = [...state];

    return new Set(newState);
  })
  .on(hideModalEvent, (state, name) => {
    if (!state) {
      return null;
    }

    if (state.has(name)) {
      state.delete(name);
    }
    const newState = [...state];

    return state.size === 0 ? null : new Set(newState);
  })
  .reset(hideAllModalEvent);
