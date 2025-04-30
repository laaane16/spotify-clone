import { FC, ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import routeConfig, { IRoute } from '../configs/routeConfig';
import { getUserId } from '@/entities/User/model/store/userStore';
import { getLoginRoute } from '@/shared/configs';
import PageLoader from '@/shared/ui/PageLoader/PageLoader';
import NotFoundPage from '@/pages/NotFoundPage/ui/NotFoundPage';

const suspensedEl = (el: ReactNode): ReactNode => (
  <Suspense fallback={<PageLoader />}>{el}</Suspense>
);

const checkRouteAccess = (userId: number | null, route: IRoute) => {
  if (route.public !== true && userId === null) {
    return false;
  }
  return true;
};

const Router: FC = (props) => {
  const userId = getUserId();

  return (
    <Routes>
      {Object.values(routeConfig).map((route) =>
        checkRouteAccess(userId, route) ? (
          <Route path={route.path} element={suspensedEl(route.element)} />
        ) : (
          <Route path={route.path} element={<Navigate to={getLoginRoute()} />} />
        ),
      )}
      <Route
        path="*"
        element={
          <div style={{ color: 'black' }}>
            <NotFoundPage />
          </div>
        }
      />
      ,
    </Routes>
  );
};

export default Router;
