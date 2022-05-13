import { ReactNode } from 'react';
import { StrictDropdownMenuProps, StrictDropdownItemProps } from 'semantic-ui-react';

export type DropdownCurrencyItemType = StrictDropdownItemProps & {
  id: string
  imageSmall: ReactNode
}

export type DropdownCurrencyMenuType = StrictDropdownMenuProps & {
  options: DropdownCurrencyItemType[];
}
