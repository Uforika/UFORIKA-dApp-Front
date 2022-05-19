import { showToast } from '@components/Toast';
import { TOAST_MASSAGE_SUCCESS } from '@constants/messages.constants';
import { TOAST_SUCCESS } from '@constants/toast.constants';

export const copy = (value: string | null | undefined) => {
  if (!value) {
    return;
  }

  navigator?.clipboard.writeText(value).then(() => {
    showToast(TOAST_MASSAGE_SUCCESS.COPY, TOAST_SUCCESS);
  }).catch(() => null);
};
