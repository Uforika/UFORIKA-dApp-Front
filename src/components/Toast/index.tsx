import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import styles from './styles.module.scss';

export const showToast = (
  message: string,
  type: 'success' | 'error'| 'warning',
  handleAction?: () => void,
): void => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    //  Here you can override Toast container, body and progress:
    bodyClassName: styles.toastBody,
    progressClassName: styles.toastProgress,
    type: 'dark',
    onClose: () => {
      if (handleAction) {
        handleAction();
      }
    },
  };

  const toastTitle = type === 'success' ? 'Success' : 'Error';

  const toastContent = () => (
    <>
      <Icon className={styles.icon} width={40} type={type === 'success' ? ICONS.SUCCESS : ICONS.FAIL} />
      <div>
        <p className={styles.type}>
          {toastTitle}
        </p>
        <p className={styles.message}>{message}</p>
      </div>
    </>
  );

  toast(toastContent(), options);
};
