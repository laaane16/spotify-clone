import { FC } from 'react';
import classNames from 'classnames';

import styles from './Loader.module.scss';

const sizeVariants = {
  s: styles.sizeS,
  m: styles.sizeM,
  l: styles.sizeL,
} as const;

interface Props {
  className?: string;
  size?: keyof typeof sizeVariants;
}

const Loader: FC<Props> = ({ size = 's' }) => (
  <span className={classNames(styles.loader, sizeVariants[size])} />
);

export default Loader;
