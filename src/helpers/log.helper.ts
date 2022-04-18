import { getAxiosErrorMessage } from '@helpers/axios.helper';

export const logError = (error: unknown) => {
  let errorMessage;
  const axiosError = getAxiosErrorMessage(error);
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (axiosError) {
    errorMessage = axiosError;
  } else {
    errorMessage = error;
  }
  console.error(errorMessage);
};
