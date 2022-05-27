import React, { memo } from 'react';
import PageWrapper from '@components/PageWrapper';
import { useWallet } from '@hooks/wallet.hooks';
import TransferReceive from './TransferReceive';
import TransferSend from './TransferSend';
import styles from './styles.module.scss';

const TransferPage = () => {
  const { address } = useWallet();

  return (
    <PageWrapper title="Transfer">
      <div className={styles.grid}>
        <TransferSend address={address} />
        <TransferReceive address={address} />
      </div>
    </PageWrapper>
  );
};

export default memo(TransferPage);
