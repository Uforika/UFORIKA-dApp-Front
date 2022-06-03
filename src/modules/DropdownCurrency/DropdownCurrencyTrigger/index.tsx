import React, {
  ReactNode, memo, forwardRef,
} from 'react';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import styles from './styles.module.scss';

type Props = {
  text: ReactNode
  image: ICONS
}

const DropdownCurrencyTrigger = forwardRef<HTMLDivElement, Props>(({ image, text }, ref) => (
  <div ref={ref} className={styles.wrap}>
    <div className={styles.panel}>
      {image && (
        <span className={styles.image}>
          <Icon width={20} type={image} />
        </span>
      )}
      <span className={styles.text}>{text}</span>
    </div>
  </div>
));

export default memo(DropdownCurrencyTrigger);
