import React, {
  memo, FC, useRef, ReactNode, useMemo,
} from 'react';
import Dropdown from '@components/Dropdown';
import DropdownMenu from '@components/Dropdown/DropdownMenu';
import DropdownItem from '@components/Dropdown/DropdownItem';
import { numberByComma } from '@helpers/currency.helper';
import styles from './styles.module.scss';

type Props = {
  options: {value: string, content: string, totalAmount: string, icon: ReactNode}[],
  selectedItem: string,
  setSelectedItem: (selectedItem: string) => void,
}

const CurrencyDropdown: FC<Props> = ({ options, selectedItem, setSelectedItem }) => {
  const triggerRef = useRef(null);

  const selectedValue = useMemo(() => {
    const currentValue = options.find((option) => option.value === selectedItem);
    if (!currentValue) return '';
    return <p className={styles.currency}>{currentValue.icon} {currentValue.content}</p>;
  }, [options, selectedItem]);

  return (
    <Dropdown
      value={selectedValue}
      className={styles.dropdownContainer}
    >
      <DropdownMenu
        triggerRef={triggerRef}
      >
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => setSelectedItem(option.value)}
            active={selectedItem === option.value}
          >
            <p className={styles.currency}>{option.icon} {option.content}</p>
            <span className={styles.totalAmount}>{numberByComma(option.totalAmount)}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

CurrencyDropdown.defaultProps = {

};

export default memo(CurrencyDropdown);
