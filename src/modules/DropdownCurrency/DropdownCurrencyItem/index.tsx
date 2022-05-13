import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { Dropdown as UIDropdown } from 'semantic-ui-react';
import { DropdownCurrencyItemType } from '../types';
import styles from './DropdownCurrencyItem.module.scss';

type Props = Omit<DropdownCurrencyItemType, 'imageSmall'>

const DropdownCurrencyItem: FC<Props> = ({
  image, text, value, active, ...props
}) => (
  <UIDropdown.Item
    className={classNames(styles.item, { [styles.active]: active })}
    active={active}
    {...props}
  >
    <span className={styles.image}>{image}</span>
    <span className={styles.text}>{text}</span>
    <span className={styles.value}>{value}</span>
  </UIDropdown.Item>
);

export default memo(DropdownCurrencyItem);
