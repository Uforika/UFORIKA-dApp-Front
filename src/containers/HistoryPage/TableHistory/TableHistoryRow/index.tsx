import React, { FC, memo } from 'react';
import { SemanticCOLORS } from 'semantic-ui-react';
import cn from 'classnames';
import { useWallet } from '@hooks/wallet.hooks';
import Popup from '@components/Popup';
import ButtonIcon from '@components/ButtonIcon';
import { ICONS } from '@components/Icon/constants';
import Label from '@components/Label';
import Icon from '@components/Icon';
import { TRX_LINK_CONSTRUCTOR } from '@constants/network.constants';
import { NETWORK_TOKEN_NAME } from '@constants/token.constants';
import { CONFIG } from '@constants/config.constants';
import { calculateFee } from '@helpers/balance.helper';
import { formatDate } from '@helpers/date.helper';
import { divideTokenValueByDecimal } from '@helpers/number.helper';
import { TransactionFromHistoryType } from 'src/types/transaction.types';
import {
  TRANSACTION_COLORS_BY_STATUSES,
} from '../../types';
import { getTransactionStatus } from './helpers';
import styles from './styles.module.scss';

type Props = {
  transaction: TransactionFromHistoryType,
  className?: string
  isLoading: boolean
}

const TableHistoryRow: FC<Props> = ({
  transaction, className, isLoading,
}) => {
  const { address } = useWallet();

  if (!transaction) {
    return null;
  }

  const {
    hash, to, gasPrice, gasUsed, tokenDecimal,
    txreceipt_status: txReceiptStatus, timeStamp,
    value, tokenSymbol, from, isError, isInternalTransaction,
    isNetworkCurrencyTransaction,
  } = transaction;

  const createLink = TRX_LINK_CONSTRUCTOR[CONFIG.NETWORK];
  const isSendTransactionType = address?.toLocaleLowerCase() === from.toLocaleLowerCase();

  const transactionStatus = getTransactionStatus(txReceiptStatus, isError);

  const senderLabel = isSendTransactionType ? 'To:' : 'From:';
  const sender = isSendTransactionType ? to : from;

  const getTransactionTokenSymbol = () => {
    if (tokenSymbol) {
      return tokenSymbol;
    }
    if (isInternalTransaction || isNetworkCurrencyTransaction) {
      return NETWORK_TOKEN_NAME[CONFIG.NETWORK];
    }
    return '';
  };

  return (
    <div className={cn(styles.row, className)}>
      <div>
        <div className={styles.cellWrapColumn}>
          <span className={styles.date}>{formatDate(timeStamp, 'MMM D')}</span>
          <span className={styles.time}>{formatDate(timeStamp, 'HH:mm')}</span>
        </div>
      </div>
      <div>
        <div className={styles.cellWrap}>
          <Icon type={isSendTransactionType ? ICONS.TRANSACTION_SEND : ICONS.TRANSACTION_RECEIVE} width={36} />
          <div className={styles.cellWrap2Content}>
            <span className={styles.transactionType}>
              {isSendTransactionType ? 'Send' : 'Receive'}
            </span>
            <span className={styles.sender}>
              {senderLabel}&nbsp;<span className={styles.senderAddress}>{sender}</span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className={cn(styles.cellWrap, styles.center)}>
          <Label
            color={TRANSACTION_COLORS_BY_STATUSES[transactionStatus] as SemanticCOLORS}
          >
            {transactionStatus}
          </Label>
        </div>
      </div>
      <div>
        <div className={cn(styles.cellWrapColumn, styles.right, styles.mr40)}>
          <span className={cn(styles.transactionValue, { [styles.isReceive]: !isSendTransactionType })}>
            {`${isSendTransactionType ? '-' : '+'}${divideTokenValueByDecimal(value, tokenDecimal)} ${getTransactionTokenSymbol()}`}
          </span>
          {isSendTransactionType && (
            <span className={styles.transactionFee}>
              {`Fee: ${calculateFee(gasPrice, gasUsed, tokenDecimal).toString()} MATIC`}
            </span>
          )}
        </div>
      </div>
      <div>
        <Popup
          position="bottom left"
          content="Go to Polygon Scan"
          trigger={(
            <ButtonIcon
              href={createLink(hash)}
              target="_blank"
              rel="noopener noreferrer"
              as="a"
              disabled={isLoading}
              type={ICONS.LINK}
              width={20}
            />
          )}
        />
      </div>
    </div>
  );
};

TableHistoryRow.defaultProps = {
  className: undefined,
};

export default memo(TableHistoryRow);
