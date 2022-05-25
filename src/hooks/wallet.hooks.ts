import {
  useCallback,
  useContext, useMemo,
} from 'react';
import { WalletContext } from '@contexts/wallet.context';
import BigNumber from 'bignumber.js';
import { TOKEN } from '@constants/token.constants';
import { GAS_PRICE } from '@constants/transaction.constants';
import { calculateFee } from '@helpers/balance.helper';
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
  const { getBalance } = useWallet();

  return getBalance(token);
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

    const fee = estimateGas ? calculateFee(estimateGas, GAS_PRICE, 18) : undefined;
    return fee;
  }, [address, data, tokenName, transferMethod]);

  getFee().catch(() => null);
  return useMemo(() => [sendTransaction, getFee()], [getFee, sendTransaction]);
};
