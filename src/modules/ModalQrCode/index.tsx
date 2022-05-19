import React, { FC, memo } from 'react';
import Modal from '@components/Modal';
import LinkButton from '@components/LinkButton';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { downloadQRCode } from '@helpers/qrCode.helper';
import QrCode from '@components/QrCode';
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
        <button className={styles.closeIcon} onClick={onClose}>
          <Icon width={24} type={ICONS.CLOSE_QR_CODE_MODAL} />
        </button>
        <div className={styles.background} />
        <div className={styles.shadow} />
        <div className={styles.content}>
          <h3 className={styles.title}>Your wallet address</h3>
          <div className={styles.qrCodeContainer}>
            <div className={styles.qrCode}>
              <QrCode id="qrCodeEl" size={160} value={address} />
            </div>
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
