/* eslint-disable max-len */
import Popup from '@components/Popup';
import React, { memo } from 'react';

import styles from './styles.module.scss';

const UiKitPopups = () => (
  <div className={styles.wrap}>
    <h2>Popups</h2>
    <Popup
      position="bottom left"
      trigger={<span>Popup</span>}
      content="Receiving USDT from the Rio Wallet means the transaction will go through the Rio Chain network and will be settled after the required confirmations."
    />
  </div>
);

export default memo(UiKitPopups);
