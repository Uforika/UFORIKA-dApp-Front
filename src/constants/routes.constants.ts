import { ReactComponent as UserIcon } from '@assets/images/icons/menu/user.svg';
import { ReactComponent as RepeatIcon } from '@assets/images/icons/menu/repeat.svg';
import { ReactComponent as CalendarIcon } from '@assets/images/icons/menu/calendar.svg';

export const PATH_INDEX = '/';
export const PATH_AUTH = '/auth';

export const PATH_PROFILE = '/profile';
export const PATH_TRANSFER = '/transfer';
export const PATH_HISTORY = '/history';
export const PATH_PRIVACY = 'https://policies.google.com/privacy';
export const PATH_TERMS = 'https://policies.google.com/terms';

export const MENU_LIST_AUTH = [
  {
    label: 'Profile',
    href: PATH_PROFILE,
    icon: UserIcon,
  },
  {
    label: 'Transfer',
    href: PATH_TRANSFER,
    icon: RepeatIcon,
  },
  {
    label: 'History',
    href: PATH_HISTORY,
    icon: CalendarIcon,
  },
];
