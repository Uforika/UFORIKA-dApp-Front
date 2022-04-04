/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import styles from './checkbox.module.scss';

type Props = {
  className?: string,
  label?: string,
  checked?: boolean,
  disabled?: boolean,
  children?: ReactNode,
  onChange: () => void,
}

const Checkbox = ({
  className, label, checked, disabled, children, onChange, ...props
}: Props) => (
  <label className={cn(styles.wrapper, { [styles.disabled]: disabled }, 'px-checkbox-wrapper')} tabIndex={0}>
    <input
      className={cn(styles.checkbox, className)}
      checked={checked}
      type="checkbox"
      tabIndex={-1}
      disabled={disabled}
      onChange={() => onChange()}
      {...props}
    />
    <span className={styles.icon} />
    {label && <span className={styles.labelArea}>{label}</span> }
    {children}
  </label>
);

Checkbox.defaultProps = {
  className: '',
  label: '',
  checked: false,
  disabled: false,
  children: null,
};

export default memo(Checkbox);
