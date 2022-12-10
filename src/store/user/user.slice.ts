import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './user.types';

const initialState: IUserState = {
  loggedInUser: undefined,
  status: undefined,
  error: undefined,
};

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = authUserSlice.actions;
export default authUserSlice.reducer;
