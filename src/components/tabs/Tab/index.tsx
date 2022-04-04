import React, { memo } from 'react';
import cn from 'classnames';
import styles from './tab.module.scss';

type Props = {
  className?: string,
  label?: string,
  disabled?: boolean,
  active?: boolean,
  onClick: () => void,
}

const Tab = ({
  className, label, onClick, active, disabled,
}: Props) => (
  <button
    className={cn(styles.item, { [styles.activeItem]: active }, className)}
    onClick={() => onClick()}
    disabled={disabled}
  >
    <p className={styles.label}>{label}</p>
  </button>
);

Tab.defaultProps = {
  className: '',
  label: '',
  active: false,
  disabled: false,
};

export default memo(Tab);
