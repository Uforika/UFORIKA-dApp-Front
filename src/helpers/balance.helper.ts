import BigNumber from 'bignumber.js';

export const USER_BALANCE = 10000;

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};

export const foraToUsd = (number: number, usdCourse: number) => number / usdCourse;

export const calculateFee = (
  estimateGas: string | number | BigNumber,
  gasPrice: string | BigNumber,
  divider: string | number,
) => new BigNumber(estimateGas).multipliedBy(gasPrice).div(10 ** Number(divider));
