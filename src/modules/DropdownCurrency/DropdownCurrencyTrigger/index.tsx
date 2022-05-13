import React, { FC, memo } from 'react';
import { DropdownCurrencyItemType } from '../types';
import styles from './DropdownCurrencyTrigger.module.scss';

type Props = Pick<DropdownCurrencyItemType, 'image' | 'text' | 'value'>

const DropdownCurrencyTrigger: FC<Props> = ({ text, image, value }) => (
  <div className={styles.wrap}>
    <span className={styles.value}>{value}</span>
    <div className={styles.panel}>
      <span className={styles.image}>{image}</span>
      <span className={styles.text}>{text}</span>
    </div>
  </div>
);

export default memo(DropdownCurrencyTrigger);
