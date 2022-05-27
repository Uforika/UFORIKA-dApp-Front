import React, {
  memo, useCallback, useMemo, useState,
} from 'react';
import Dropdown from '@components/Dropdown';
import Header from '@components/Header';
import DropdownCurrency from 'src/modules/DropdownCurrency';
import { getCurrencyOptions } from '@containers/TransferPage/TransferSend/helpers/transfer.helpers';
import useDropdownCurrencySelection from '@hooks/dropdown-currency-selection.hook';
import styles from './styles.module.scss';

const UiKitDropdowns = () => {
  const [currencyValue, setCurrencyValue] = useState<string>();
  const handleChangeCurrencyValue = useCallback((value: string) => {
    setCurrencyValue(value);
  }, []);

  const currencyOptions = useMemo(() => getCurrencyOptions({
    balanceFora: '0',
    balancePolygon: '0',
  }), []);

  const { activeOptionId, onSelectOption } = useDropdownCurrencySelection(currencyOptions);

  return (
    <div className={styles.wrap}>
      <Header className={styles.title} as="h2">Dropdowns</Header>
      <div className={styles.grid}>
        <DropdownCurrency
          label="Currency"
          name="currency"
          placeholder="Choose item"
          options={currencyOptions}
          panelText="Send All"
          onChange={handleChangeCurrencyValue}
          value={currencyValue}
          activeOptionId={activeOptionId}
          onSelectOption={onSelectOption}
        />
        <DropdownCurrency
          label="Currency"
          name="currency"
          placeholder="Choose item"
          options={currencyOptions}
          panelText="Send All"
          onChange={handleChangeCurrencyValue}
          value={currencyValue}
          activeOptionId={activeOptionId}
          onSelectOption={onSelectOption}
          size="big"
        />
        <Dropdown
          label="Default"
          name="Default"
          placeholder="Choose item"
          options={currencyOptions}
        />
        <Dropdown
          search
          label="Search"
          name="Search"
          placeholder="Choose item"
          options={currencyOptions}
        />
        <Dropdown
          search
          disabled
          label="Disabled"
          name="Disabled"
          placeholder="Choose item"
          options={currencyOptions}
        />
        <Dropdown
          search
          error
          label="Error"
          name="Error"
          placeholder="Choose item"
          options={currencyOptions}
          errorMessage="Error message"
        />
      </div>
    </div>
  );
};

export default memo(UiKitDropdowns);
