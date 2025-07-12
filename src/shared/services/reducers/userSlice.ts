import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@shared/api';
import { TAuthResponse, TFeedOrderItem, TUpdateResponse } from '@shared/types';
import { setCookie } from '@shared/utils/cookie';
import { refreshToken } from '@shared/utils';

interface IUserState {
  user: TAuthResponse['user'] | null;
  initLoading: boolean;
  isAuth: boolean;
  ordersLoading: boolean;
  orders: Array<TFeedOrderItem>;
  wsStatus: 'connected' | 'disconnected' | 'connecting';
}

const initialState: IUserState = {
  isAuth: false,
  user: null,
  initLoading: true,
  ordersLoading: true,
  orders: [],
  wsStatus: 'disconnected',
};

export const initUser = createAsyncThunk('user/init', refreshToken);
export const loginUser = createAsyncThunk('authApi/login', authApi.login);
export const registerUser = createAsyncThunk(
  'authApi/register',
  authApi.register
);
export const logoutUser = createAsyncThunk('authApi/logout', authApi.logout);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState['user']>) {
      state.user = action.payload;
    },
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    resetStore(state) {
      state.user = initialState.user;
      state.isAuth = initialState.isAuth;
    },
    wsOnMessage(state, action: PayloadAction<Omit<IUserState, 'wsStatus'>>) {
      state.orders = action.payload.orders;
      state.ordersLoading = false;
    },
    wsOnConnecting(state) {
      state.wsStatus = 'connecting';
    },
    wsOnOpen(state) {
      state.wsStatus = 'connected';
    },
    wsOnClose(state) {
      state.wsStatus = 'disconnected';
    },
  },
  extraReducers: (builder) => {
    const setUnauthorized = (state: IUserState) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    };

    const handleAuthSuccess = (state: IUserState, payload: any) => {
      if (!payload.success) {
        setUnauthorized(state);
        return;
      }
      state.isAuth = true;
      state.user = payload.user;
      setCookie('accessToken', payload.accessToken, 1);
      setCookie('refreshToken', payload.refreshToken, 1);
    };

    builder
      // init user
      .addCase(initUser.pending, (state) => {
        state.isAuth = false;
        state.user = null;
        state.initLoading = true;
      })
      .addCase(initUser.fulfilled, (state, action) => {
        state.isAuth = action.payload.success;
        state.initLoading = false;
      })
      .addCase(initUser.rejected, setUnauthorized)

      // login user
      .addCase(loginUser.pending, setUnauthorized)
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        handleAuthSuccess(state, payload);
      })
      .addCase(loginUser.rejected, setUnauthorized)

      // register user
      .addCase(registerUser.pending, setUnauthorized)
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        handleAuthSuccess(state, payload);
      })
      .addCase(registerUser.rejected, setUnauthorized)

      // logout user
      .addCase(logoutUser.pending, setUnauthorized)
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        if (!payload.success) {
          setUnauthorized(state);
          return;
        }
        state.user = initialState.user;
        state.isAuth = initialState.isAuth;
      })
      .addCase(logoutUser.rejected, setUnauthorized);
  },
});

export const {
  resetStore,
  setAuthStatus,
  setUser,
  wsOnClose,
  wsOnConnecting,
  wsOnMessage,
  wsOnOpen,
} = userSlice.actions;
export default userSlice.reducer;
