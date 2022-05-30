import { useCallback, useState } from 'react';
import BigNumber from 'bignumber.js';
import { FORM_FIELDS_ERRORS } from '@constants/messages.constants';
import { TOKEN } from '@constants/token.constants';
import { useWallet } from '@hooks/wallet.hooks';

type SendFormPops = {
  balanceFora: BigNumber,
  balancePolygon: BigNumber,
  activeOptionId?: string
}

const MINIMUM_SEND_LIMIT = 1;

export const useSendForm = ({ balanceFora, balancePolygon, activeOptionId }: SendFormPops) => {
  const { checkIsAddressValid } = useWallet();
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();

  const changeTo = (value: string) => {
    setErrors((prev) => ({ ...prev, to: '' }));
    setTo(value);
  };

  const changeAmount = (value: string) => {
    setErrors((prev) => ({ ...prev, amount: '' }));
    setAmount(value);
  };

  const clearForm = useCallback(() => {
    setErrors({});
    setTo(undefined);
    setAmount(undefined);
  }, []);

  const validateForm = useCallback((fee) => {
    let localErrors = {};

    const balance = activeOptionId === TOKEN.FORA ? balanceFora : balancePolygon;

    if (!to) {
      localErrors = { ...localErrors, to: FORM_FIELDS_ERRORS.REQUIRED };
    } else if (!checkIsAddressValid(to || '')) {
      localErrors = { ...localErrors, to: FORM_FIELDS_ERRORS.INVALID_ADDRESS };
    }

    if (!Number(amount)) {
      localErrors = {
        ...localErrors,
        amount: FORM_FIELDS_ERRORS.REQUIRED,
      };
    } else if (Number(amount) < MINIMUM_SEND_LIMIT) {
      localErrors = {
        ...localErrors,
        amount: `${FORM_FIELDS_ERRORS.MINIMUM_SEND_LIMIT.replace('[amount]', MINIMUM_SEND_LIMIT.toString())} ${activeOptionId || ''}`,
      };
    } else if (Number(amount) > balance.toNumber()) {
      localErrors = {
        ...localErrors,
        amount: FORM_FIELDS_ERRORS.NOT_ENOUGH_BALANCE,
      };
    } else if (balancePolygon.toNumber() < fee.toNumber()) {
      localErrors = {
        ...localErrors,
        amount: FORM_FIELDS_ERRORS.NOT_ENOUGH_FEE,
      };
    }

    setErrors(localErrors);

    return !Object.values(localErrors).filter((error) => !!error).length;

  }, [checkIsAddressValid, balanceFora, activeOptionId, balancePolygon, to, amount]);

  return {
    amount,
    changeAmount,
    to,
    changeTo,
    errors,
    validateForm,
    clearForm,
  };
};
