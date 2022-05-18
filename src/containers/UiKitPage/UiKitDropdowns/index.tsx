import React, { memo, useState } from 'react';
import Dropdown from '@components/Dropdown';
import DropdownCurrency from 'src/modules/DropdownCurrency';
import { currencyOptions, options } from './data';
import styles from './styles.module.scss';

const UiKitDropdowns = () => {
  const [currencyValue, setCurrencyValue] = useState<string>();
  const handleChangeCurrencyValue = (value: string) => {
    setCurrencyValue(value);
  };
  return (
    <div className={styles.wrap}>
      <h2>Dropdowns</h2>
      <div>
        <div className={styles.dropdown}>
          <DropdownCurrency
            label="Currency"
            name="currency"
            placeholder="Choose item"
            options={currencyOptions}
            panelText="Send All"
            onChange={handleChangeCurrencyValue}
            value={currencyValue}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            label="Default"
            name="Default"
            placeholder="Choose item"
            options={options}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            search
            label="Search"
            name="Search"
            placeholder="Choose item"
            options={options}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            search
            disabled
            label="Disabled"
            name="Disabled"
            placeholder="Choose item"
            options={options}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            search
            error
            label="Error"
            name="Error"
            placeholder="Choose item"
            options={options}
            errorMessage="Error message"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(UiKitDropdowns);
