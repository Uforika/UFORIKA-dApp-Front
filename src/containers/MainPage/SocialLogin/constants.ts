import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
import { ICONS } from '@components/Icon/types';

export const SOCIAL_LOGIN = [
  {
    provider: LOGIN_PROVIDER.GOOGLE,
    icon: ICONS.LOGIN_GOOGLE,
  },
  {
    provider: LOGIN_PROVIDER.FACEBOOK,
    icon: ICONS.LOGIN_FACEBOOK,
  },
  {
    provider: LOGIN_PROVIDER.TWITTER,
    icon: ICONS.LOGIN_TWITTER,
  },
  {
    provider: LOGIN_PROVIDER.DISCORD,
    icon: ICONS.LOGIN_DISCORD_INACTIVE,
  },
  {
    provider: LOGIN_PROVIDER.REDDIT,
    icon: ICONS.LOGIN_REDDIT_INACTIVE,
  },
];
