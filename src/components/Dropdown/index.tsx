import React, { FC, memo } from 'react';
import { Dropdown as UIDropdown, StrictDropdownProps } from 'semantic-ui-react';
import cn from 'classnames';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import styles from './styles.module.scss';

type Props = StrictDropdownProps & {
  selectOnBlur?: boolean;
  selectOnNavigation?: boolean;
  fluid?: boolean;
  label?: string
  name: string
  errorMessage?: string
  size?: 'big' | 'small'
}

const Dropdown: FC<Props> = ({
  selectOnBlur, selectOnNavigation, fluid, label,
  name, errorMessage, className, size, ...props
}) => (
  <div className={cn(styles.wrap, className)}>
    {label && <label className={styles.label} htmlFor={name}>{label}</label>}
    <UIDropdown
      fluid={fluid}
      selectOnNavigation={selectOnNavigation}
      selectOnBlur={selectOnBlur}
      className={cn(styles.dropdown, size ? styles[size] : null)}
      icon={(
        <Icon
          className="dropdownIcon"
          type={ICONS.DROPDOWN_CHEVRON}
          width={16}
        />
      )}
      id={name}
      {...props}
    />
    {!!errorMessage && <span className={styles.error}>{errorMessage}</span>}
  </div>
);

Dropdown.defaultProps = {
  selectOnBlur: false,
  selectOnNavigation: false,
  fluid: true,
  label: '',
  errorMessage: '',
  size: undefined,
};

export default memo(Dropdown);
