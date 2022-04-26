import React, { ButtonHTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { Loader } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  isLoading?: boolean,
  className?: string,
  disabled?: boolean,
}

const LinkButton: React.FC<Props> = ({
  className,
  disabled,
  children,
  isLoading,
  ...props
}) => (
  <button
    className={cn(
      styles.button,
      className,
    )}
    disabled={disabled || isLoading}
    type="button"
    {...props}
  >
    <div className={cn(styles.children)}>
      {isLoading && <div className={styles.iconLeft}><Loader className={styles.loader} active /></div>}
      {children}
    </div>
  </button>
);

LinkButton.defaultProps = {
  isLoading: false,
  className: '',
  disabled: false,
};

export default memo(LinkButton);
