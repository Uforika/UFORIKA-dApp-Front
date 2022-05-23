import React, { FC, memo, useCallback } from 'react';
import { downloadQRCode } from '@helpers/qrCode.helper';
import Header from '@components/Header';
import QrCode from '@components/QrCode';
import LinkButton from '@components/LinkButton';
import ButtonIcon from '@components/ButtonIcon';
import { ICONS } from '@components/Icon/types';
import { useWallet } from '@hooks/wallet.hooks';
import { copy } from '@helpers/copy.helper';
import Popup from '@components/Popup';
import styles from './styles.module.scss';

const TransferReceive: FC = () => {
  const { address } = useWallet();

  const handleDownloadQrCode = useCallback(() => {
    downloadQRCode('TransferReceiveQr');
  }, []);

  const handleCopy = useCallback(() => {
    copy(address as string);
  }, [address]);

  return (
    <div className={styles.root}>
      <Header className={styles.title} as="h3">Your wallet address</Header>
      <div className={styles.qrWrap}>
        <QrCode id="TransferReceiveQr" size={160} value={address as string} />
      </div>
      <div className={styles.addressWrap}>
        <span className={styles.address}>{address}</span>
        <Popup
          content="Copy"
          position="bottom left"
          trigger={<ButtonIcon onClick={handleCopy} type={ICONS.PROFILE_COPY} />}
        />

      </div>
      <LinkButton onClick={handleDownloadQrCode} className={styles.button}>
        Download QR
      </LinkButton>
    </div>
  );
};

export default memo(TransferReceive);
