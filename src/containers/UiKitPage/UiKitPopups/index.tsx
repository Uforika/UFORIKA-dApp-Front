/* eslint-disable max-len */
import React, { memo } from 'react';
import Header from '@components/Header';
import Popup from '@components/Popup';

import styles from './styles.module.scss';

const UiKitPopups = () => (
  <div className={styles.wrap}>
    <Header className={styles.title} as="h2">Popups</Header>
    <Popup
      position="bottom left"
      trigger={<span>Popup</span>}
      content="Receiving USDT from the Rio Wallet means the transaction will go through the Rio Chain network and will be settled after the required confirmations."
    />
  </div>
);

export default memo(UiKitPopups);
