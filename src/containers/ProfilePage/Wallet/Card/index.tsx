import React, { FC, memo } from 'react';
import Icon from '@components/Icon';
import BigNumber from 'bignumber.js';
import { ICONS } from '@components/Icon/constants';
import styles from './styles.module.scss';

type Props = {
  count: BigNumber,
  usdPrice: BigNumber,
  name: string,
  logo: ICONS.FORA_COIN_LOGO | ICONS.MATIC_COIN_LOGO,
  color: string
}

const Card: FC<Props> = ({
  count, usdPrice, name, logo, color,
}) => (
  <div className={styles.card}>
    <div>
      <h3 className={styles.count} style={{ color }}>{count.toFormat(2)}</h3>
      <p className={styles.name}>{name}</p>
      <p className={styles.usdPrice}>${usdPrice.toFormat(2)}</p>
    </div>
    <div>
      <Icon width={48} type={logo} />
    </div>
  </div>
);

export default memo(Card);
