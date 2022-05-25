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
}

const TableHistoryPanel: FC<Props> = ({
  options, onFilterChange, filterValue,
  onClearSearch, searchValue, onSearch,
  className,
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
        className={styles.dropdown}
        isInlineView
        fluid={false}
        icon={(
          <Icon
            className="dropdownIcon"
            type={ICONS.DROPDOWN_CHEVRON_WHITE}
            width={16}
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
