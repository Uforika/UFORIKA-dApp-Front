import React, { FC, memo } from 'react';
import cn from 'classnames';
import { ReactComponent as IconSidebarLogout } from './assets/sidebarLogout.svg';
import { ReactComponent as IconSidebarProfile } from './assets/sidebarProfile.svg';
import { ReactComponent as IconSidebarHistory } from './assets/sidebarHistory.svg';
import { ReactComponent as IconSidebarTransfer } from './assets/sidebarTransfer.svg';
import { ReactComponent as IconModalFail } from './assets/modalFail.svg';
import { ReactComponent as IconModalSuccess } from './assets/modalSuccess.svg';
import { ReactComponent as IconDropdownCurrencyBTC } from './assets/dropdownCurrencyBTC.svg';
import { ReactComponent as IconDropdownCurrencyUSDT } from './assets/dropdownCurrencyUSDT.svg';
import { ReactComponent as IconDropdownCurrencyRFUEL } from './assets/dropdownCurrencyRFUEL.svg';
import { ReactComponent as IconDropdownChevron } from './assets/dropdownChevron.svg';
import { ReactComponent as IconLoginMetamask } from './assets/loginMetamask.svg';
import { ReactComponent as IconLoginGoogle } from './assets/loginGoogle.svg';
import { ReactComponent as IconLoginTwitter } from './assets/loginTwitter.svg';
import { ReactComponent as IconLoginDiscordInactive } from './assets/loginDiscordInactive.svg';
import { ReactComponent as IconLoginFacebook } from './assets/loginFacebook.svg';
import { ReactComponent as IconLoginRedditInactive } from './assets/loginRedditInactive.svg';
import { ReactComponent as IconLoginMore } from './assets/loginMore.svg';
import { ReactComponent as IconUforikaLogo } from './assets/uforikaLogo.svg';
import { ReactComponent as IconForaCoin } from './assets/foraCoin.svg';

import { ICONS } from './types';
import styles from './styles.module.scss';

type Props = {
  type: ICONS;
  width?: number
  height?: number
  className?: string
}

const Icon: FC<Props> = ({
  type, width, height, className,
}) => {

  const getIconByType = () => {
    switch (type) {
      case ICONS.MODAL_FAIL:
        return <IconModalFail />;
      case ICONS.MODAL_SUCCESS:
        return <IconModalSuccess />;
      case ICONS.DROPDOWN_CHEVRON:
        return <IconDropdownChevron />;
      case ICONS.DROPDOWN_CURRENCY_BTC:
        return <IconDropdownCurrencyBTC />;
      case ICONS.DROPDOWN_CURRENCY_RFUEL:
        return <IconDropdownCurrencyRFUEL />;
      case ICONS.DROPDOWN_CURRENCY_USDT:
        return <IconDropdownCurrencyUSDT />;
      case ICONS.LOGIN_METAMASK:
        return <IconLoginMetamask />;
      case ICONS.LOGIN_GOOGLE:
        return <IconLoginGoogle />;
      case ICONS.LOGIN_TWITTER:
        return <IconLoginTwitter />;
      case ICONS.LOGIN_DISCORD_INACTIVE:
        return <IconLoginDiscordInactive />;
      case ICONS.LOGIN_FACEBOOK:
        return <IconLoginFacebook />;
      case ICONS.LOGIN_REDDIT_INACTIVE:
        return <IconLoginRedditInactive />;
      case ICONS.LOGIN_MORE:
        return <IconLoginMore />;
      case ICONS.SIDEBAR_TRANSFER:
        return <IconSidebarTransfer />;
      case ICONS.SIDEBAR_HISTORY:
        return <IconSidebarHistory />;
      case ICONS.SIDEBAR_PROFILE:
        return <IconSidebarProfile />;
      case ICONS.SIDEBAR_LOGOUT:
        return <IconSidebarLogout />;
      case ICONS.UFORIKA_LOGO:
        return <IconUforikaLogo />;
      case ICONS.UFORA_COIN:
        return <IconForaCoin />;

      default:
        return null;
    }
  };

  return (
    <div
      style={{ width, height: height || width }}
      className={cn(styles.wrap, className)}
    >
      {getIconByType()}
    </div>
  );

};

Icon.defaultProps = {
  width: 24,
  height: undefined,
  className: undefined,
};

export default memo(Icon);
