import React, {
  FC, memo, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import useWallet from '@hooks/wallet';
import Button from '@components/Button';
import useWindowSize from '@hooks/window-size';
import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { showToast } from '@components/Toast';
import { TOAST_ERROR } from '@constants/toast.constants';
import { TOAST_MASSAGE_ERRORS } from '@constants/messages.constants';
import { SOCIAL_LOGIN } from './constants';
import styles from './styles.module.scss';

const SocialLogin: FC = () => {
  const { walletAuth } = useWallet();
  const [isShowMore, setShowMore] = useState(false);

  const socialIconListRef = useRef<HTMLUListElement>(null);

  const { width } = useWindowSize();
  const [hidden, setHidden] = useState<number[]>([]);

  useEffect(() => {
    setHidden([]);
    if (!socialIconListRef.current) return;
    const parentElementList = socialIconListRef.current.parentElement;
    if (!parentElementList) return;
    const listItemArray = Array.from(socialIconListRef.current.children);

    const newArray = [];
    let checkedSum = 0;

    for (let index = 0; index < listItemArray.length; index + 1) {
      checkedSum += listItemArray[index].clientWidth;

      if (checkedSum > (parentElementList.clientWidth - 45)) {
        newArray.push(index);
      }
    }
    setHidden(newArray);
  }, [width]);

  const handleShowMore = () => {
    setShowMore(!isShowMore);
  };

  const handlePressAuthorization = (provider: LOGIN_PROVIDER) => async () => {
    try {
      await walletAuth(provider, undefined);
    } catch (error) {
      showToast(TOAST_MASSAGE_ERRORS.CLOSE_MODAL, TOAST_ERROR);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Social</p>
      <div className={styles.container}>
        <ul ref={socialIconListRef} className={styles.list}>
          {SOCIAL_LOGIN.map(({ provider, icon }, index) => (
            <li className={cn(styles.item, styles.icon, { [styles.isHidden]: hidden.includes(index) })} key={provider}>
              <Button
                onClick={handlePressAuthorization(provider)}
                secondary
                className={styles.button}
              >
                <Icon width={24} type={icon} />
              </Button>
            </li>
          ))}
        </ul>
        {hidden.length && (
          <div>
            <button className={cn(styles.buttonMore, { [styles.isActive]: isShowMore })} type="button" onClick={handleShowMore}>
              <Icon width={28} type={ICONS.LOGIN_MORE} />
            </button>
          </div>
        )}
      </div>
      <ul className={cn(styles.list, styles.hiddenContainer, { [styles.isShowMore]: isShowMore })}>
        {hidden.map((socialId) => {
          const { provider, icon } = SOCIAL_LOGIN[socialId];
          return (
            <li
              className={cn(styles.item, styles.icon)}
              key={provider}
            >
              <Button
                onClick={handlePressAuthorization(provider)}
                secondary
                className={styles.button}
              >
                <Icon width={24} type={icon} />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(SocialLogin);
