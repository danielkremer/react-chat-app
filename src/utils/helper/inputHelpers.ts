export const usernameInputRule = {
  required: 'Username is required',
  minLength: {
    value: 4,
    message: 'Username should be at least 3 characters long',
  },
  maxLength: {
    value: 12,
    message: 'Username should be at least 12 characters long',
  },
};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const emailInputRule = {
  pattern: {
    value: EMAIL_REGEX,
    message: 'Email is invalid',
  },
};

export const passwordInputRule = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password should be at least 8 characters long',
  },
  maxLength: {
    value: 19,
    message: 'Password should maximum least 19 characters long',
  },
};

export const codeInputRule = {
  required: 'Code is required',
};
