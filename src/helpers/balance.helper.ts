import BigNumber from 'bignumber.js';

export const calculateFee = (
  estimateGas: string | number | BigNumber,
  gasPrice: string | BigNumber,
  divider: string | number,
) => new BigNumber(estimateGas).multipliedBy(gasPrice).div(10 ** Number(divider));
