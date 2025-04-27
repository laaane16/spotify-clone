import { lazy, ReactElement } from 'react';

import {
  AppRoutes,
  getHomeRoute,
  getLibraryRoute,
  getLoginRoute,
  getPlaylistRoute,
  getRegistrationRoute,
  getSearchRoute,
} from '@/shared/configs';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LibraryPage = lazy(() => import('@/pages/LibraryPage'));
const PlaylistPage = lazy(() => import('@/pages/PlaylistPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const LoginPage = lazy(() => import('@/pages/AuthPage'));
const RegistrationPage = lazy(() => import('@/pages/AuthPage'));

interface IRoute {
  element: ReactElement;
  path: string;
  authOnly?: boolean;
}
type AppRoutesKeys = keyof typeof AppRoutes;
type RouteConfig = Record<(typeof AppRoutes)[AppRoutesKeys], IRoute>;

const routeConfig: RouteConfig = {
  [AppRoutes.HOME]: {
    element: <HomePage />,
    path: getHomeRoute(),
  },
  [AppRoutes.LIBRARY]: {
    element: <LibraryPage />,
    path: getLibraryRoute(),
  },
  [AppRoutes.PLAYLIST]: {
    element: <PlaylistPage />,
    path: getPlaylistRoute(':id'),
  },
  [AppRoutes.SEARCH]: {
    element: <SearchPage />,
    path: getSearchRoute(),
  },
  [AppRoutes.REGISTRATION]: {
    element: <RegistrationPage />,
    path: getRegistrationRoute(),
  },
  [AppRoutes.LOGIN]: {
    element: <LoginPage />,
    path: getLoginRoute(),
  },
};

export default routeConfig;
