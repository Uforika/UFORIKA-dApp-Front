import React, {
  ChangeEvent, FC, memo, useCallback, useMemo,
} from 'react';
import { DropdownItemProps, StrictDropdownProps } from 'semantic-ui-react';
import cn from 'classnames';
import Dropdown from '@components/Dropdown';
import { TOKEN } from '@constants/token.constants';
import DropdownCurrencyTrigger from './DropdownCurrencyTrigger';
import DropdownCurrencyMenu from './DropdownCurrencyMenu';
import { DropdownCurrencyItemType } from './types';
import styles from './styles.module.scss';

type Props = Omit<StrictDropdownProps, 'onChange' | 'value' | 'options'> & {
  options: DropdownCurrencyItemType[],
  name: string
  onChange?: (value: string) => void
  value?: string | number
  label?: string
  panelText?: string
  size?: 'small' | 'big'
  pattern?: string
  errorMessage?: string
  activeOptionId: string | null
  onSelectOption: (id: TOKEN) => void
}

const DropdownCurrency: FC<Props> = ({
  options, name, placeholder, value, label, activeOptionId,
  onChange, panelText, size, pattern, errorMessage, onSelectOption,
}) => {
  const activeOption = options.find(({ id }) => id === activeOptionId);

  const activeTrigger = useMemo(() => {
    if (!activeOption) {
      return null;
    }

    return (
      <DropdownCurrencyTrigger
        text={activeOption.text}
        image={activeOption.image}
      />
    );
  }, [activeOption]);

  const handleChangeCurrencyValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.validity.valid ? event.target.value : value?.toString() || '');
  }, [onChange, value]);

  const handleSetCurrencyValue = useCallback(() => {
    if (activeOption) {
      onChange?.(activeOption.value as string);
    }
  }, [onChange, activeOption]);

  const handleSelectOption = (_event: React.MouseEvent<Element, MouseEvent>, { id }: DropdownItemProps) => {
    onSelectOption(id as TOKEN);
  };

  return (
    <div>
      <div className={styles.panel}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
        {panelText && (
          <button
            onClick={handleSetCurrencyValue}
            className={styles.panelText}
          >{panelText}
          </button>
        )}
      </div>
      <div className={styles.wrap}>
        <input
          pattern={pattern}
          placeholder={placeholder}
          className={cn(styles.input, styles[size || ''])}
          value={value}
          name={name}
          id={name}
          onChange={handleChangeCurrencyValue}
        />
        <Dropdown
          error={!!errorMessage}
          errorMessage={errorMessage}
          className={styles.dropdown}
          size={size}
          name={name}
          trigger={activeTrigger}
        >
          <DropdownCurrencyMenu
            activeItemId={activeOptionId}
            onSelect={handleSelectOption}
            options={options}
          />
        </Dropdown>
      </div>
    </div>
  );
};

DropdownCurrency.defaultProps = {
  value: undefined,
  onChange: undefined,
  label: undefined,
  panelText: undefined,
  size: undefined,
  pattern: undefined,
  errorMessage: undefined,
};

export default memo(DropdownCurrency);
