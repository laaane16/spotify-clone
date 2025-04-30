import { ChangeEvent, FC, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui';
import { getAuthIsLoading, getAuthRegistration } from '../../model/store/authStore';

import styles from './RegistrationForm.module.scss';
import { getHomeRoute, getLoginRoute, getRegistrationRoute } from '@/shared/configs';

interface Props {
  className?: string;
}

const RegistrationForm: FC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isLoading = getAuthIsLoading();
  const registration = getAuthRegistration();

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleClick = async () => {
    const res = await registration(username, password);
    if (typeof res !== 'string') {
      navigate(getHomeRoute());
    }
  };

  return (
    <form className={styles.registrationForm} action="" method="post">
      <Text size="xl" className={styles.formTitle}>
        Sign up
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
        {isLoading && 'Загрузка'}
        Sign in
      </button>
      <Text size="xs">Already have an account?</Text>
      <Link className={styles.link} to={getLoginRoute()}>
        <Text size="s">Log in</Text>
      </Link>
    </form>
  );
};

export default RegistrationForm;
