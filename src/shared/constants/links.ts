import { FetchSlug } from '../types/global.ts';

type Id = FetchSlug | number;

export const LINKS = {
  auth: '/auth',
  bookingCreate: '/booking/create',
  bookings: (id?: Id) => getPath('/booking', id),
  bookingsUpdate: (id?: Id) => getPath('/booking/update', id),
  contracts: (id?: Id) => getPath('/contracts', id),
  dashboard: '/',
  error404: '/404',
  guests: (id?: Id) => getPath('/guests', id),
  institutionTable: (id?: Id) => getPath('/institutions/tables/view', id),
  institutionTables: (id?: Id) => getPath('/institutions/tables', id),
  institutionTablesCreate: (id?: Id) =>
    getPath('/institutions/tables/create', id),
  institutions: (id?: Id) => getPath('/institutions', id),
  'promo-codes': (id?: Id) => getPath('/promo-codes', id),
  staff: (id?: Id) => getPath('/staff', id),
  'support-chat': (id?: Id) => getPath('/support-chat', id),
  users: (id?: Id) => getPath('/users', id),
  wiki: '/wiki',
};

function getPath(path: string, id?: string | number) {
  let result = path;

  if (id) result += `/${id}`;

  return result;
}
