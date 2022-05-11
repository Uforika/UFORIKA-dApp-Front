import React, {
  memo, FC, useCallback,
} from 'react';
import { InputOnChangeData } from 'semantic-ui-react';
import Input from '@components/Input';
import { ReactComponent as SearchIcon } from '@assets/images/icons/search.svg';
import { ReactComponent as CancelIcon } from '@assets/images/icons/cancel.svg';
import styles from './styles.module.scss';

type Props = {
  name: string,
  value: string,
  onChange: (value: string) => void,
}
const SearchInput: FC<Props> = ({
  onChange,
  value,
  ...props
}) => {

  const handleChange = useCallback((_, data: InputOnChangeData) => {
    onChange(data.value);
  }, [onChange]);

  const handleClearInput = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} />
      <Input className={styles.inputWrapper} onChange={handleChange} value={value} placeholder="Search" {...props} />
      {value && (
        <button onClick={handleClearInput} className={styles.cancelButton}>
          <CancelIcon />
        </button>
      )}
    </div>
  );
};

export default memo(SearchInput);
