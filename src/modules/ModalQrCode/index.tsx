import React, { FC, memo } from 'react';
import { downloadQRCode } from '@helpers/qrCode.helper';
import Modal from '@components/Modal';
import LinkButton from '@components/LinkButton';
import { ICONS } from '@components/Icon/constants';
import QrCode from '@components/QrCode';
import ButtonIcon from '@components/ButtonIcon';
import styles from './styles.module.scss';

type Props = {
  address: string;
  onClose: () => void;
}

const ModalQrCode: FC<Props> = ({ address, onClose, ...props }) => {

  const handleDownloadQrCode = () => {
    downloadQRCode('qrCodeEl');
  };

  return (
    <Modal size="tiny" {...props}>
      <div className={styles.panel}>
        <ButtonIcon
          className={styles.closeIcon}
          onClick={onClose}
          width={24}
          type={ICONS.CLOSE}
        />
        <div className={styles.background} />
        <div className={styles.shadow} />
        <div className={styles.content}>
          <h3 className={styles.title}>Your wallet address</h3>
          <div className={styles.qrCodeContainer}>
            <QrCode id="qrCodeEl" size={160} value={address} />
          </div>
          <LinkButton onClick={handleDownloadQrCode} className={styles.button}>
            Download QR
          </LinkButton>
        </div>
      </div>
    </Modal>
  );
};
export default memo(ModalQrCode);
