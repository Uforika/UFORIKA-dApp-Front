import React, {
  FC, memo, useMemo, MouseEvent,
} from 'react';
import { Dropdown as UIDropdown, DropdownItemProps } from 'semantic-ui-react';
import DropdownCurrencyItem from '../DropdownCurrencyItem';
import { DropdownCurrencyMenuType } from '../types';

type Props = DropdownCurrencyMenuType & {
  onSelect: (event: MouseEvent, data: DropdownItemProps) => void
  activeItemId: string | null
}

const DropdownCurrencyMenu: FC<Props> = ({
  options, activeItemId, onSelect, ...props
}) => {
  const renderItems = useMemo(() => (
    options.map(({
      image, text, value, id,
    }) => (
      <DropdownCurrencyItem
        key={id}
        image={image}
        text={text}
        active={activeItemId === id}
        value={value}
        id={id}
        onClick={onSelect}
      />
    ))
  ), [options, activeItemId, onSelect]);

  return (
    <UIDropdown.Menu {...props}>
      {renderItems}
    </UIDropdown.Menu>
  );
};

export default memo(DropdownCurrencyMenu);
