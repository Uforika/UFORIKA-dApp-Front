import React, {
  FC, memo, useMemo, useRef,
} from 'react';
import { VariableSizeList as List } from 'react-window';
import { TransactionFromHistoryType } from 'src/types/transaction.types';
import Header from '@components/Header';
import useWindowSize from '@hooks/window-size.hooks';
import { useDropdownFilter } from '@hooks/dropdown-filter.hooks';
import { useSearch } from '@hooks/search-input.hook';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '@constants/ui.constants';
import Loader from '@components/Loader';
import TableRow from './TableHistoryRow';
import TableHistoryPanel from './TableHistoryPanel';
import TransactionEmptyHistory from './TransactionEmptyHistory';
import { getItemSize, handleScroll } from './helpers';
import styles from './styles.module.scss';

const sortOptions = [{
  type: 'all',
  value: 'All',
  name: 'All types',
  text: 'All types',
},
{
  type: 'someType',
  value: 'SomeType',
  name: 'Some type',
  text: 'Some type',
},
];

type Props = {
  className?: string,
  transactions?: TransactionFromHistoryType[]
}

const TableHistory: FC<Props> = ({ transactions, className }) => {
  const { height } = useWindowSize();
  const scrollPanel = useRef<HTMLDivElement>(null);
  const {
    onSearch, searchedTransactions, onClearSearch, searchValue,
  } = useSearch(transactions);

  const { filterValue, onFilterChange } = useDropdownFilter(sortOptions);
  const isEmptyHistory = !searchedTransactions.length;

  const renderList = useMemo(() => {
    if (!height) {
      return null;
    }

    return (
      <List
        height={height - FOOTER_HEIGHT - HEADER_HEIGHT}
        itemCount={searchedTransactions.length}
        itemSize={getItemSize(searchedTransactions.length)}
        onScroll={handleScroll(scrollPanel)}
        width="100%"
        className={styles.list}
      >
        {({ index, style }) => (
          <div className={styles.rowWrap} style={style}>
            <TableRow className={styles.row} transaction={searchedTransactions[index]} />
          </div>
        )}
      </List>
    );
  }, [height, searchedTransactions]);

  const renderHead = () => (
    <div className={styles.head} ref={scrollPanel}>
      <Header className={styles.title} as="h1">
        Transaction History
      </Header>
      <TableHistoryPanel
        options={sortOptions}
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        onClearSearch={onClearSearch}
        searchValue={searchValue}
        className={styles.panel}
      />
    </div>
  );

  if (!transactions) {
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
          <TransactionEmptyHistory />
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
