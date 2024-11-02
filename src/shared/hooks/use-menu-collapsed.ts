import { useLocalStorage } from 'usehooks-ts';

export const useMenuCollapsed = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useLocalStorage(
    'menu-collapsed',
    false,
  );

  return {
    isMenuCollapsed,
    setMenuCollapsed,
  };
};
