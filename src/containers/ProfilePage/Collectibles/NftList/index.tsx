import React, { FC, memo } from 'react';
import Dropdown from '@components/Dropdown';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import { useDropdownFilter } from '@hooks/dropdown-filter.hooks';
import EmptyCard from './EmptyCard';
import NftCard from './NftCard';
import styles from './styles.module.scss';

type Props = {
  nftList: { name: string, type: string, nftImage: string }[]
  typeNftOptionList: { value: string, text: string }[]
}

const NftList: FC<Props> = ({ nftList, typeNftOptionList }) => {
  const { filterValue, filteredNftOptions, onFilterChange } = useDropdownFilter(nftList);

  return (
    <div className={styles.root}>
      {!nftList.length ? <EmptyCard /> : (
        <>
          <Dropdown
            label="Filter:"
            name="NftFilterDropdown"
            placeholder="Choose item"
            options={typeNftOptionList}
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
          {filteredNftOptions.length ? (
            <ul className={styles.list}>
              {filteredNftOptions.map((option) => <NftCard key={option.name} {...option} />)}
            </ul>
          ) : <EmptyCard />}

        </>
      )}
    </div>
  );
};

export default memo(NftList);
