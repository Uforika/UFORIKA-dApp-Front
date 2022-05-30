import { showToast } from '@components/Toast';
import { TOAST_SUCCESS } from '@constants/toast.constants';

export const copy = (value: string | null | undefined, message: string) => {
  if (!value) {
    return;
  }

  navigator?.clipboard.writeText(value).then(() => {
    showToast(message, TOAST_SUCCESS);
  }).catch(() => null);
};
