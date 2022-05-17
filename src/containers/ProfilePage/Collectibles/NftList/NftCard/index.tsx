import React, { FC, memo } from 'react';
import styles from './styles.module.scss';

type Props = {
  name: string,
  type: string,
  nftImage: string
}

const NftCard: FC<Props> = ({ name, type, nftImage }) => (
  <div className={styles.card}>
    <div className={styles.nftImage}>
      <img src={nftImage} alt={name} />
    </div>
    <h4 className={styles.name}>{name}</h4>
    <p className={styles.type}>{type}</p>
  </div>
);

export default memo(NftCard);
