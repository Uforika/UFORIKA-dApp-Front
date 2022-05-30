import { polygonScanGet as get } from '@helpers/axios.helper';
import { CONFIG } from '@constants/config.constants';
import { TransactionFromHistoryType } from '../../types/transaction.types';

/** api https://docs.polygonscan.com/api-endpoints */

export type TransactionListFromAccountType = { status: string, result: TransactionFromHistoryType[], message: string }

export const getTransactionListFromAccount = async (
  action: string,
  address: string,
  startblock?: string | number,
  contractaddress?: string,
): Promise<TransactionListFromAccountType> => {

  const transactionObject = await get<TransactionListFromAccountType>('', {
    module: 'account', action, address, sort: 'desc', apikey: CONFIG.API_POLYGON_SCAN_KEY, startblock, contractaddress,
  });
  return transactionObject;
};
