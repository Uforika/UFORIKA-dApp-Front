type MESSAGES_MAP = { [key: string]: string };

export const FORM_FIELDS_ERRORS: MESSAGES_MAP = {
  REQUIRED: 'This field is required',
  EMAIL_INCORRECT: 'Email address is incorrect',
  PASSWORD_INCORRECT: 'Password is incorrect',
  PASSWORDS_MUST_MATCH: 'Passwords must match',
  PASSWORD_MIN: 'Password must be at least [min] characters',
  PASSWORD_MAX: 'Password must contain no more than [max] characters',
  SHOULD_BE_NO_MORE: 'Should be no more [max]',
  SHOULD_BE_AT_LEAST: 'Should be at least [min]',
};
