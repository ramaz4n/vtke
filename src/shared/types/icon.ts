export interface SpritesMap {
  chat:
    | 'arrow'
    | 'clip'
    | 'copy'
    | 'done_circle'
    | 'download'
    | 'plain'
    | 'tail'
    | 'trash'
    | 'viewed-full'
    | 'viewed';
  common:
    | 'add'
    | 'arrow-rigth'
    | 'arrow'
    | 'basket'
    | 'bin-bottles'
    | 'burger'
    | 'cards'
    | 'close-circle'
    | 'close'
    | 'done'
    | 'double-right-arrow'
    | 'down-arrow'
    | 'download'
    | 'edit'
    | 'empty-dark'
    | 'empty-light'
    | 'file'
    | 'folder-download'
    | 'light'
    | 'logout'
    | 'long_arrow'
    | 'menu'
    | 'moon'
    | 'phone'
    | 'plus'
    | 'search'
    | 'success'
    | 'table-picnic'
    | 'table'
    | 'trash'
    | 'view'
    | 'warning';
  logo: 'logo-name' | 'logo-small' | 'logo';
  menu:
    | 'booking'
    | 'contracts'
    | 'dashboard'
    | 'guests'
    | 'home'
    | 'institutions'
    | 'news-events'
    | 'partners'
    | 'places'
    | 'promo-code'
    | 'reviews'
    | 'staff'
    | 'support'
    | 'tag'
    | 'transactions'
    | 'user'
    | 'users'
    | 'wiki';
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string;
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string;
      }
    >;
  };
} = {
  chat: {
    filePath: 'chat.f3110fbc.svg',
    items: {
      arrow: {
        viewBox: '0 0 37 24',
      },
      clip: {
        viewBox: '0 0 24 24',
      },
      copy: {
        viewBox: '0 0 24 28',
      },
      done_circle: {
        viewBox: '0 0 24 24',
      },
      download: {
        viewBox: '0 0 19 22',
      },
      plain: {
        viewBox: '0 0 24 24',
      },
      tail: {
        viewBox: '0 0 24 24',
      },
      trash: {
        viewBox: '0 0 76 89',
      },
      'viewed-full': {
        viewBox: '0 0 18 10',
      },
      viewed: {
        viewBox: '0 0 14 10',
      },
    },
  },
  common: {
    filePath: 'common.a5055320.svg',
    items: {
      add: {
        viewBox: '0 0 512 512',
      },
      'arrow-rigth': {
        viewBox: '0 0 12 12',
      },
      arrow: {
        viewBox: '0 0 9 18',
      },
      basket: {
        viewBox: '0 0 21 23',
      },
      'bin-bottles': {
        viewBox: '0 0 24 24',
      },
      burger: {
        viewBox: '0 0 24 24',
      },
      cards: {
        viewBox: '0 0 20 20',
      },
      'close-circle': {
        viewBox: '0 0 20 20',
      },
      close: {
        viewBox: '0 0 24 24',
      },
      done: {
        viewBox: '0 0 20 16',
      },
      'double-right-arrow': {
        viewBox: '0 0 12 9',
      },
      'down-arrow': {
        viewBox: '0 0 12 8',
      },
      download: {
        viewBox: '0 0 24 24',
      },
      edit: {
        viewBox: '0 0 24 24',
      },
      'empty-dark': {
        viewBox: '0 0 64 41',
      },
      'empty-light': {
        viewBox: '0 0 64 41',
      },
      file: {
        viewBox: '0 0 16 21',
      },
      'folder-download': {
        viewBox: '0 0 24 24',
      },
      light: {
        viewBox: '0 0 256 256',
      },
      logout: {
        viewBox: '0 0 24 24',
      },
      long_arrow: {
        viewBox: '0 0 55 24',
      },
      menu: {
        viewBox: '0 0 24 24',
      },
      moon: {
        viewBox: '0 0 256 256',
      },
      phone: {
        viewBox: '0 0 24 24',
      },
      plus: {
        viewBox: '0 0 24 24',
      },
      search: {
        viewBox: '0 0 22 22',
      },
      success: {
        viewBox: '0 0 20 20',
      },
      'table-picnic': {
        viewBox: '0 0 24 24',
      },
      table: {
        viewBox: '0 0 20 20',
      },
      trash: {
        viewBox: '0 0 76 89',
      },
      view: {
        viewBox: '0 0 24 24',
      },
      warning: {
        viewBox: '0 0 24 24',
      },
    },
  },
  logo: {
    filePath: 'logo.cabfbc6d.svg',
    items: {
      'logo-name': {
        viewBox: '0 0 689 247',
      },
      'logo-small': {
        viewBox: '0 0 309 237',
      },
      logo: {
        viewBox: '0 0 1080 248',
      },
    },
  },
  menu: {
    filePath: 'menu.d6d6eec1.svg',
    items: {
      booking: {
        viewBox: '0 0 24 24',
      },
      contracts: {
        viewBox: '0 0 24 24',
      },
      dashboard: {
        viewBox: '0 0 24 23',
      },
      guests: {
        viewBox: '0 0 24 24',
      },
      home: {
        viewBox: '0 0 18 21',
      },
      institutions: {
        viewBox: '0 0 24 24',
      },
      'news-events': {
        viewBox: '0 0 24 24',
      },
      partners: {
        viewBox: '0 0 24 24',
      },
      places: {
        viewBox: '0 0 24 24',
      },
      'promo-code': {
        viewBox: '0 0 24 24',
      },
      reviews: {
        viewBox: '0 0 17 17',
      },
      staff: {
        viewBox: '0 0 24 24',
      },
      support: {
        viewBox: '0 0 17 17',
      },
      tag: {
        viewBox: '0 0 17 19',
      },
      transactions: {
        viewBox: '0 0 17 18',
      },
      user: {
        viewBox: '0 0 24 24',
      },
      users: {
        viewBox: '0 0 24 24',
      },
      wiki: {
        viewBox: '0 0 24 24',
      },
    },
  },
};
