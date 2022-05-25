import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@hooks/wallet.hooks';
import { TransactionFromHistoryType } from 'src/types/transaction.types';

export const useTransactions = () => {
  const { getTransactionHistory } = useWallet();
  const [transactions, setTransactions] = useState<TransactionFromHistoryType[] | undefined>();

  const getTransactions = useCallback(async () => {
    const transactionsResponse = await getTransactionHistory();

    setTransactions(transactionsResponse);
  }, [getTransactionHistory]);

  useEffect(() => {
    getTransactions().catch(() => null);
  }, [getTransactions]);

  return transactions;
};
