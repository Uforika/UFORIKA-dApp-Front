import { toast, ToastOptions } from 'react-toastify';
import React from 'react';
import styles from './toast.module.scss';

export const showToast = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default' | 'dark' | undefined,
  handleAction?: () => void,
  handleClose?: () => void,
): void => {
  let bool = false;
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    //  Here you can override Toast container, body and progress:
    bodyClassName: styles.toastBody, // <==
    className: styles.toastBody, // <==
    progressClassName: styles.toastBody, // <==
    type,
    onClose: () => {
      if (!bool) {
        if (handleAction) {
          handleAction();
        }
      }
    },
    closeButton: !handleClose ? false : (
      <button
        onClick={() => {
          handleClose();
          bool = true;
        }}
      >CLOSE
      </button>
    ),
  };
  toast(message, options);
};
