import {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import { WalletContext } from '@contexts/wallet.context';
import BigNumber from 'bignumber.js';
import { TOKEN } from '@constants/token.constants';
import { DEFAULT_BALANCE_VALUE } from '@constants/wallets.constants';
import { GAS_PRICE } from '@constants/transaction.constants';
import { TransactionReceipt, useTransactionProps } from '../types/transaction.types';

export const useWallet = () => {
  const {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory, transferMethod,
  } = useContext(WalletContext);

  return {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory, transferMethod,
  };
};

export const useBalance = (token: TOKEN): BigNumber => {
  const [balance, setBalance] = useState<BigNumber>(DEFAULT_BALANCE_VALUE);
  const { getBalance, address } = useWallet();

  useEffect(() => {
    getBalance(address, token, setBalance);
  }, [address, getBalance, token]);

  return balance;
};

export const useTransfer: useTransactionProps = (tokenName, recipientAddress, amount) => {
  const { transferMethod, address } = useWallet();
  const data = useMemo(() => [recipientAddress, amount], [amount, recipientAddress]);

  const sendTransaction = useCallback(
    () => transferMethod<TransactionReceipt>(tokenName, data, address, 'send'),
    [address, data, tokenName, transferMethod],
  );

  const getFee = useCallback(async () => {
    const estimateGas = await transferMethod<number>(tokenName, data, address, 'estimateGas');

    const fee = estimateGas ? new BigNumber(estimateGas).multipliedBy(GAS_PRICE).div(10 ** 18) : undefined;
    return fee;
  }, [address, data, tokenName, transferMethod]);

  getFee().catch(() => null);
  return useMemo(() => [sendTransaction, getFee()], [getFee, sendTransaction]);
};
