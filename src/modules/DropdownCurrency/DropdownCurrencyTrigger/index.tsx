import React, { FC, ReactNode, memo } from 'react';
import styles from './styles.module.scss';

type Props = {
  text: ReactNode
  image: ReactNode
}

const DropdownInput: FC<Props> = ({ image, text }) => (
  <div className={styles.wrap}>
    <div className={styles.panel}>
      <span className={styles.image}>{image}</span>
      <span className={styles.text}>{text}</span>
    </div>
  </div>
);

export default memo(DropdownInput);
