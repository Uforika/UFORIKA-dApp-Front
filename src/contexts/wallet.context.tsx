import React, {
  createContext, FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import BigNumber from 'bignumber.js';
import { ADAPTER_STATUS, ADAPTER_STATUS_TYPE, UserInfo } from '@web3auth/base';
import useWalletService from '@services/wallets/wallet';
import { getTransactionHistoryFromLocalStorage, setTransactionHistoryInLocalStorage } from '@helpers/transaction.helper';
import { DEFAULT_BALANCE_VALUE, mergeTransactionHistory } from '@constants/wallets.constants';
import { TOKEN } from '@constants/token.constants';
import { ConnectType, TransferMethodType } from '../types/wallets.types';
import { TransactionFromHistoryType } from '../types/transaction.types';

export type WalletContextType = {
  address: string | null,
  chainId: number | null,
  sign: (messages: string) => Promise<string>,
  walletAuth: ConnectType,
  walletLogout: () => Promise<void>,
  walletStatus: ADAPTER_STATUS_TYPE | undefined,
  getBalance: (token: TOKEN) => BigNumber,
  getTransactionHistory: () => Promise<TransactionFromHistoryType[] | undefined>,
  transferMethod: TransferMethodType,
  userInfo: Partial<UserInfo>,
}

const initialContextState = {
  address: null,
  chainId: null,
  sign: () => Promise.resolve(''),
  isLoadingWallet: true,
  walletAuth: () => Promise.resolve(),
  walletLogout: () => Promise.resolve(),
  walletStatus: undefined,
  getBalance: () => DEFAULT_BALANCE_VALUE,
  getTransactionHistory: () => Promise.resolve(undefined),
  transferMethod: () => Promise.resolve(undefined),
  userInfo: {},
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
    transferMethod,
    getHistory,
    userInfo,
  } = useWalletService();

  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<{ [key: string]: BigNumber } | undefined>(undefined);

  useEffect(() => {
    if ((!address && walletStatus === ADAPTER_STATUS.READY)
      || walletStatus === ADAPTER_STATUS.DISCONNECTED) {
      setBalance(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, walletStatus]);

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

  const getCurrentBalance = useCallback((token: TOKEN): BigNumber => {
    if (balance && balance[token]) {
      return balance[token];
    }
    const setValue = (value: BigNumber | undefined) => {
      if (value) {
        setBalance((currentBalance) => ({
          ...currentBalance,
          [token]: value,
        }));
        return;
      }
      setBalance((currentBalance) => currentBalance);
    };
    getBalance(address, token, setValue);
    return DEFAULT_BALANCE_VALUE;
  }, [address, balance, getBalance]);

  const getTransactionHistory = useCallback(async () => {

    if (!address) {
      return undefined;
    }

    const transactionHistoryFromLocalStorage = getTransactionHistoryFromLocalStorage();
    const startBlock = transactionHistoryFromLocalStorage ? Number(transactionHistoryFromLocalStorage.lastBlockNumber) + 1 : undefined;

    const resultList = await getHistory(address, startBlock);
    const historyList = resultList.map((result) => (result.status === '0' ? [] : result.result));

    const flattedHistoryList = historyList.reduce((acc, val) => acc.concat(val));
    const mergedTransaction = mergeTransactionHistory(flattedHistoryList);

    const transactions = transactionHistoryFromLocalStorage
      ? transactionHistoryFromLocalStorage.transactionHistory.concat(mergedTransaction) : mergedTransaction;

    const sortedTransactionHistory = transactions
      .sort((firstEl, secondEl) => Number(secondEl.timeStamp) - Number(firstEl.timeStamp));

    setTransactionHistoryInLocalStorage(sortedTransactionHistory);

    return sortedTransactionHistory;

  }, [address, getHistory]);

  const walletProviderValue = useMemo(() => ({
    address,
    chainId,
    sign: getSign,
    walletAuth: connect,
    walletLogout: logout,
    walletStatus,
    getBalance: getCurrentBalance,
    getTransactionHistory,
    transferMethod,
    userInfo,
  }), [address, chainId, getSign, connect, logout, walletStatus, getCurrentBalance, getTransactionHistory, transferMethod, userInfo]);

  return (
    <WalletContext.Provider value={walletProviderValue}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider };
