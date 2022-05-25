import { TRANSACTION_STATUSES } from '@containers/HistoryPage/types';

export const getTransactionStatus = (txReceiptStatus: string, isError: string | undefined): TRANSACTION_STATUSES => {
  if (txReceiptStatus && Number(txReceiptStatus) === 0) {
    return TRANSACTION_STATUSES.FAIL;
  }

  if (isError && Number(isError) === 1) {
    return TRANSACTION_STATUSES.FAIL;
  }

  return TRANSACTION_STATUSES.SUCCESS;
};
