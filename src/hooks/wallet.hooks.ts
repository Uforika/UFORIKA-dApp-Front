import {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import { WalletContext } from '@contexts/wallet.context';
import BigNumber from 'bignumber.js';
import { DEFAULT_TOKEN_DECIMAL, TOKEN } from '@constants/token.constants';
import { GAS_PRICE } from '@constants/transaction.constants';
import { calculateFee } from '@helpers/balance.helper';
import { DEFAULT_BALANCE_VALUE } from '@constants/wallets.constants';
import { checkIsAmountValid } from '@helpers/transaction.helper';
import { TransactionReceipt, useTransactionProps } from '../types/transaction.types';

export const useWallet = () => {
  const {
    address, sign, chainId,
    getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory, transferMethod, userInfo, checkIsAddressValid,
  } = useContext(WalletContext);

  return {
    address,
    sign,
    chainId,
    getBalance,
    walletAuth,
    walletLogout,
    walletStatus,
    getTransactionHistory,
    transferMethod,
    userInfo,
    checkIsAddressValid,
  };
};

export const useBalance = (token: TOKEN): BigNumber => {
  const { getBalance } = useWallet();
  const [balance, setBalance] = useState(DEFAULT_BALANCE_VALUE);

  useEffect(() => {
    setBalance(getBalance(token));
  }, [getBalance, token]);

  return balance;
};

export const useTransfer: useTransactionProps = (tokenName, recipientAddress, amount = '0') => {
  const { transferMethod, address, checkIsAddressValid } = useWallet();
  const data = useMemo(
    () => [recipientAddress, amount],
    [amount, recipientAddress],
  );

  const isRecipientAddressValid = checkIsAddressValid(recipientAddress || '');

  const sendTransaction = useCallback(
    () => transferMethod<TransactionReceipt>(tokenName, data, address, 'send'),
    [address, data, tokenName, transferMethod],
  );

  const getFee = useMemo(async () => {
    if (!isRecipientAddressValid || !checkIsAmountValid(amount)) {
      return undefined;
    }

    const estimateGas = await transferMethod<number>(tokenName, data, address, 'estimateGas');

    return estimateGas
      ? calculateFee(estimateGas, GAS_PRICE, DEFAULT_TOKEN_DECIMAL)
      : undefined;

  }, [address, data, tokenName, isRecipientAddressValid, transferMethod, amount]);

  return [sendTransaction, getFee];
};
