import * as yup from 'yup';
import { FORM_FIELDS_ERRORS } from '@constants/messages.constants';

export const emailYup = yup
  .string()
  .email(FORM_FIELDS_ERRORS.EMAIL_INCORRECT)
  .required(FORM_FIELDS_ERRORS.REQUIRED);
