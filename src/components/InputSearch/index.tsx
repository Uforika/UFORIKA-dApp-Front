import React, { FC, memo, useCallback } from 'react';
import { Input as UIInput, StrictInputProps } from 'semantic-ui-react';
import cn from 'classnames';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import ButtonIcon from '@components/ButtonIcon';
import { useFocus } from '@hooks/focus.hook';
import styles from './styles.module.scss';

type PickedTypes = 'label' | 'className' | 'disabled' | 'type' | 'icon' | 'iconPosition' | 'onChange'

 type InputSearch = Pick<StrictInputProps, PickedTypes> & {
   value?: string | number,
   name: string,
   placeholder?: string
   onClearSearch: () => void
 }

const InputSearch: FC<InputSearch> = ({
  className = '',
  value,
  name,
  onChange,
  placeholder,
  onClearSearch,
  ...props
}) => {
  const [searchRef, setSearchFocus] = useFocus();

  const handleClearSearch = useCallback(() => {
    onClearSearch();
    setSearchFocus();
  }, [onClearSearch, setSearchFocus]);

  return (
    <div className={cn(styles.root, className)}>
      <UIInput
        id={name}
        ref={searchRef}
        name={name}
        onChange={onChange}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        icon={(
          <Icon
            className={styles.icon}
            type={ICONS.SEARCH}
            width={16}
          />
        )}
        iconPosition="left"
        {...props}
      />
      {value && (
        <ButtonIcon
          onClick={handleClearSearch}
          className={styles.close}
          width={20}
          type={ICONS.CLOSE}
        />
      )}
    </div>
  );
};

InputSearch.defaultProps = {
  value: undefined,
  placeholder: 'Search',
};

export default memo(InputSearch);
