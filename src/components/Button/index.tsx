import React, { memo } from 'react';
import cn from 'classnames';
import { Loader, Button as UIButton, StrictButtonProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type PickedFromUITypes = 'primary' | 'secondary' | 'children' | 'onClick'| 'loading' | 'className' | 'disabled' | 'size' | 'icon' | 'as'

export type ButtonProps = Pick<StrictButtonProps, PickedFromUITypes> & {
  target?: string,
  rel?: string,
  href?: string
}

const Button: React.FC<ButtonProps> = ({
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

Button.defaultProps = {
  target: undefined,
  rel: undefined,
  href: undefined,
};

export default memo(Button);
