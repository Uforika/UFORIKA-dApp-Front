import { ICONS } from '@components/Icon/types';
import { PATH_HISTORY, PATH_PROFILE, PATH_TRANSFER } from '@constants/routes.constants';

export const LEFT_MENU_LIST = [
  {
    label: 'Profile',
    href: PATH_PROFILE,
    icon: ICONS.SIDEBAR_PROFILE,
  },
  {
    label: 'Transfer',
    href: PATH_TRANSFER,
    icon: ICONS.SIDEBAR_TRANSFER,
  },
  {
    label: 'History',
    href: PATH_HISTORY,
    icon: ICONS.SIDEBAR_HISTORY,
  },
];
