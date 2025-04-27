import { FC } from 'react';

import { Text } from '@/shared/ui';

import styles from './LoginForm.module.scss';

interface Props {
  className?: string;
}

const LoginForm: FC<Props> = (props) => (
  <form className={styles.loginForm} action="" method="post">
    <Text size="xl" className={styles.formTitle}>
      Sign in
    </Text>
    <label className={styles.inputWrap} htmlFor="login">
      Login
      <input className={styles.input} id="login" type="text" />
    </label>
    <label className={styles.inputWrap} htmlFor="password">
      Password
      <input className={styles.input} type="password" />
    </label>
    <button className={styles.btn} type="button">
      Sign in
    </button>
  </form>
);

export default LoginForm;
