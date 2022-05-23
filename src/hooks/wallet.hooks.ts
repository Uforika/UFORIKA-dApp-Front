import { useContext } from 'react';
import { WalletContext } from '@contexts/wallet.context';
import { TOKEN } from '@constants/token.constants';
import BigNumber from 'bignumber.js';

export const useWallet = () => {
  const {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory,
  } = useContext(WalletContext);

  return {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus, getTransactionHistory,
  };
};

export const useBalance = (token: TOKEN): BigNumber => {

  if (token === TOKEN.POLYGON) {
    return new BigNumber(200);
  }
  if (token === TOKEN.FORA) {
    return new BigNumber(100000);
  }
  return new BigNumber(0);
};
