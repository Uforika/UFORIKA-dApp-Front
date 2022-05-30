import BigNumber from 'bignumber.js';
import { TOKEN, TOKEN_CONFIG } from '@constants/token.constants';
import { CONFIG } from '@constants/config.constants';
import { useTransfer, useWallet } from '@hooks/wallet.hooks';
import {
  useCallback, useEffect, useState,
} from 'react';
import { logError } from '@helpers/log.helper';
import { checkIsAmountValid } from '@helpers/transaction.helper';
import { useFailModal, useSuccessModal } from '@hooks/modals.hooks';
import { showToast } from '@components/Toast';
import { TOAST_SUCCESS } from '@constants/toast.constants';
import { TOAST_MASSAGE_SUCCESS } from '@constants/messages.constants';

type Props = {
  to?: string,
  amount?: string
  validateForm: (fee: BigNumber) => boolean
  clearForm: () => void
  token: TOKEN
}

const prepareAmountToTransaction = (to: string, token: TOKEN) => {
  const { decimals } = TOKEN_CONFIG[CONFIG.NETWORK_TYPE][CONFIG.NETWORK][token];

  return new BigNumber(to).multipliedBy(decimals).toString();
};

export const usePrepareTransfer = ({
  to, amount, clearForm, validateForm, token,
}: Props) => {
  const { checkIsAddressValid } = useWallet();
  const [isFormStage, setIsFormStage] = useState(true);
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const [fee, setFee] = useState<BigNumber>(new BigNumber(0));

  const [sendTransaction, getFee] = useTransfer(token, to, prepareAmountToTransaction(amount || '0', token));

  const [showSuccessModal] = useSuccessModal('Transaction was successfully sent', () => null);
  const [showFailModal] = useFailModal('Oops, something went wrong', () => null);

  const changeFormStage = (value?: boolean) => {
    if (typeof value !== 'undefined') {
      setIsFormStage(value);
      return;
    }

    setIsFormStage((prev) => !prev);
  };

  useEffect(() => {
    if (!checkIsAddressValid(to || '') || !checkIsAmountValid(amount)) {
      return;
    }

    getFee
      .then((value) => (value ? setFee(value) : null))
      .catch(() => null);

  }, [getFee, checkIsAddressValid, to, amount]);

  const submitTransfer = useCallback(() => {
    const isValidForm = validateForm(fee);

    if (isValidForm) {
      changeFormStage();
    }
  }, [validateForm, fee]);

  const confirmTransfer = useCallback(async () => {
    try {
      setIsTransactionInProgress(true);
      showToast(TOAST_MASSAGE_SUCCESS.TRANSACTION_PROGRESS, TOAST_SUCCESS);
      await sendTransaction();
      changeFormStage();
      showSuccessModal();
      clearForm();
    } catch (error) {
      logError(error);
      showFailModal();
    } finally {
      setIsTransactionInProgress(false);
    }
  }, [sendTransaction, showSuccessModal, showFailModal, clearForm]);

  return {
    isFormStage,
    submitTransfer,
    confirmTransfer,
    changeFormStage,
    fee,
    isTransactionInProgress,
  };
};
