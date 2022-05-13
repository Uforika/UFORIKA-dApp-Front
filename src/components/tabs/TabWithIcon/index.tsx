import React, { ReactNode, memo } from 'react';
import cn from 'classnames';
import styles from './tab-with-icon.module.scss';

type Props = {
  className?: string,
  label?: string,
  onClick?: () => void,
  active?: boolean,
  disabled?: boolean,
  img?: ReactNode,
}

const TabWithIcon = ({
  className, label, onClick, active, disabled, img,
}: Props) => (
  <button
    className={cn(styles.item, { [styles.activeItem]: active }, className)}
    onClick={onClick}
    disabled={disabled}
  >
    <div className={cn(styles.iconWrapper, { 'px-tabWithIconIconWrapper': active })}>{img}</div>
    <p className={styles.label}>{label}</p>
  </button>
);

TabWithIcon.defaultProps = {
  className: '',
  label: '',
  active: false,
  disabled: false,
  img: null,
  onClick: undefined,
};

export default memo(TabWithIcon);
