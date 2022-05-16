import React, {
  memo, FC, useCallback,
} from 'react';
import {
  Search as UISearch, SearchProps, StrictSearchProps,
} from 'semantic-ui-react';
import { ReactComponent as SearchIcon } from '@assets/images/icons/search.svg';
import { ReactComponent as CancelIcon } from '@assets/images/icons/cancel.svg';
import styles from './styles.module.scss';

type OmitTypes = 'onSearchChange'| 'input' | 'icon' | 'open' | 'category' | 'size'

type Props = Omit<StrictSearchProps, OmitTypes> & {
  onChange: (value: string | undefined) => void
}

const SearchInput: FC<Props> = ({ onChange, ...props }) => {
  const handleChange = useCallback((_, data: SearchProps) => {
    onChange(data.value);
  }, [onChange]);

  const handleClearInput = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={styles.searchContainer}>
      <UISearch
        icon={<SearchIcon />}
        onSearchChange={handleChange}
        open={false}
        {...props}
      />
      <button onClick={handleClearInput} className={styles.cancelButton}>
        <CancelIcon />
      </button>
    </div>
  );
};
export default memo(SearchInput);
