import React, { memo } from 'react';
import PageWrapper from '@components/PageWrapper';
import TransferReceive from './TransferReceive';
import TransferSend from './TransferSend';
import styles from './styles.module.scss';

const TransferPage = () => (
  <PageWrapper title="Transfer">
    <div className={styles.grid}>
      <TransferSend />
      <TransferReceive />
    </div>
  </PageWrapper>
);

export default memo(TransferPage);
