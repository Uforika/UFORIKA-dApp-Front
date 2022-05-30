export const TRANSACTION_COLORS_BY_STATUSES = {
  fail: 'red',
  success: 'green',
};

export enum TRANSACTION_LABELS_BY_STATUSES {
  'FAIL',
  'SUCCESS',
  'WAITING...',
}

export enum TRANSACTION_STATUSES {
  'SUCCESS' = 'success',
  'FAIL' = 'fail',
}

export type TRANSACTION_STATUS = 'success' | 'fail' | 'pending'

export type TRANSACTION_FILER_TYPES = 'all' | 'sent' | 'received'
