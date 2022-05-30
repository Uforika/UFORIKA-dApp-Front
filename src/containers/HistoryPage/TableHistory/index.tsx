import React, {
  FC, memo, useMemo, useRef,
} from 'react';
import { VariableSizeList as List } from 'react-window';
import { TransactionFromHistoryType } from 'src/types/transaction.types';
import useWindowSize from '@hooks/window-size.hooks';
import { useDropdownFilter } from '@hooks/dropdown-filter.hooks';
import { useSearch } from '@hooks/search-input.hook';
import Header from '@components/Header';
import Loader from '@components/Loader';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '@constants/ui.constants';
import { useWallet } from '@hooks/wallet.hooks';
import { SORT_OPTIONS } from '../constants/history.constants';
import TableRow from './TableHistoryRow';
import TableHistoryPanel from './TableHistoryPanel';
import TransactionEmptyHistory from './TransactionEmptyHistory';
import { filterTransactionByType, getItemSize, handleScroll } from './helpers';
import styles from './styles.module.scss';
import { TRANSACTION_FILER_TYPES } from '../types';

type Props = {
  className?: string,
  transactions?: TransactionFromHistoryType[],
  refreshTransactions: () => void
  isLoading: boolean
}

const TableHistory: FC<Props> = ({
  transactions, refreshTransactions, isLoading, className,
}) => {
  const { address } = useWallet();

  const { height } = useWindowSize();
  const scrollPanel = useRef<HTMLDivElement>(null);
  const {
    onSearch, searchedTransactions, onClearSearch, searchValue,
  } = useSearch(transactions);

  const { filterValue, onFilterChange } = useDropdownFilter(SORT_OPTIONS);
  const searchedAndFilteredTransactions = filterTransactionByType(searchedTransactions, filterValue as TRANSACTION_FILER_TYPES, address);
  const isEmptyHistory = !searchedAndFilteredTransactions.length;

  const renderList = useMemo(() => {
    if (!height) {
      return null;
    }

    return (
      <List
        height={height - FOOTER_HEIGHT - HEADER_HEIGHT - 1}
        itemCount={searchedAndFilteredTransactions.length}
        itemSize={getItemSize(searchedAndFilteredTransactions.length)}
        onScroll={handleScroll(scrollPanel)}
        width="100%"
      >
        {({ index, style }) => (
          <div className={styles.rowWrap} style={style}>
            <TableRow isLoading={isLoading} className={styles.row} transaction={searchedAndFilteredTransactions[index]} />
          </div>
        )}
      </List>
    );
  }, [height, isLoading, searchedAndFilteredTransactions]);

  const renderHead = () => (
    <div className={styles.head} ref={scrollPanel}>
      <Header className={styles.title} as="h1">
        Transaction History
      </Header>
      <TableHistoryPanel
        options={SORT_OPTIONS}
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        onClearSearch={onClearSearch}
        searchValue={searchValue}
        className={styles.panel}
        refreshTransactions={refreshTransactions}
      />
    </div>
  );

  if (!transactions || isLoading) {
    return (
      <div className={className}>
        {renderHead()}
        <Loader active />
      </div>
    );
  }

  return (
    <div className={className}>
      {renderHead()}
      {isEmptyHistory ? (
        <div className={styles.emptyTable}>
          <TransactionEmptyHistory withoutTransactions={!transactions.length} />
        </div>
      ) : renderList }
    </div>
  );
};

TableHistory.defaultProps = {
  className: '',
  transactions: undefined,
};

export default memo(TableHistory);
