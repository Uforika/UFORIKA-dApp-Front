import React, { FC } from 'react';
import ModalWrap from '../ModalWrap';

import styles from './styles.module.scss';

type Props = {
  text: string;
  onSuccess: () => void;
  onFailure: () => void;
}

const ConfirmModal: FC<Props & {
  onClose: () => void;
}> = ({
  onClose, onFailure, onSuccess, text, ...props
}) => {

  const handleCancel = () => {
    onFailure();
    onClose();
  };

  const handleConfirm = () => {
    onSuccess();
    onClose();
  };

  return (
    <ModalWrap {...props} onClose={onClose} title={text}>
      <div className={styles.wrap}>
        <div className={styles.actions}>
          <button
            className={styles.actionSuccess}
            onClick={() => handleConfirm()}
          >Yes
          </button>
          <button
            className={styles.actionFailure}
            onClick={() => handleCancel()}
          >No
          </button>
        </div>
      </div>
    </ModalWrap>
  );
};

export default ConfirmModal;
