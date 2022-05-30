import React, { memo } from 'react';
import cn from 'classnames';
import { Checkbox as UICheckbox, StrictCheckboxProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = StrictCheckboxProps

const Checkbox = ({
  className, disabled, label, ...props
}: Props) => (
  <div className={styles.checkboxContainer}>
    <UICheckbox
      className={cn(styles.wrapper, { [styles.withLabel]: label }, { [styles.disabled]: disabled }, className)}
      label={label}
      tabIndex={0}
      disabled={disabled}
      {...props}
    />
  </div>
);

export default memo(Checkbox);
