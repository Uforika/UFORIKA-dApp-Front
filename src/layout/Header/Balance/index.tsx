import React, { memo } from 'react';
import { formatNumber, foraToUsd, USER_BALANCE } from '@helpers/balance.helper';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import styles from './styles.module.scss';

const Balance = () => {
  const balanceToUSD = foraToUsd(USER_BALANCE, 103.92);

  return (
    <div className={styles.container}>
      <Icon className={styles.icon} width={24} type={ICONS.UFORA_COIN} />
      <div>
        <p className={styles.balance}>{formatNumber(USER_BALANCE)} $FORA </p>
        <p className={styles.balanceUsd}>${formatNumber(balanceToUSD)}</p>
      </div>
    </div>
  );
};

export default memo(Balance);
