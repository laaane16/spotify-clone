import { FC } from 'react';

import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import { ActivityPanel } from '@/widgets/ActivityPanel';
import { Text } from '@/shared/ui';

import styles from './HomePage.module.scss';
import SingCard from '@/entities/Sing/ui/SingCard/SingCard';

interface Props {
  className?: string;
}

const HomePage: FC<Props> = (props) => (
  <div className={styles.pageLayout}>
    <Header className={styles.header} />
    <Sidebar className={styles.sidebar} />
    <main className={styles.main}>
      <div className={styles.info}>
        <div className={styles.img} />
        <div className={styles.textInfo}>
          <Text className={styles.playlistText} size="xs">
            PUBLIC PLAYLIST
          </Text>
          <Text className={styles.playlistName} size="xxl">
            Chill Mix
          </Text>
          <Text className={styles.playlistSingers} size="m">
            Julia Wolf, ayokay
          </Text>
          <Text className={styles.playlistInfo} size="m">
            Maded for davedirect3, 34 songs, 2hr 01 min
          </Text>
        </div>
      </div>
      <ul>
        {new Array(15).fill(1).map(() => (
          <li>
            <SingCard />
          </li>
        ))}
      </ul>
    </main>
    <ActivityPanel className={styles.activityPanel} />
  </div>
);

export default HomePage;
