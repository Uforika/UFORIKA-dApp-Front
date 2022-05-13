import React, { FC, memo, useState } from 'react';
import useWallet from '@hooks/wallet';
import { ReactComponent as ChevronDownIcon } from '@assets/images/icons/chevron-down.svg';
import Button from '@components/Button';
import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
import { ReactComponent as GoogleIcon } from './icons/google.svg';
import { ReactComponent as FacebookIcon } from './icons/facebook.svg';
import { ReactComponent as TwitterIcon } from './icons/twitter.svg';
import { ReactComponent as DiscordIcon } from './icons/discord.svg';
import { ReactComponent as RedditIcon } from './icons/reddit.svg';
import styles from './styles.module.scss';

const SOCIAL_LOGIN = [
  {
    provider: LOGIN_PROVIDER.GOOGLE,
    icon: <GoogleIcon />,
  },
  {
    provider: LOGIN_PROVIDER.FACEBOOK,
    icon: <FacebookIcon />,
  },
  {
    provider: LOGIN_PROVIDER.TWITTER,
    icon: <TwitterIcon />,
  },
  {
    provider: LOGIN_PROVIDER.DISCORD,
    icon: <DiscordIcon />,
  },
  {
    provider: LOGIN_PROVIDER.REDDIT,
    icon: <RedditIcon />,
  },
];
const SocialLogin: FC = () => {
  const { walletAuth } = useWallet();
  const [isShowMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!isShowMore);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Social</p>
      <div className={styles.container}>
        <ul className={styles.list}>
          {SOCIAL_LOGIN.map((method, index) => index < 5 && (
            <li className={styles.item} key={method.provider}>
              <Button
                onClick={() => walletAuth(method.provider, undefined)}
                secondary
                className={styles.button}
              >
                {method.icon}
              </Button>
            </li>
          ))}
        </ul>
        <div>
          <button
            type="button"
            onClick={handleShowMore}
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(SocialLogin);
