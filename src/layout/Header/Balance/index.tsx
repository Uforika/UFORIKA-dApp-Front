import React, { memo } from 'react';
import { useCurrencyConversion } from '@hooks/currency-conversion.hooks';
import { useBalance } from '@hooks/wallet.hooks';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import { CURRENCY, TOKEN } from '@constants/token.constants';
import { FORA_NAME } from '@constants/global.constants';
import styles from './styles.module.scss';

const Balance = () => {
  const balanceFora = useBalance(TOKEN.FORA);
  const balanceForaUsd = useCurrencyConversion(TOKEN.FORA, CURRENCY.USD, balanceFora);

  return (
    <div className={styles.container}>
      <Icon className={styles.icon} width={24} type={ICONS.COIN_FORA} />
      <div>
        <p className={styles.balance}>{balanceFora.toFormat(2)} {FORA_NAME}</p>
        <p className={styles.balanceUsd}>${balanceForaUsd.toFormat(2)}</p>
      </div>
    </div>
  );
};

export default memo(Balance);
