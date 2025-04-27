export const AppRoutes = {
  HOME: 'home',
  LIBRARY: 'library',
  PLAYLIST: 'playlist',
  SEARCH: 'search',
  LOGIN: 'login',
  REGISTRATION: 'registration',
} as const;

export const getHomeRoute = () => '/';
export const getLibraryRoute = () => '/library';
export const getPlaylistRoute = (id: string) => `/playlist/${id}`;
export const getSearchRoute = () => '/search';
export const getLoginRoute = () => '/login';
export const getRegistrationRoute = () => '/registration';
