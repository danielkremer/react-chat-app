import { combineReducers } from 'redux';
import base from './base/commonSlice';
import chat from './chat/chat.slice';
import user from './user/user.slice';
const rootReducer = combineReducers({
  base,
  user,
  chat,
});

export default rootReducer;
