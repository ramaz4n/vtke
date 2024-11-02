import { useLocalStorage } from 'usehooks-ts';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [appTheme, updateAppTheme] = useLocalStorage('app_theme', 'light');
  const isDark = appTheme === 'dark';

  const setTheme = (theme: Theme) => {
    const html = window.document.querySelector('html');

    if (html) {
      const darkMode = theme === 'dark';

      if (darkMode) {
        html.classList.add('dark');
      } else {
        html.removeAttribute('class');
      }

      updateAppTheme(theme);
    }
  };

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return {
    appTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
};
