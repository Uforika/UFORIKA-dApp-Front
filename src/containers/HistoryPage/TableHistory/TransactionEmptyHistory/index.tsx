import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import React, { FC, memo } from 'react';
import styles from './styles.module.scss';

type Props = {
  withoutTransactions: boolean
}

const TransactionEmptyHistory: FC<Props> = ({ withoutTransactions }) => (
  <div className={styles.root}>
    <Icon width={32} type={ICONS.UFO_SHIP} />
    <h4 className={styles.title}>
      {withoutTransactions ? 'You have no transactions to display yet' : 'No transactions found'}
    </h4>
    {!withoutTransactions && (
      <p className={styles.text}>
        Please change the data, your filters or try different keywords.
      </p>
    )}
  </div>
);

export default memo(TransactionEmptyHistory);
