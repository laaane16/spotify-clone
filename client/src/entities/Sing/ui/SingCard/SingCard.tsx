import { FC } from 'react';
import classNames from 'classnames';

import { Text } from '@/shared/ui';

import styles from './SingCard.module.scss';
import { SingSchema } from '../../model/types/SingSchema';

interface Props {
  data: SingSchema;
  isFavourite?: boolean;
  isPlaying?: boolean;
  isActive?: boolean;
  className?: string;
}

const SingCard: FC<Props> = ({ isFavourite, isPlaying, isActive }) => {
  return (
    <div className={classNames(styles.card, { [styles.active]: isActive })}>
      {isPlaying ? (
        <span></span>
      ) : (
        <Text className={styles.number} size="s">
          1
        </Text>
      )}
      {/* <img src="" alt="" /> */}
      <div
        className={styles.img}
        style={{ width: '52px', height: '52px', backgroundColor: 'black', opacity: 0.2 }}
      ></div>
      <div className={styles.info}>
        <Text className={styles.title} size="s">
          Play it safe
        </Text>
        <Text className={styles.author} size="s">
          Julia Wolf
        </Text>
      </div>
      <Text className={styles.album} size="s">
        Play it safe
      </Text>
      <Text className={styles.date} size="s">
        12.12.2002
      </Text>
      <span className={styles.favourite}>like</span>
      <Text className={styles.time} size="s">
        2:12
      </Text>
    </div>
  );
};

export default SingCard;
