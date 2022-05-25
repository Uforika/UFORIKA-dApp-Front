import { useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { ADAPTER_STATUS_TYPE } from '@web3auth/base';
import useWeb3Auth from '@services/wallets/web3auth.wallet';
import { logError } from '@helpers/log.helper';
import { TOKEN_CONFIG } from '@constants/token.constants';
import { CONFIG } from '@constants/config.constants';
import { AbiItem } from 'web3-utils';
import { DEFAULT_BALANCE_VALUE } from '@constants/wallets.constants';
import erc20AbiJson from '../../abi/erc20AbiJson.json';
import { TransferEventType } from '../../types/contract.types';
import { ConnectType, GetBalanceType } from '../../types/wallets.types';

 type WalletType = {
   sign: (messages: string, address: string) => Promise<string>,
   getAccounts: () => Promise<string[]>,
   getChainId: () => Promise<number>,
   logout: () => Promise<void>,
   connect: ConnectType,
   walletStatus: ADAPTER_STATUS_TYPE | undefined,
   getBalance: GetBalanceType
 }

const useWalletService: () => WalletType = () => {
  const {
    status,
    getAccounts,
    getChainId,
    sign,
    logout,
    connect,
    web3WS,
  } = useWeb3Auth();

  const getBalance: GetBalanceType = useCallback((address, tokenName, setBalance) => {
    if (!web3WS || !address) {
      setBalance(DEFAULT_BALANCE_VALUE);
      return;
    }
    const token = TOKEN_CONFIG[CONFIG.NETWORK][tokenName];
    const contract = new web3WS.eth.Contract(erc20AbiJson as AbiItem[], token.address);

    const updateBalance = async () => {
      try {
        const balanceOfAddress: number = await contract.methods.balanceOf(address).call();

        const bigNumberBalance = new BigNumber(balanceOfAddress).div(token.decimals);

        setBalance(bigNumberBalance);
      } catch (error) {
        logError(error);
      }
    };

    contract.events.Transfer().on('data', ({ returnValues }: TransferEventType) => {
      if ([returnValues.from, returnValues.to].includes(address)) {
        updateBalance().catch(() => null);
      }
    })
      .on('error', (error: unknown) => logError(error))
      .on('connected', () => {
        updateBalance().catch(() => null);
      });
  }, [web3WS]);

  return useMemo(() => ({
    sign,
    getChainId,
    getAccounts,
    logout,
    connect,
    walletStatus: status,
    getBalance,
  }), [sign, getChainId, getAccounts, logout, connect, status, getBalance]);

};

export default useWalletService;
