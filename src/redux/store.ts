import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import imageReducer from '../features/add-image/imageSlice';

export const store = configureStore({
  reducer: {
    userConfig: authReducer,
    selectedImg: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
