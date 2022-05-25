import { TransactionFromHistoryType, TransactionHistoryObjectType } from '../types/transaction.types';

export const setTransactionHistoryInLocalStorage = (transactionHistory: TransactionFromHistoryType[]) => {
  const lastTransaction = transactionHistory[0];
  const transactionHistoryObject: TransactionHistoryObjectType = { lastBlockNumber: lastTransaction.blockNumber, transactionHistory };
  localStorage.setItem('transactionHistoryObject', JSON.stringify(transactionHistoryObject));
};

export const getTransactionHistoryFromLocalStorage = (): TransactionHistoryObjectType | undefined => {
  const transactionsFromLocalStorage = localStorage.getItem('transactionHistoryObject');
  if (!transactionsFromLocalStorage) {
    return undefined;
  }
  return (JSON.parse(transactionsFromLocalStorage)) as TransactionHistoryObjectType;
};
