import { ICONS } from '@components/Icon/types';
import { StrictDropdownMenuProps, StrictDropdownItemProps } from 'semantic-ui-react';

export type DropdownCurrencyItemType = StrictDropdownItemProps & {
  id: string
  image: ICONS
}

export type DropdownCurrencyMenuType = StrictDropdownMenuProps & {
  options: DropdownCurrencyItemType[];
}
