import React, { memo } from 'react';
import ButtonIcon from '@components/ButtonIcon';
import { ICONS } from '@components/Icon/types';
import styles from './styles.module.scss';

const UiKitIcons = () => (
  <div className={styles.wrap}>
    <h2>Icons</h2>

    <div className={styles.grid}>
      {(Object.keys(ICONS) as Array<keyof typeof ICONS>)
        .map((icon) => <ButtonIcon key={icon} type={ICONS[icon]} />)}
    </div>

  </div>
);

export default memo(UiKitIcons);
