import { FC, lazy, Suspense } from 'react';

import { getLoginRoute, getRegistrationRoute } from '@/shared/configs';

import styles from './AuthPage.module.scss';

const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const RegistrationForm = lazy(() => import('../RegistrationForm/RegistrationForm'));

interface Props {
  className?: string;
}

const authPageMappper = {
  [getLoginRoute()]: <LoginForm />,
  [getRegistrationRoute()]: <RegistrationForm />,
};

const AuthPage: FC<Props> = (props) => {
  const { pathname } = window.location;

  const element = authPageMappper[pathname];

  return <main className={styles.authPage}>{element}</main>;
};

export default AuthPage;
