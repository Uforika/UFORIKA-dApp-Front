/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import styles from './radio-button.module.scss';

type Props = {
  className?: string,
  checked?: boolean,
  disabled?: boolean,
  children?: ReactNode,
  onChange: () => void,
}

const RadioButton = ({
  className, checked, children, disabled, onChange, ...props
}: Props) => (
  <label className={cn(styles.container, className, { [styles.disabled]: disabled, [styles.checked]: checked })}>
    <input
      className={styles.input}
      onChange={() => onChange()}
      type="radio"
      checked={checked}
      disabled={disabled}
      {...props}
    />
    <div className={styles.icon} />
    {children && <div className={styles.children}>{children}</div>}
  </label>
);

RadioButton.defaultProps = {
  className: '',
  disabled: false,
  checked: false,
  children: '',
};

export default memo(RadioButton);
