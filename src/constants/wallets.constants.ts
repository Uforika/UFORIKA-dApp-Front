import BigNumber from 'bignumber.js';

import { TransactionFromHistoryType } from '../types/transaction.types';

export enum LOGIN_PROVIDER {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  REDDIT = 'reddit',
  DISCORD = 'discord',
  TWITCH = 'twitch',
  APPLE = 'apple',
  LINE = 'line',
  GITHUB = 'github',
  KAKAO = 'kakao',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  WEIBO = 'weibo',
  WECHAT = 'wechat',
  EMAIL_PASSWORDLESS = 'email_passwordless',
  WEBAUTHN = 'webauthn',
  JWT = 'jwt',
  METAMASK = 'metamask',
}

export const mergeTransactionHistory = (mergingList: TransactionFromHistoryType[]) => mergingList.reduce<TransactionFromHistoryType[]>((
  accumulator,
  currentTransaction,
  index,
) => {

  if (index === 0) {
    accumulator.push(currentTransaction);
    return accumulator;
  }
  const existedTransactionIndex = accumulator.findIndex((transaction) => transaction.hash === currentTransaction.hash);

  if (!(existedTransactionIndex < 0)) {
    accumulator[existedTransactionIndex] = { ...accumulator[existedTransactionIndex], ...currentTransaction };
    return accumulator;
  }
  accumulator.push(currentTransaction);
  return accumulator;

}, []);

export const DEFAULT_BALANCE_VALUE = new BigNumber(0);
