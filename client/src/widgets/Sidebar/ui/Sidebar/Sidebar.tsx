import { FC } from 'react';

import styles from './Sidebar.module.scss';

interface Props {
  className?: string;
}

const Sidebar: FC<Props> = ({ className }) => (
  <div className={`${className} ${styles.sidebar}`}>
    <div className="" />
  </div>
);

export default Sidebar;
