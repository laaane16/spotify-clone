import { FC, ReactNode } from 'react';

import styles from './Text.module.scss';

type TextVariant = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

const TextSizes: Record<TextVariant, string> = {
  xs: styles.sizeXs,
  s: styles.sizeS,
  m: styles.sizeM,
  l: styles.sizeL,
  xl: styles.sizeXl,
  xxl: styles.sizeXxl,
};

interface Props {
  size?: TextVariant;
  children: ReactNode;
  className?: string;
}

const Text: FC<Props> = ({ size = 'm', className, children }) => {
  const classes = `${className} ${TextSizes[size]}`;

  return <span className={classes}>{children}</span>;
};

export default Text;
