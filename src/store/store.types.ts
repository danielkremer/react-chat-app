import { store } from './store';

export interface IStatus {
  status: 'loading' | 'success' | 'reject' | undefined;
  error?: IApiError;
}

export interface IApiError {
  name: string;
  message: string;
  code: string;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
