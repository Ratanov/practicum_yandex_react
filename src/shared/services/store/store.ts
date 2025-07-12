import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { type RootState } from './root';
import { feedWsMiddleware } from '../middlewares/feedMiddleware';
import { userWsMiddleware } from '../middlewares/userMiddleware';

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(feedWsMiddleware)
      .concat(userWsMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
export default store;
