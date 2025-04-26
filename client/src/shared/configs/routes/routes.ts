export const AppRoutes = {
  HOME: 'home',
  LIBRARY: 'library',
  PLAYLIST: 'playlist',
  SEARCH: 'search',
} as const;

export const getHomeRoute = () => '/';
export const getLibraryRoute = () => '/library';
export const getPlaylistRoute = (id: string) => `/playlist/${id}`;
export const getSearchRoute = () => '/search';
