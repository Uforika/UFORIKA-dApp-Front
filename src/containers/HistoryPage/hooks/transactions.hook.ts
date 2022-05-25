import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@hooks/wallet.hooks';
import { TransactionFromHistoryType } from 'src/types/transaction.types';

export const useTransactions = () => {
  const { getTransactionHistory } = useWallet();
  const [transactions, setTransactions] = useState<TransactionFromHistoryType[] | undefined>();

  const [isLoading, setIsLoading] = useState(true);

  const getTransactions = useCallback(async () => {
    setIsLoading(true);

    const transactionsResponse = await getTransactionHistory();

    setTransactions(transactionsResponse);
    setIsLoading(false);
  }, [getTransactionHistory]);

  useEffect(() => {
    getTransactions().catch(() => null);
  }, [getTransactions]);

  return {
    transactions,
    refreshTransactions: getTransactions,
    isLoading,
  };
};
