import React from 'react';
import Link from '@components/Link';
import { Page } from '../../types/next.types';
import UiKitModals from './UiKitModals';
import UiKitDropdowns from './UiKitDropdowns';
import UiKitIcons from './UiKitIcons';
import UiKitPopups from './UiKitPopups';
import styles from './styles.module.scss';

const UiKitPage: Page = () => (
  <div className={styles.page}>
    <UiKitPopups />
    <div className={styles.wrap}>
      <div className={styles.link}>
        <Link href="/">⬅️ To Index</Link>
      </div>
      <br />
      <br />
      <UiKitModals />
      <UiKitDropdowns />
      <UiKitIcons />
    </div>
  </div>
);

export default UiKitPage;
