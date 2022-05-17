import React, { FC, memo } from 'react';
import NftList from './NftList';
import Card from './Card';
import styles from './styles.module.scss';
import { CARDS, NFT_LIST, TYPE_NFT_OPTIONS } from '../constants';

const Collectibles: FC = () => (
  <div>
    <h3 className={styles.title}>My collectibles</h3>
    <div className={styles.grid}>
      {CARDS.map((cardData) => (
        <Card key={cardData.title} {...cardData} />
      ))}
      <NftList nftList={NFT_LIST} typeNftOptionList={TYPE_NFT_OPTIONS} />
    </div>
  </div>
);
export default memo(Collectibles);
