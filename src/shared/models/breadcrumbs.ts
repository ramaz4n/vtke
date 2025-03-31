import { createEvent, createStore } from 'effector';

export const setBreadcrumbs = createEvent();

export const $breadcrumbs = createStore([]).on(
  setBreadcrumbs,
  (_, payload) => payload,
);
