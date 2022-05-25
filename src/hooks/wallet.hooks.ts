import {
  useContext, useEffect, useState,
} from 'react';
import { WalletContext } from '@contexts/wallet.context';
import BigNumber from 'bignumber.js';
import { TOKEN } from '@constants/token.constants';
import { DEFAULT_BALANCE_VALUE } from '@constants/wallets.constants';

export const useWallet = () => {
  const {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory,
  } = useContext(WalletContext);

  return {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory,
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
