export const LINKS = {
  about: '/about',
  home: '/',
  login: '/login',
  news: (id?: string | number) => buildUrl('/news', id),
  notAccess: '/403',
  notFound: '/404',
  products: (id?: string | number) => buildUrl('/products', id),
  profile: '/profile',
  services: (id?: string | number) => buildUrl('/services', id),
};

function buildUrl(path: string, id?: string | number) {
  if (!id) {
    return path;
  }

  return `${path}/${id}`;
}
