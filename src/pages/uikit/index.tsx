import React from 'react';
import Link from 'next/link';
import { Page } from '../../types/next.types';
import UiKitModals from './UiKitModals';
import UiKitDropdowns from './UiKitDropdowns';
import styles from './uikit.module.scss';

const UiKitPage: Page = () => (
  <div className={styles.page}>
    <div className={styles.wrap}>
      <Link href="/">⬅️ To Index</Link>
      <br />
      <br />
      <UiKitModals />
      <UiKitDropdowns />
    </div>
  </div>
);

export default UiKitPage;
