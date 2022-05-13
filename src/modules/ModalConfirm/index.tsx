import React, { FC, memo } from 'react';
import Modal from '@components/Modal';
import styles from './styles.module.scss';

type Props = {
  text: string;
  onSuccess: () => void;
  onFailure: () => void;
  onClose: () => void;
}

const ModalConfirm: FC<Props> = ({
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
    <Modal size="small" {...props} onClose={onClose}>
      <h3 className={styles.text}>{text}</h3>
      <div className={styles.panel}>
        <button
          className={styles.success}
          onClick={handleConfirm}
        >Yes
        </button>
        <button
          className={styles.failure}
          onClick={handleCancel}
        >No
        </button>
      </div>
    </Modal>
  );
};

export default memo(ModalConfirm);
