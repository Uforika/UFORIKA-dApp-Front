import React, { FC, memo } from 'react';
import cn from 'classnames';
import Button, { ButtonProps } from '@components/Button';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import styles from './styles.module.scss';

type Props = ButtonProps & {
  type: ICONS,
  width?: number,
  height?: number,
}

const ButtonIcon: FC<Props> = ({
  width, height, type, className, ...props
}) => (
  <div className={cn(styles.wrap, className)}>
    <Button
      className={styles.buttonIcon}
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
