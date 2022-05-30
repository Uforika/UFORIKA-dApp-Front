import { SyntheticEvent, useCallback, useState } from 'react';
import { InputProps } from 'semantic-ui-react';
import { TransactionFromHistoryType } from 'src/types/transaction.types';

export const useSearch = (transactions?: TransactionFromHistoryType[]) => {
  const [searchValue, setSearchValue] = useState('');

  const onSearch = useCallback((_: SyntheticEvent<HTMLElement>, data: InputProps) => {
    if (typeof data.value === 'string') {
      setSearchValue(data.value);
    }
  }, []);

  const onClearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  return {
    searchValue,
    onSearch,
    onClearSearch,
    searchedTransactions: transactions?.filter(({ from, to }) => from.includes(searchValue) || to.includes(searchValue)) || [],
  };
};
