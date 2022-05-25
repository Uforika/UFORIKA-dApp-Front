import React, { memo } from 'react';
import ButtonIcon from '@components/ButtonIcon';
import { ICONS } from '@components/Icon/constants';
import Header from '@components/Header';
import Popup from '@components/Popup';
import { copy } from '@helpers/copy.helper';
import styles from './styles.module.scss';

const UiKitIcons = () => {

  const handleCopy = (icon: string) => () => {
    copy(`ICONS.${ icon}`, 'Icon type copied!');
  };
  return (
    <div className={styles.wrap}>
      <Header className={styles.title} as="h2">Icons</Header>
      <div className={styles.grid}>
        {(Object.keys(ICONS) as Array<keyof typeof ICONS>)
          .map((icon) => (
            <Popup
              content={icon}
              position="bottom center"
              trigger={(
                <ButtonIcon
                  onClick={handleCopy(icon)}
                  key={icon}
                  type={ICONS[icon]}
                />
              )}
            />
          ))}
      </div>

    </div>
  );
};

export default memo(UiKitIcons);
