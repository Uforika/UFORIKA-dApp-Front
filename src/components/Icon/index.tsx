import React, { FC, memo } from 'react';
import cn from 'classnames';
import { ReactComponent as IconSidebarLogout } from './assets/sidebarLogout.svg';
import { ReactComponent as IconSidebarProfile } from './assets/sidebarProfile.svg';
import { ReactComponent as IconSidebarHistory } from './assets/sidebarHistory.svg';
import { ReactComponent as IconSidebarTransfer } from './assets/sidebarTransfer.svg';
import { ReactComponent as IconModalFail } from './assets/fail.svg';
import { ReactComponent as IconModalSuccess } from './assets/success.svg';
import { ReactComponent as IconChevron } from './assets/chevron.svg';
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
import { ReactComponent as IconUforikaLogo } from './assets/uforikaLogo.svg';
import { ReactComponent as IconWeb3AuthLogo } from './assets/web3AuthLogo.svg';
import { ReactComponent as IconCoinFora } from './assets/coinFora.svg';
import { ReactComponent as IconCoinMatic } from './assets/coinMatic.svg';
import { ReactComponent as IconQrCode } from './assets/qrCode.svg';
import { ReactComponent as IconCopy } from './assets/copy.svg';
import { ReactComponent as IconClose } from './assets/close.svg';
import { ReactComponent as IconPolygonPowered } from './assets/polygonPowered.svg';
import { ReactComponent as IconUFOship } from './assets/UFOShip.svg';
import { ReactComponent as IconSearch } from './assets/search.svg';
import { ReactComponent as IconRefresh } from './assets/refresh.svg';
import { ReactComponent as IconTransactionSend } from './assets/transactionSend.svg';
import { ReactComponent as IconTransactionReceive } from './assets/transactionReceive.svg';
import { ReactComponent as IconLink } from './assets/link.svg';
import { ReactComponent as IconBack } from './assets/back.svg';

import { ICONS } from './constants';
import styles from './styles.module.scss';

type Props = {
  type: ICONS;
  width?: number
  height?: number
  className?: string
  isActive?: boolean
}

const Icon: FC<Props> = ({
  type, width, height, className, isActive,
}) => {

  const getIconByType = () => {
    switch (type) {
      case ICONS.FAIL:
        return <IconModalFail />;
      case ICONS.SUCCESS:
        return <IconModalSuccess />;
      case ICONS.CHEVRON:
        return <IconChevron />;
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
      case ICONS.COIN_FORA:
        return <IconCoinFora />;
      case ICONS.COIN_MATIC:
        return <IconCoinMatic />;
      case ICONS.WEB3_AUTH_LOGO:
        return <IconWeb3AuthLogo />;
      case ICONS.QR_CODE:
        return <IconQrCode />;
      case ICONS.COPY:
        return <IconCopy />;
      case ICONS.CLOSE:
        return <IconClose />;
      case ICONS.PROFILE_POLYGON_POWERED:
        return <IconPolygonPowered />;
      case ICONS.UFO_SHIP:
        return <IconUFOship />;
      case ICONS.SEARCH:
        return <IconSearch />;
      case ICONS.REFRESH:
        return <IconRefresh />;
      case ICONS.LINK:
        return <span className="filled"><IconLink /></span>;
      case ICONS.TRANSACTION_SEND:
        return <IconTransactionSend />;
      case ICONS.TRANSACTION_RECEIVE:
        return <IconTransactionReceive />;
      case ICONS.BACK:
        return <IconBack />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{ width, height: height || width }}
      className={cn(styles.wrap, className, { [styles.active]: isActive })}
    >
      {getIconByType()}
    </div>
  );

};

Icon.defaultProps = {
  width: undefined,
  height: undefined,
  className: undefined,
  isActive: false,
};

export default memo(Icon);
