import React, { FC, memo, useMemo } from 'react';
import { StrictDropdownProps } from 'semantic-ui-react';
import Dropdown from '@components/Dropdown';
import DropdownCurrencyTrigger from './DropdownCurrencyTrigger';
import DropdownCurrencyMenu from './DropdownCurrencyMenu';
import { DropdownCurrencyItemType } from './types';
import useActiveSelection from './hooks/useActiveSelection';

type Props = StrictDropdownProps & {
  options: DropdownCurrencyItemType[],
  label?: string
  name: string
}

const DropdownCurrency: FC<Props> = ({
  options, label, name, placeholder,
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
        image={activeOption.imageSmall}
        value={activeOption.value}
      />
    );
  }, [activeOption]);

  return (
    <Dropdown
      label={label}
      name={name}
      placeholder={placeholder}
      trigger={activeTrigger}
    >
      <DropdownCurrencyMenu
        activeItemId={activeOptionId}
        onSelect={handleSelectOption}
        options={options}
      />
    </Dropdown>
  );
};

DropdownCurrency.defaultProps = {
  label: '',
};

export default memo(DropdownCurrency);
