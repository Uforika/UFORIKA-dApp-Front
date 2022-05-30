import React, { FC, memo } from 'react';
import Header from '@components/Header';
import InputSearch from '@components/InputSearch';
import { useSearch } from '@hooks/search-input.hook';
import styles from './styles.module.scss';

const UiKitInputs: FC = () => {
  const { onClearSearch, searchValue, onSearch } = useSearch([]);

  return (
    <div className={styles.root}>
      <Header className={styles.title} as="h2">Inputs</Header>
      <InputSearch
        onClearSearch={onClearSearch}
        value={searchValue}
        onChange={onSearch}
        name="searchTransaction"
      />
    </div>
  );
};

export default memo(UiKitInputs);
