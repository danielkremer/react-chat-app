import { createSlice } from '@reduxjs/toolkit';
import { errorHandler, isPendingAction, isRejectedAction } from '../../utils/helper/reducerHelpers';
import { IApiError } from '../store.types';
import { IChatState } from './chat.types';

const initialState: IChatState = {
  userInfo: {
    chatId: undefined,
    user: undefined,
  },

  status: undefined,
  error: undefined,
};

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction('chat'), (state) => {
        state.status = 'loading';
      })
      .addMatcher(isRejectedAction('chat'), (state, action) => {
        state.status = 'reject';
        let error: IApiError;
        if (action.error.code) {
          error = action.error;
        } else {
          error = JSON.parse(action.error.message);
        }
        state.error = error;
        errorHandler(error);
      });
  },
});

export const { changeUser } = authUserSlice.actions;
export default authUserSlice.reducer;
