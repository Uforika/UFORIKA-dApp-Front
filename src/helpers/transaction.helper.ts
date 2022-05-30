import { LOCAL_STORAGE_TRANSACTION_HISTORY_KEY } from '@constants/transaction.constants';
import { TransactionFromHistoryType, TransactionHistoryObjectType } from '../types/transaction.types';

export const setTransactionHistoryInLocalStorage = (transactionHistory: TransactionFromHistoryType[]) => {
  const lastTransaction = transactionHistory[0];

  if (!lastTransaction) {
    return;
  }

  const transactionHistoryObject: TransactionHistoryObjectType = { lastBlockNumber: lastTransaction.blockNumber, transactionHistory };
  localStorage.setItem(LOCAL_STORAGE_TRANSACTION_HISTORY_KEY, JSON.stringify(transactionHistoryObject));
};

export const getTransactionHistoryFromLocalStorage = (): TransactionHistoryObjectType | undefined => {
  const transactionsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_TRANSACTION_HISTORY_KEY);
  if (!transactionsFromLocalStorage) {
    return undefined;
  }
  return (JSON.parse(transactionsFromLocalStorage)) as TransactionHistoryObjectType;
};

export const checkIsAmountValid = (amount: string | undefined) => {
  if (!amount) {
    return false;
  }

  return !!Number(amount) && Number(amount) !== 0;
};
