import { createEvent, createStore } from 'effector';

export type DrawerName = 'catalog';

export type DrawerStore = Set<DrawerName> | null;

export const showDrawerEvent = createEvent<DrawerName>();
export const hideDrawerEvent = createEvent<DrawerName>();
export const hideAllDrawerEvent = createEvent();

export const $drawer = createStore<DrawerStore>(null)
  .on(showDrawerEvent, (state, name) => {
    if (!state) {
      return new Set([name]);
    }

    state.add(name);

    return state;
  })
  .on(hideDrawerEvent, (state, name) => {
    if (!state) {
      return null;
    }

    if (state.has(name)) {
      state.delete(name);
    }

    return state.size === 0 ? null : state;
  })
  .reset(hideAllDrawerEvent);
