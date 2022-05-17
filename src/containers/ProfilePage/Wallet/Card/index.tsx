import React, { FC, memo } from 'react';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { formatNumber } from '@helpers/balance.helper';
import styles from './styles.module.scss';

type Props = {
  count: number,
  usdPrice: number,
  name: string,
  logo: ICONS.FORA_COIN_LOGO | ICONS.MATIC_COIN_LOGO,
  color: string
}

const Card: FC<Props> = ({
  count, usdPrice, name, logo, color,
}) => (
  <div className={styles.card}>
    <div>
      <h3 className={styles.count} style={{ color }}>{formatNumber(count)}</h3>
      <p className={styles.name}>{name}</p>
      <p className={styles.usdPrice}>${formatNumber(usdPrice)}</p>
    </div>
    <div>
      <Icon width={48} type={logo} />
    </div>
  </div>
);

export default memo(Card);
