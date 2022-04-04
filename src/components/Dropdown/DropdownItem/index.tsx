import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import styles from '../dropdown.module.scss';

type Props = {
  className?: string,
  active?: boolean,
  children: ReactNode,
  onClick: () => void,
}

const DropdownItem = ({
  className, active, children, onClick,
}: Props) => (
  <button className={cn(styles.item, className, { [styles.active]: active })} onClick={onClick} type="button">
    {children}
  </button>
);

DropdownItem.defaultProps = {
  className: '',
  active: false,
};

export default memo(DropdownItem);
