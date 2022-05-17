import React, { FC, memo } from 'react';
import cn from 'classnames';
import { ReactComponent as IconSidebarLogout } from './assets/sidebarLogout.svg';
import { ReactComponent as IconSidebarProfile } from './assets/sidebarProfile.svg';
import { ReactComponent as IconSidebarHistory } from './assets/sidebarHistory.svg';
import { ReactComponent as IconSidebarTransfer } from './assets/sidebarTransfer.svg';
import { ReactComponent as IconModalFail } from './assets/fail.svg';
import { ReactComponent as IconModalSuccess } from './assets/success.svg';
import { ReactComponent as IconDropdownCurrencyBTC } from './assets/dropdownCurrencyBTC.svg';
import { ReactComponent as IconDropdownCurrencyUSDT } from './assets/dropdownCurrencyUSDT.svg';
import { ReactComponent as IconDropdownCurrencyRFUEL } from './assets/dropdownCurrencyRFUEL.svg';
import { ReactComponent as IconDropdownChevron } from './assets/dropdownChevron.svg';
import { ReactComponent as IconLoginMetamask } from './assets/loginMetamask.svg';
import { ReactComponent as IconLoginGoogle } from './assets/loginGoogle.svg';
import { ReactComponent as IconLoginTwitter } from './assets/loginTwitter.svg';
import { ReactComponent as IconLoginDiscord } from './assets/loginDiscord.svg';
import { ReactComponent as IconLoginFacebook } from './assets/loginFacebook.svg';
import { ReactComponent as IconLoginReddit } from './assets/loginReddit.svg';
import { ReactComponent as IconLoginTwitch } from './assets/loginTwitch.svg';
import { ReactComponent as IconLoginApple } from './assets/loginApple.svg';
import { ReactComponent as IconLoginLine } from './assets/loginLine.svg';
import { ReactComponent as IconLoginGithub } from './assets/loginGithub.svg';
import { ReactComponent as IconLoginKakao } from './assets/loginKakao.svg';
import { ReactComponent as IconLoginWeibo } from './assets/loginWeibo.svg';
import { ReactComponent as IconLoginLinkedin } from './assets/loginLinkedin.svg';
import { ReactComponent as IconLoginWechat } from './assets/loginWechat.svg';
import { ReactComponent as IconLoginMore } from './assets/loginMore.svg';
import { ReactComponent as IconUforikaLogo } from './assets/uforikaLogo.svg';
import { ReactComponent as IconWeb3AuthLogo } from './assets/web3AuthLogo.svg';
import { ReactComponent as IconForaCoinLogo } from './assets/foraCoinLogo.svg';
import { ReactComponent as IconMaticCoinLogo } from './assets/maticCoinLogo.svg';
import { ReactComponent as IconProfileQrCode } from './assets/profileQrCode.svg';
import { ReactComponent as IconProfileCopy } from './assets/profileCopy.svg';
import { ReactComponent as IconCloseQrCodeModal } from './assets/closeQrCodeModal.svg';
import { ReactComponent as IconProfileShield } from './assets/profileShield.svg';
import { ReactComponent as IconProfileUfoship } from './assets/profileUfoship.svg';

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
      case ICONS.FAIL:
        return <IconModalFail />;
      case ICONS.SUCCESS:
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
      case ICONS.LOGIN_DISCORD:
        return <IconLoginDiscord />;
      case ICONS.LOGIN_FACEBOOK:
        return <IconLoginFacebook />;
      case ICONS.LOGIN_REDDIT:
        return <IconLoginReddit />;
      case ICONS.LOGIN_TWITCH:
        return <IconLoginTwitch />;
      case ICONS.LOGIN_APPLE:
        return <IconLoginApple />;
      case ICONS.LOGIN_LINE:
        return <IconLoginLine />;
      case ICONS.LOGIN_GITHUB:
        return <IconLoginGithub />;
      case ICONS.LOGIN_KAKAO:
        return <IconLoginKakao />;
      case ICONS.LOGIN_LINKEDIN:
        return <IconLoginLinkedin />;
      case ICONS.LOGIN_WECHAT:
        return <IconLoginWechat />;
      case ICONS.LOGIN_WEIBO:
        return <IconLoginWeibo />;
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
      case ICONS.FORA_COIN_LOGO:
        return <IconForaCoinLogo />;
      case ICONS.MATIC_COIN_LOGO:
        return <IconMaticCoinLogo />;
      case ICONS.WEB3_AUTH_LOGO:
        return <IconWeb3AuthLogo />;
      case ICONS.PROFILE_QR_CODE:
        return <IconProfileQrCode />;
      case ICONS.PROFILE_COPY:
        return <IconProfileCopy />;
      case ICONS.CLOSE_QR_CODE_MODAL:
        return <IconCloseQrCodeModal />;
      case ICONS.PROFILE_SHIELD:
        return <IconProfileShield />;
      case ICONS.PROFILE_UFOSHIP:
        return <IconProfileUfoship />;

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
  width: undefined,
  height: undefined,
  className: undefined,
};

export default memo(Icon);
