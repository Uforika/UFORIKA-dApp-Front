import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { Dropdown as UIDropdown } from 'semantic-ui-react';
import Icon from '@components/Icon';
import { DropdownCurrencyItemType } from '../types';
import styles from './styles.module.scss';

type Props = DropdownCurrencyItemType

const DropdownCurrencyItem: FC<Props> = ({
  image, text, value, active, ...props
}) => (
  <UIDropdown.Item
    className={classNames(styles.item, { [styles.active]: active })}
    active={active}
    {...props}
  >
    <Icon width={24} type={image} />
    <span className={styles.text}>{text}</span>
    <span className={styles.value}>{value}</span>
  </UIDropdown.Item>
);

export default memo(DropdownCurrencyItem);
