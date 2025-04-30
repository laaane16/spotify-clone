import { FC } from 'react';

import Loader from '../Loader/Loader';

import styles from './PageLoader.module.scss';

interface Props {
  className?: string;
}

const PageLoader: FC<Props> = (props) => (
  <div className={styles.pageLoader}>
    <Loader size="l" />
  </div>
);

export default PageLoader;
