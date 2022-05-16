import React, { memo } from 'react';
import cn from 'classnames';
import { Loader, Button as UIButton, StrictButtonProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type PickedTypes = 'primary' | 'secondary' | 'children' | 'onClick'| 'loading' | 'className' | 'disabled' | 'size' | 'icon'

type Props = Pick<StrictButtonProps, PickedTypes>

const Button: React.FC<Props> = ({
  className,
  children,
  loading,
  size = 'large',
  icon,
  ...props
}) => (
  <div className={styles.buttonWrapper}>
    <UIButton
      className={cn(styles.button, className, { [styles.icon]: icon })}
      size={size}
      {...props}
    >
      {loading && <Loader className={styles.loader} active />}
      {children}
      {icon}
    </UIButton>
  </div>
);

export default memo(Button);
