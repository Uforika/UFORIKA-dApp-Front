import {
  useContext,
} from 'react';
import { RateContext } from '@contexts/rate.context';

export const useRate = () => {
  const {
    getCurrencyPrice,
  } = useContext(RateContext);

  return {
    getCurrencyPrice,
  };
};
