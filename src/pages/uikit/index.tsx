import React from 'react';
import Link from 'next/link';
import { Page } from '../../types/next.types';
import UiKitModals from './UiKitModals';
import UiKitDropdowns from './UiKitDropdowns';
import UiKitIcons from './UiKitIcons';
import styles from './uikit.module.scss';

const UiKitPage: Page = () => (
  <div className={styles.page}>
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
