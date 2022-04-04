/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import cn from 'classnames';
import styles from './switcher.module.scss';

type Props = {
  className?: string,
  checked?: boolean,
  disabled?: boolean,
  onChange: () => void,
}

const Switcher = ({
  checked, onChange, className, disabled, ...props
}: Props) => (
  <div className={cn(styles.wrapper, className)}>
    <label className={cn(styles.container, { [styles.checked]: checked, [styles.disabled]: disabled })}>
      <input className={styles.checkbox} checked={checked} onChange={() => onChange()} type="checkbox" disabled={disabled} {...props} />
      <span className={styles.icon} />
    </label>
  </div>
);

Switcher.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
};

export default memo(Switcher);
