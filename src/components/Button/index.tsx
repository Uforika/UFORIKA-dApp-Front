import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Loader, Button as UIButton, StrictButtonProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type PickedTypes = 'primary' | 'secondary' | 'children' | 'onClick'| 'loading' | 'className' | 'disabled' | 'size'

type Props = Pick<StrictButtonProps, PickedTypes> & {
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
}

const Button: React.FC<Props> = ({
  className,
  disabled,
  children,
  iconLeft,
  iconRight,
  size = 'large',
  loading,
  ...props
}) => (
  <div className={styles.buttonWrapper}>
    <UIButton
      className={cn(
        styles.button,
        className,
      )}
      disabled={disabled || loading}
      size={size}
      {...props}
    >
      {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
      {loading && <div className={styles.iconLeft}><Loader className={styles.loader} active /></div>}
      {children}
      {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
    </UIButton>
  </div>
);

Button.defaultProps = {
  iconLeft: undefined,
  iconRight: undefined,
};

export default memo(Button);
