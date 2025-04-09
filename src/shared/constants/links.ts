export const LINKS = {
  about: '/about',
  cart: () => '/cart',
  checkout: '/checkout',
  home: '/',
  login: '/login',
  news: (id?: string | number) => buildUrl('/news', id),
  notAccess: '/403',
  notFound: '/not-found',
  privacyPolicy: '/privacy-policy',
  products: (id?: string | number) => buildUrl('/products', id),
  profile: '/profile',
  register: '/register',
  services: (id?: string | number) => buildUrl('/services', id),
  successOrderCompletion: '/success-order-completion',
};

function buildUrl(path: string, id?: string | number) {
  if (!id) {
    return path;
  }

  return `${path}/${id}`;
}
