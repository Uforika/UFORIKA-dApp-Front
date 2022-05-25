export type TransferEventType = {
  id: string,
  address: string,
  returnValues: {
    from: string,
    to: string,
    value: string,
  }
  raw: {
    data: string,
    topics: string[]
  },
  removed: boolean,
  event: string,
  signature: string,
  logIndex: number,
  transactionIndex: number,
  transactionHash: string,
  blockHash: string,
  blockNumber: number,
}
