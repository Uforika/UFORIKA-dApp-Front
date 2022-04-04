import * as yup from 'yup';
import { FORM_FIELDS_ERRORS } from '@constants/messages.constants';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, PASSWORD_REGEXP } from '@constants/auth.constants';
import { FIELD_NAMES } from '@constants/form.constants';
import { RequiredNumberSchema } from 'yup/lib/number';
import { Maybe } from 'yup/lib/types';

export const maxNumberYup = (max = 100): RequiredNumberSchema<Maybe<number>> => yup
  .number()
  .max(max, FORM_FIELDS_ERRORS.SHOULD_BE_NO_MORE.replace('[max]', String(max)))
  .typeError(FORM_FIELDS_ERRORS.SHOULD_BE_NO_MORE.replace('[max]', String(max)))
  .required(FORM_FIELDS_ERRORS.REQUIRED);

export const minNumberYup = (min = 0): RequiredNumberSchema<Maybe<number>> => yup
  .number()
  .min(min, FORM_FIELDS_ERRORS.SHOULD_BE_AT_LEAST.replace('[min]', String(min)))
  .typeError(FORM_FIELDS_ERRORS.SHOULD_BE_AT_LEAST.replace('[min]', String(min)))
  .required(FORM_FIELDS_ERRORS.REQUIRED);

export const emailYup = yup
  .string()
  .email(FORM_FIELDS_ERRORS.EMAIL_INCORRECT)
  .required(FORM_FIELDS_ERRORS.REQUIRED);

export const passwordYup = yup
  .string()
  .min(MIN_PASSWORD_LENGTH, ({ min }) => FORM_FIELDS_ERRORS.PASSWORD_MIN.replace('[min]', String(min)))
  .max(MAX_PASSWORD_LENGTH, ({ max }) => FORM_FIELDS_ERRORS.PASSWORD_MAX.replace('[max]', String(max)))
  .matches(PASSWORD_REGEXP, FORM_FIELDS_ERRORS.PASSWORD_INCORRECT)
  .required(FORM_FIELDS_ERRORS.REQUIRED);

export const confirmPasswordYup = yup
  .string()
  .oneOf([yup.ref(FIELD_NAMES.PASSWORD), null], FORM_FIELDS_ERRORS.PASSWORDS_MUST_MATCH);
