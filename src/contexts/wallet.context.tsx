import React, {
  createContext, FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { ADAPTER_STATUS_TYPE } from '@web3auth/base';
import useWalletService from '@services/wallets/wallet';
import { CONNECT_TYPE } from '@helpers/wallets.helper';

export type WalletContextType = {
  address: string | null,
  chainId: number | null,
  sign: (messages: string) => Promise<string>,
  getBalance: () => Promise<string>,
  walletAuth: CONNECT_TYPE,
  walletLogout: () => Promise<void>,
  walletStatus: ADAPTER_STATUS_TYPE | undefined,
}

const initialContextState = {
  address: null,
  chainId: null,
  sign: () => Promise.resolve(''),
  getBalance: () => Promise.resolve(''),
  isLoadingWallet: true,
  walletAuth: () => Promise.resolve(),
  walletLogout: () => Promise.resolve(),
  walletStatus: undefined,
};

export const WalletContext = createContext<WalletContextType>(initialContextState);

const WalletProvider: FC = ({ children }) => {
  const {
    sign,
    getBalance,
    getChainId,
    getAccounts,
    logout,
    connect,
    walletStatus,
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

  const getCurrentBalance = useCallback((): Promise<string> => {
    if (!address) {
      throw new Error('Not loaded web3');
    }

    return getBalance(address);
  }, [address, getBalance]);

  const getSign = useCallback((message: string): Promise<string> => {
    if (!address) {
      throw new Error('Not loaded web3');
    }

    return sign(message, address);
  }, [address, sign]);

  const walletProviderValue = useMemo(() => ({
    address,
    chainId,
    sign: getSign,
    walletAuth: connect,
    walletLogout: logout,
    walletStatus,
    getBalance: getCurrentBalance,
  }), [address, chainId, connect, getCurrentBalance, getSign, logout, walletStatus]);

  return (
    <WalletContext.Provider value={walletProviderValue}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider };
