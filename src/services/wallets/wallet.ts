import { useMemo } from 'react';
import { ADAPTER_STATUS_TYPE } from '@web3auth/base';
import useWeb3Auth from '@services/wallets/web3auth.wallet';

 type WalletType = {
   sign: (messages: string, address: string) => Promise<string>,
   getBalance: (address: string) => Promise<string>,
   getAccounts: () => Promise<string[]>,
   getChainId: () => Promise<number>,
   logout: () => Promise<void>,
   connect: () => Promise<void>,
   walletStatus: ADAPTER_STATUS_TYPE | undefined,
 }

const useWalletService: () => WalletType = () => {
  const {
    status,
    getAccounts,
    getChainId,
    getBalance,
    sign,
    logout,
    connect,
  } = useWeb3Auth();

  return useMemo(() => ({
    sign,
    getBalance,
    getChainId,
    getAccounts,
    logout,
    connect,
    walletStatus: status,

  }), [connect, getAccounts, getBalance, getChainId, logout, sign, status]);

};

export default useWalletService;
