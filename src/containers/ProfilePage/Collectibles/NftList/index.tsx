import React, {
  FC, memo, useMemo, useState,
} from 'react';
import Dropdown from '@components/Dropdown';
import { DropdownProps } from 'semantic-ui-react';
import EmptyCard from './EmptyCard';
import NftCard from './NftCard';
import styles from './styles.module.scss';

type Props = {
  nftList: { name: string, type: string, nftImage: string }[]
  typeNftOptionList: { value: string, text: string }[]
}

const NftList: FC<Props> = ({ nftList, typeNftOptionList }) => {
  const [filterValue, setFilterValue] = useState('all');
  const handleFilterChange = (_: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {

    if (typeof data.value === 'string') setFilterValue(data.value);
  };

  const filteredNftList = useMemo(() => {
    if (filterValue === 'all') return nftList;
    return nftList.filter((nftItem) => nftItem.type === filterValue);
  }, [filterValue, nftList]);

  return (
    <div className={styles.wrapper}>
      {!nftList.length ? <EmptyCard /> : (
        <>
          <Dropdown
            label="Default"
            name="Filter:"
            placeholder="Choose item"
            options={typeNftOptionList}
            onChange={handleFilterChange}
            value={filterValue}
            className={styles.dropdown}
          />
          <ul className={styles.list}>
            {filteredNftList.map((nftItem) => <NftCard key={nftItem.name} {...nftItem} />)}
          </ul>
        </>
      )}

    </div>
  );
};

export default memo(NftList);
