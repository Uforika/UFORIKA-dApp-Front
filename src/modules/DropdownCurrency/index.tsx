import React, {
  ChangeEvent, FC, memo, useCallback, useMemo,
} from 'react';
import { StrictDropdownProps } from 'semantic-ui-react';
import Dropdown from '@components/Dropdown';
import DropdownCurrencyTrigger from './DropdownCurrencyTrigger';
import DropdownCurrencyMenu from './DropdownCurrencyMenu';
import useActiveSelection from './hooks/useActiveSelection';
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
}

const DropdownCurrency: FC<Props> = ({
  options, name, placeholder, value, label, onChange, panelText, size,
}) => {
  const { activeOptionId, handleSelectOption } = useActiveSelection(options);

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
    onChange?.(event.target.value);
  }, [onChange]);

  const handleSetCurrencyValue = useCallback(() => {
    if (activeOption) {
      onChange?.(activeOption.value as string);
    }
  }, [onChange, activeOption]);

  return (
    <>
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
          placeholder={placeholder}
          className={styles.input}
          value={value}
          name={name}
          id={name}
          onChange={handleChangeCurrencyValue}
        />
        <Dropdown className={styles.dropdown} size={size} name={name} trigger={activeTrigger}>
          <DropdownCurrencyMenu
            activeItemId={activeOptionId}
            onSelect={handleSelectOption}
            options={options}
          />
        </Dropdown>
      </div>
    </>
  );
};

DropdownCurrency.defaultProps = {
  value: undefined,
  onChange: undefined,
  label: undefined,
  panelText: undefined,
  size: undefined,
};

export default memo(DropdownCurrency);
