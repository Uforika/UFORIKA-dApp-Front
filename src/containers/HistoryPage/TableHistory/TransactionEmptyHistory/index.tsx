import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import React, { FC, memo } from 'react';
import styles from './styles.module.scss';

const TransactionEmptyHistory: FC = () => (
  <div className={styles.root}>
    <Icon width={32} type={ICONS.UFO_SHIP} />
    <h4 className={styles.title}>
      No transactions found
    </h4>
    <p className={styles.text}>Please change the data, your filters or try different keywords.</p>
  </div>
);

export default memo(TransactionEmptyHistory);
