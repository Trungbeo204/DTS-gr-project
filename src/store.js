import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userProfile';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
