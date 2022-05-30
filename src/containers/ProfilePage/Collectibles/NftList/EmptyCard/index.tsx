import React, { FC, memo } from 'react';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import styles from './styles.module.scss';

const EmptyCard: FC = () => (
  <div className={styles.wrapper}>
    <Icon className={styles.icon} width={32} type={ICONS.UFO_SHIP} />
    <p className={styles.subtitle}>You do not have NFT yet</p>
    <p className={styles.description}> Coming Soon —
      Uforika Marketplace: Buy & Trade assets with $FORA to enhance your Uforika experience
    </p>
  </div>
);

export default memo(EmptyCard);
