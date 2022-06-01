import React, { FC, memo, SyntheticEvent } from 'react';
import { DropdownProps, InputProps, StrictDropdownProps } from 'semantic-ui-react';
import cn from 'classnames';
import Dropdown from '@components/Dropdown';
import { ICONS } from '@components/Icon/constants';
import Icon from '@components/Icon';
import InputSearch from '@components/InputSearch';
import ButtonIcon from '@components/ButtonIcon';
import Popup from '@components/Popup';
import styles from './styles.module.scss';

type Props = StrictDropdownProps & {
  filterValue: string
  onClearSearch: () => void
  onFilterChange: (_: SyntheticEvent<HTMLElement>, data: DropdownProps) => void
  searchValue?: string
  onSearch: (_: SyntheticEvent<HTMLElement>, data: InputProps) => void
  refreshTransactions: () => void
}

const TableHistoryPanel: FC<Props> = ({
  options, onFilterChange, filterValue,
  onClearSearch, searchValue, onSearch,
  className, refreshTransactions,
}) => {

  const isEmptyHistory = false;

  return (
    <div className={cn(className, styles.root)}>
      <Dropdown
        label="Filter:"
        name="NftFilterDropdown"
        placeholder="All types"
        options={options}
        onChange={onFilterChange}
        value={filterValue}
        isInlineView
        fluid={false}
        icon={(
          <Icon
            className="dropdownIcon"
            type={ICONS.CHEVRON}
            width={16}
            isActive
          />
        )}
      />

      <InputSearch
        onClearSearch={onClearSearch}
        value={searchValue}
        onChange={onSearch}
        name="searchTransaction"
        className={styles.search}
        placeholder="Search by address"
      />
      {!isEmptyHistory && (
        <Popup
          trigger={(
            <ButtonIcon
              width={20}
              onClick={refreshTransactions}
              className={styles.refresh}
              type={ICONS.REFRESH}
            />
          )}
          position="bottom left"
          content="Refresh"
        />
      )}
    </div>
  );
};

TableHistoryPanel.defaultProps = {
  searchValue: undefined,
};

export default memo(TableHistoryPanel);
