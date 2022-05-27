import { TransactionReceipt as TransactionReceiptWeb3 } from 'web3-core';
import BigNumber from 'bignumber.js';
import { TOKEN } from '@constants/token.constants';

export type TransactionFromHistoryType = {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError?: string
  nonce: string
  timeStamp: string
  to: string
  tokenDecimal?: string
  tokenName?: string
  tokenSymbol?: string
  transactionIndex?: string
  txreceipt_status: '0' | '1'
  value: string
  isInternalTransaction?: boolean
  isNetworkCurrencyTransaction?: boolean
}

export type TransactionHistoryObjectType = { lastBlockNumber: string, transactionHistory: TransactionFromHistoryType[] } | undefined

export type TransactionReceipt = Omit<TransactionReceiptWeb3, 'logs'>

export type useTransactionProps = (tokenName: TOKEN, recipientAddress: string | undefined, amount: string | undefined) =>
[sendTransaction: () => Promise<TransactionReceipt | undefined>, fee: Promise<BigNumber | undefined>]
