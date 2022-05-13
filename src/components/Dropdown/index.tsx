import React, { FC, memo } from 'react';
import { Dropdown as UIDropdown, StrictDropdownProps } from 'semantic-ui-react';
import { ReactComponent as IconChevron } from './assets/chevron.svg';
import styles from './Dropdown.module.scss';

type Props = StrictDropdownProps & {
  selectOnBlur?: boolean;
  selectOnNavigation?: boolean;
  fluid?: boolean;
  label?: string
  name: string
  errorMessage?: string
}

const Dropdown: FC<Props> = ({
  selectOnBlur, selectOnNavigation, fluid, label, name, errorMessage, ...props
}) => (
  <div className={styles.wrap}>
    {label && <label className={styles.label} htmlFor={name}>{label}</label>}
    <UIDropdown
      fluid={fluid}
      selectOnNavigation={selectOnNavigation}
      selectOnBlur={selectOnBlur}
      className={styles.dropdown}
      icon={<IconChevron className={styles.icon} />}
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
};

export default memo(Dropdown);
