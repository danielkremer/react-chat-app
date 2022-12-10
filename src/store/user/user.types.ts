import { IStatus } from '../store.types';

export interface IUserState extends IStatus {
  loggedInUser?: any;
}

export interface ISignInProps {
  username: string;
  password: string;
}

export interface ISingUpProps {
  username: string;
  password: string;
  attributes: any;
}
export interface IConfirmSignUpProps {
  username: string;
  code: string;
}
export interface IForgotPasswordProps {
  username: string;
}

export interface IResendSignUpProps {
  username: string;
}
export interface IForgotPasswordSubmitProps {
  username: string;
  code: string;
  password: string;
}
