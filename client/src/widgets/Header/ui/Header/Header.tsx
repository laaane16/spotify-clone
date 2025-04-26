import { FC } from 'react';

import styles from './Header.module.scss';

interface Props {
  className?: string;
}

const Header: FC<Props> = ({ className }) => (
  <header className={`${className} ${styles.header}`}>
    <div className={styles.profile} />
  </header>
);

export default Header;
