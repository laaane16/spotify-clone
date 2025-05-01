import { FC, ReactNode, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import routeConfig, { IRoute } from '../configs/routeConfig';
import { getUserId, getUserInitData, getUserInited } from '@/entities/User/model/store/userStore';
import { getHomeRoute, getLoginRoute } from '@/shared/configs';
import PageLoader from '@/shared/ui/PageLoader/PageLoader';
import NotFoundPage from '@/pages/NotFoundPage/ui/NotFoundPage';
import { loginByUsername } from '@/pages/AuthPage/model/services/loginByUsername/loginByUsername';

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
  const navigate = useNavigate();

  const userId = getUserId();
  const initUserData = getUserInitData();
  const initedUser = getUserInited();

  useEffect(() => {
    initUserData();
  }, []);

  useEffect(() => {
    if (initedUser && userId) {
      navigate(getHomeRoute());
    }
  }, [initedUser]);

  return !initedUser ? (
    <PageLoader />
  ) : (
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
