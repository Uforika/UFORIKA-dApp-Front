import React, { FC, memo } from 'react';
import useWallet from '@hooks/wallet';
import { useQrCodeModal } from '@hooks/modals.hooks';
import Popup from '@components/Popup';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { TOAST_SUCCESS } from '@constants/toast.constants';
import { TOAST_MASSAGE_SUCCESS } from '@constants/messages.constants';
import { showToast } from '@components/Toast';
import styles from './styles.module.scss';

const Address: FC = () => {
  const { address } = useWallet();

  const [showModal] = useQrCodeModal(address);

  const handelCopy = () => {
    if (!address) return;
    navigator?.clipboard.writeText(address).then(() => {
      showToast(TOAST_MASSAGE_SUCCESS.COPY, TOAST_SUCCESS);
    }).catch(() => null);
  };

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.address}>{address}</p>
      </div>
      <div>
        <Popup
          trigger={(
            <button onClick={handelCopy} className={styles.button}>
              <Icon width={24} type={ICONS.PROFILE_COPY} />
            </button>
          )}
          content="Copied"
          position="bottom left"
        />
        <Popup
          trigger={(
            <button onClick={showModal}>
              <Icon width={24} type={ICONS.PROFILE_QR_CODE} />
            </button>
          )}
          position="bottom left"
          content="QR code"
        />
      </div>
    </div>
  );
};

export default memo(Address);
