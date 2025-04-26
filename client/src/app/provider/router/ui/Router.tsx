import { FC, LazyExoticComponent, ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import routeConfig from '../configs/routeConfig';

const Router: FC<Props> = (props) => {
  const suspensedEl = (el: ReactNode): ReactNode => {
    return <Suspense fallback={'Loading'}>{el}</Suspense>;
  };

  return (
    <Routes>
      {Object.values(routeConfig).map((route) => (
        <Route path={route.path} element={suspensedEl(route.element)} />
      ))}
    </Routes>
  );
};

export default Router;
