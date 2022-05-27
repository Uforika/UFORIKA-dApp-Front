import { useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { ADAPTER_STATUS_TYPE, UserInfo } from '@web3auth/base';
import useWeb3Auth from '@services/wallets/web3auth.wallet';
import { logError } from '@helpers/log.helper';
import { TOKEN, TOKEN_CONFIG } from '@constants/token.constants';
import { CONFIG } from '@constants/config.constants';
import { AbiItem } from 'web3-utils';
import { GAS_PRICE } from '@constants/transaction.constants';
import { getTransactionListFromAccount } from '@services/wallets/polygon-scan.wallet';
import { flatArrays } from '@helpers/array.helper';
import erc20AbiJson from '../../abi/erc20AbiJson.json';
import { TransferEventType } from '../../types/contract.types';
import { ConnectType, GetBalanceType, TransferMethodType } from '../../types/wallets.types';
import { TransactionFromHistoryType } from '../../types/transaction.types';

 type WalletType = {
   sign: (messages: string, address: string) => Promise<string>,
   getAccounts: () => Promise<string[]>,
   getChainId: () => Promise<number>,
   logout: () => Promise<void>,
   connect: ConnectType,
   walletStatus: ADAPTER_STATUS_TYPE | undefined,
   getBalance: GetBalanceType
   transferMethod: TransferMethodType
   getHistory: (address: string, startBlock: number | undefined) => Promise<TransactionFromHistoryType[]>
   userInfo: Partial<UserInfo>,
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
    web3,
    userInfo,
  } = useWeb3Auth();

  const transferMethod: TransferMethodType = useCallback(async <T>
  (tokenName: TOKEN, data: unknown[], from: string | null, method: 'send' | 'estimateGas') => {
    if (!web3 || !from) {
      return undefined;
    }
    const token = TOKEN_CONFIG[CONFIG.NETWORK][tokenName];
    const contract = new web3.eth.Contract(erc20AbiJson as AbiItem[], token.address, { gasPrice: GAS_PRICE });
    const transaction = (await contract.methods.transfer(...data)[method]({ from }) as T);
    return transaction;
  }, [web3]);

  const getHistory = async (address: string, startBlock: number | undefined) => {

    const [normalTransactionsResponse, internalTransactionsResponse] = await Promise.all([
      getTransactionListFromAccount('txlist', address, startBlock),
      getTransactionListFromAccount('txlistinternal', address, startBlock),
    ]);

    const normalTransactions: TransactionFromHistoryType[] = normalTransactionsResponse.result.map((transaction) => ({
      ...transaction,
      isNetworkCurrencyTransaction: transaction.input === '0x',
    }));

    const internalTransactions: TransactionFromHistoryType[] = internalTransactionsResponse.result.map((transaction) => ({
      ...transaction,
      isInternalTransaction: true,
    }));

    const tokensTransactionsResponse = await Promise.all([
      ...(Object.keys(TOKEN) as Array<keyof typeof TOKEN>)
        .map((tokenName) => getTransactionListFromAccount(
          'tokentx',
          address,
          startBlock,
          TOKEN_CONFIG[CONFIG.NETWORK][tokenName].address,
        )),
    ]);

    const tokensTransactions = tokensTransactionsResponse.map((tokenTransactionsResponse) => tokenTransactionsResponse.result);
    const flattedTokensTransactions: TransactionFromHistoryType[] = flatArrays<TransactionFromHistoryType>(tokensTransactions);

    const historyList = normalTransactions.concat(internalTransactions).concat(flattedTokensTransactions);
    return historyList;
  };

  const getBalance: GetBalanceType = useCallback((address, tokenName, setBalance) => {
    if (!web3WS || !address) {
      setBalance(undefined);
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
    transferMethod,
    getHistory,
    userInfo,
  }), [sign, getChainId, getAccounts, logout, connect, status, getBalance, transferMethod, userInfo]);

};

export default useWalletService;
