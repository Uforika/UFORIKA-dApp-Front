import React, { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cn from 'classnames';
import { Loader } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: 'primary'| 'secondary',
  size?: 'medium'| 'large',
  iconLeft?: ReactNode,
  isLoading?: boolean,
  iconRight?: ReactNode,
  className?: string,
  disabled?: boolean,
}

const Button: React.FC<Props> = ({
  className,
  disabled,
  children,
  iconLeft,
  iconRight,
  styleType = 'primary',
  size = 'large',
  type,
  isLoading,
  ...props
}) => (
  <button
    className={cn(
      styles.button,
      styles[styleType],
      styles[size],
      className,
    )}
    disabled={disabled || isLoading}
    type={type ?? 'button'}
    {...props}
  >
    <div className={cn(styles.children)}>
      {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
      {isLoading && <div className={styles.iconLeft}><Loader className={styles.loader} active /></div>}
      {children}
      {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
    </div>
  </button>
);

Button.defaultProps = {
  iconLeft: undefined,
  iconRight: undefined,
  isLoading: false,
  className: '',
  disabled: false,
  size: 'large',
  styleType: 'primary',
};

export default memo(Button);
