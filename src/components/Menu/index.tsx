import React, { memo } from 'react';
import { Menu as UIMenu, StrictMenuProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type PickedTypes = 'pointing' | 'vertical'| 'children'| 'className'

type Props = Pick<StrictMenuProps, PickedTypes>

const Menu = ({ ...props }: Props) => (
  <div className={styles.menuContainer}>
    <UIMenu secondary {...props} />
  </div>
);

export default memo(Menu);
