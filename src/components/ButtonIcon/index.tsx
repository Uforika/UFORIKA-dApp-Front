import React, { FC, memo } from 'react';
import Button, { ButtonProps } from '@components/Button';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import styles from './styles.module.scss';

type Props = ButtonProps & {
  type: ICONS,
  width?: number,
  height?: number,
}

const ButtonIcon: FC<Props> = ({
  width, height, type, ...props
}) => (
  <div className={styles.wrap}>
    <Button
      icon={(
        <Icon
          width={width}
          height={height}
          type={type}
        />
      )}
      size="small"
      {...props}
    />
  </div>
);

ButtonIcon.defaultProps = {
  width: 24,
  height: undefined,
};

export default memo(ButtonIcon);
