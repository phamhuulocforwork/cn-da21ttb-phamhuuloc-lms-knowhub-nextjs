import { MenuHandlers } from '@/types/menu';

export const menuHandlers: MenuHandlers = {
  profile: (router) => router.push('/profile'),
  theme: (_, { theme, setTheme }) =>
    setTheme(theme === 'light' ? 'dark' : 'light'),
  logout: (_, __, { logout }) => logout?.(),
  login: (router) => router.push('/login'),
  register: (router) => router.push('/register'),
};
