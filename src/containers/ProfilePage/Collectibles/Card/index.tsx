import React, { FC, memo } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string,
  description: string,
  imageSrc: string,
  isFeature?: boolean
}

const Card: FC<Props> = ({
  title, description, imageSrc, isFeature,
}) => (
  <div className={styles.card}>
    <img src={imageSrc} alt={title} className={styles.backgroundImg} />
    <div className={styles.content}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        {isFeature && <p>SOON</p>}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

Card.defaultProps = {
  isFeature: false,
};

export default memo(Card);
