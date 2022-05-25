import React, { FC, memo, ReactNode } from 'react';
import { Dropdown as UIDropdown, StrictDropdownProps } from 'semantic-ui-react';
import cn from 'classnames';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import styles from './styles.module.scss';

type Props = StrictDropdownProps & {
  selectOnBlur?: boolean;
  selectOnNavigation?: boolean;
  fluid?: boolean;
  label?: string
  name: string
  errorMessage?: string
  size?: 'big' | 'small',
  isInlineView?: boolean,
  icon?: ReactNode
}

const Dropdown: FC<Props> = ({
  selectOnBlur, selectOnNavigation, fluid, label, icon,
  name, errorMessage, className, size, isInlineView, ...props
}) => (
  <div className={cn(styles.wrap, className, { [styles.inline]: isInlineView })}>
    {label && <label className={styles.label} htmlFor={name}>{label}</label>}
    <UIDropdown
      fluid={fluid}
      selectOnNavigation={selectOnNavigation}
      selectOnBlur={selectOnBlur}
      className={cn(styles.dropdown, size ? styles[size] : null)}
      icon={icon}
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
  isInlineView: false,
  icon: () => (
    <Icon
      className="dropdownIcon"
      type={ICONS.DROPDOWN_CHEVRON}
      width={16}
    />
  ),
};

export default memo(Dropdown);
