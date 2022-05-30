import React, { FC, memo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

type Props = {
  id: string
  size: number
  value: string
}

const QrCode: FC<Props> = ({ id, size, value }) => (
  <QRCodeCanvas id={id} size={size} value={value} />
);

export default memo(QrCode);
