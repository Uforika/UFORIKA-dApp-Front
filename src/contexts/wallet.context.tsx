import React, {
  createContext, FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { ADAPTER_STATUS_TYPE } from '@web3auth/base';
import useWalletService from '@services/wallets/wallet';
import { TRANSACTION_HISTORY } from '@constants/transaction-history.constants';
import { ConnectType, GetBalanceType } from '../types/wallets.types';
import { TransactionFromHistoryType } from '../types/transaction.types';

export type WalletContextType = {
  address: string | null,
  chainId: number | null,
  sign: (messages: string) => Promise<string>,
  walletAuth: ConnectType,
  walletLogout: () => Promise<void>,
  walletStatus: ADAPTER_STATUS_TYPE | undefined,
  getBalance: GetBalanceType
  getTransactionHistory: () => TransactionFromHistoryType[],
}

const initialContextState = {
  address: null,
  chainId: null,
  sign: () => Promise.resolve(''),
  isLoadingWallet: true,
  walletAuth: () => Promise.resolve(),
  walletLogout: () => Promise.resolve(),
  walletStatus: undefined,
  getBalance: () => undefined,
  getTransactionHistory: () => [],
};

export const WalletContext = createContext<WalletContextType>(initialContextState);

const WalletProvider: FC = ({ children }) => {
  const {
    sign,
    getChainId,
    getAccounts,
    logout,
    connect,
    walletStatus,
    getBalance,
  } = useWalletService();

  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const setUserAddress = useCallback(async () => {
    try {
      const userAddress = (await getAccounts())[0];
      setAddress(userAddress);
    } catch (error) {
      setAddress(null);
    }

  }, [getAccounts]);

  const setCurrentChainId = useCallback(async () => {
    try {
      const currentChainId = await getChainId();
      setChainId(currentChainId);
    } catch (error) {
      setChainId(null);
    }

  }, [getChainId]);

  useEffect(() => {
    setUserAddress().catch(() => null);
    setCurrentChainId().catch(() => null);
  }, [setCurrentChainId, setUserAddress]);

  const getSign = useCallback((message: string): Promise<string> => {
    if (!address) {
      throw new Error('Not loaded web3');
    }

    return sign(message, address);
  }, [address, sign]);

  const getTransactionHistory = useCallback(() => TRANSACTION_HISTORY, []);

  const walletProviderValue = useMemo(() => ({
    address,
    chainId,
    sign: getSign,
    walletAuth: connect,
    walletLogout: logout,
    walletStatus,
    getBalance,
    getTransactionHistory,
  }), [address, chainId, connect, getBalance, getTransactionHistory, getSign, logout, walletStatus]);

  return (
    <WalletContext.Provider value={walletProviderValue}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider };
