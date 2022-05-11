import React, {
  ReactNode, memo, FC, useCallback,
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

  const handleSendAll = useCallback(() => {
    const currentOption = options.find((option) => option.value === selectedOptionItem);
    if (!currentOption) {
      onChange('');
      return;
    }
    onChange(currentOption.totalAmount);
  }, [onChange, options, selectedOptionItem]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if ((/^[\d.,:]*$/.test(event.target.value))) onChange(event.target.value);
  }, [onChange]);

  return (
    <div>
      <div className={styles.topBlock}>
        {label && <label htmlFor={name} className={styles.label}>{label}</label>}
        <LinkButton onClick={handleSendAll}>Send all</LinkButton>
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
