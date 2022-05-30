import { ICONS } from '@components/Icon/constants';
import { TOKEN } from '@constants/token.constants';
import { StrictDropdownMenuProps, StrictDropdownItemProps } from 'semantic-ui-react';

export type DropdownCurrencyItemType = StrictDropdownItemProps & {
  id: TOKEN
  image: ICONS
}

export type DropdownCurrencyMenuType = StrictDropdownMenuProps & {
  options: DropdownCurrencyItemType[];
}
