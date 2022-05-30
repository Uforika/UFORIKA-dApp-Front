import React, { FC, memo, useCallback } from 'react';
import { downloadQRCode } from '@helpers/qrCode.helper';
import { copy } from '@helpers/copy.helper';
import Header from '@components/Header';
import QrCode from '@components/QrCode';
import LinkButton from '@components/LinkButton';
import ButtonIcon from '@components/ButtonIcon';
import { ICONS } from '@components/Icon/constants';
import Popup from '@components/Popup';
import Section from '@components/Section';
import { TOAST_MASSAGE_SUCCESS } from '@constants/messages.constants';
import styles from './styles.module.scss';

type Props = {
  address: string | null
}

const TransferReceive: FC<Props> = ({ address }) => {

  const handleDownloadQrCode = useCallback(() => {
    downloadQRCode('TransferReceiveQr');
  }, []);

  const handleCopy = useCallback(() => {
    copy(address as string, TOAST_MASSAGE_SUCCESS.COPY);
  }, [address]);

  return (
    <Section className={styles.root}>
      <Header className={styles.title} as="h3">Your wallet address</Header>
      <div className={styles.qrWrap}>
        <QrCode id="TransferReceiveQr" size={160} value={address as string} />
      </div>
      <div className={styles.addressWrap}>
        <span className={styles.address}>{address}</span>
        <Popup
          content="Copy"
          position="bottom left"
          trigger={<ButtonIcon onClick={handleCopy} type={ICONS.COPY} />}
        />

      </div>
      <LinkButton onClick={handleDownloadQrCode} className={styles.button}>
        Download QR
      </LinkButton>
    </Section>
  );
};

export default memo(TransferReceive);
