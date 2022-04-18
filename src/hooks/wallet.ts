import { useContext } from 'react';
import { WalletContext } from '@contexts/wallet.context';

const useWallet = () => {
  const {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus,
  } = useContext(WalletContext);
  return {
    address, sign, chainId, getBalance, walletAuth, walletLogout, walletStatus,
  };
};

export default useWallet;
