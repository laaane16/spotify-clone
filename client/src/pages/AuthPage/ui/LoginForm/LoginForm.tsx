import { ChangeEvent, FC, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui';
import { getHomeRoute, getRegistrationRoute } from '@/shared/configs';
import {
  getAuthError,
  getAuthIsLoading,
  getAuthLoginByUsername,
} from '../../model/store/authStore';

import styles from './LoginForm.module.scss';
import Loader from '@/shared/ui/Loader/Loader';

interface Props {
  className?: string;
}

const LoginForm: FC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isLoading = getAuthIsLoading();
  const error = getAuthError();
  const loginByUsername = getAuthLoginByUsername();

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleClick = async () => {
    const res = await loginByUsername(username, password);
    if (typeof res !== 'string') {
      navigate(getHomeRoute());
    }
  };

  return (
    <form className={styles.loginForm} action="" method="post">
      <Text size="xl" className={styles.formTitle}>
        Log in
      </Text>
      <label className={styles.inputWrap} htmlFor="login">
        Login
        <input
          value={username}
          onChange={handleChangeUsername}
          className={styles.input}
          id="login"
          type="text"
        />
      </label>
      <label className={styles.inputWrap} htmlFor="password">
        Password
        <input
          value={password}
          onChange={handleChangePassword}
          className={styles.input}
          type="password"
        />
      </label>
      <button onClick={handleClick} className={styles.btn} type="button">
        {isLoading && <Loader />}
        Log in
      </button>
      <Text size="xs">Don't have an account yet?</Text>
      <Link className={styles.link} to={getRegistrationRoute()}>
        <Text size="s">Sign Up</Text>
      </Link>
    </form>
  );
};

export default LoginForm;
