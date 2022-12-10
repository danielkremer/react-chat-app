import { IStatus } from '../store.types';

export interface IChatState extends IStatus {
  userInfo: {
    chatId?: string;
    user?: any;
  };
}
export interface IChangeUserProps {
  chatId?: string;
  user?: any;
}
