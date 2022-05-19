type MESSAGES_MAP = { [key: string]: string };

export const FORM_FIELDS_ERRORS: MESSAGES_MAP = {
  REQUIRED: 'This field is required',
  EMAIL_INCORRECT: 'Email address is incorrect',
};

export const TOAST_MASSAGE_ERRORS: MESSAGES_MAP = {
  CLOSE_MODAL: 'You haven\'t completed the authorization. Please try again',
  AUTH_ERROR: 'The authorization failed. Please try again',
};

export const TOAST_MASSAGE_SUCCESS: MESSAGES_MAP = {
  COPY: 'Address copied to clipboard',
};
