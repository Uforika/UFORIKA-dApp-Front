import React, {
  ReactNode, memo, FC, useMemo, useCallback,
} from 'react';
import Input, { TInputProps } from '@components/Input';
import CurrencyDropdown from '@components/CurrencyInput/CurrencyDropdown';
import LinkButton from '@components/LinkButton';
import styles from './styles.module.scss';

type Props = TInputProps & {
  options: {value: string, content: string, totalAmount: string, icon: ReactNode}[],
  selectedOptionItem: string,
  setSelectedOptionItem: (selectedItem: string) => void,
  onChange: (value: string) => void,
  value: string,
}

const CurrencyInput: FC<Props> = ({
  options,
  selectedOptionItem,
  setSelectedOptionItem,
  onChange,
  value,
  name,
  label,
  ...props
}) => {

  const totalAmountCurrentValue = useMemo(() => {
    const currentOption = options.find((option) => option.value === selectedOptionItem);
    if (!currentOption) return '';
    return currentOption.totalAmount;
  }, [options, selectedOptionItem]);

  const handleChange = useCallback((inputValue: string) => {
    if ((/^[\d.,:]*$/.test(inputValue))) onChange(inputValue);
  }, [onChange]);

  return (
    <div>
      <div className={styles.topBlock}>
        {label && <label htmlFor={name} className={styles.label}>{label}</label>}
        <LinkButton onClick={() => handleChange(totalAmountCurrentValue)}>Send all</LinkButton>
      </div>
      <Input
        {...props}
        onChange={handleChange}
        value={value}
        name={name}
        rightContent={(
          <CurrencyDropdown
            options={options}
            selectedItem={selectedOptionItem}
            setSelectedItem={setSelectedOptionItem}
          />
        )}
      />
    </div>
  );
};

export default memo(CurrencyInput);
