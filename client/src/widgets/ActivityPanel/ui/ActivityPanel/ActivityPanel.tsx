import { FC } from 'react';

import styles from './ActivityPanel.module.scss';

interface Props {
  className?: string;
}

const ActivityPanel: FC<Props> = ({ className }) => (
  <div className={`${className} ${styles.panel}`} />
);

export default ActivityPanel;
