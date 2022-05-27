import React, { FC, memo } from 'react';
import Header from '@components/Header';
import NftList from './NftList';
import Card from './Card';
import styles from './styles.module.scss';
import { CARDS, TYPE_NFT_OPTIONS } from '../constants';

const Collectibles: FC = () => (
  <>
    <Header as="h3" className={styles.title}>My collectibles</Header>
    <div className={styles.grid}>
      {CARDS.map((cardData) => (
        <Card key={cardData.title} {...cardData} />
      ))}
      <NftList nftList={[]} typeNftOptionList={TYPE_NFT_OPTIONS} />
    </div>
  </>
);
export default memo(Collectibles);
