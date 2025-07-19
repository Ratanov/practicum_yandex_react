import { describe, it, expect, jest } from '@jest/globals';
import userReducer, {
  resetStore,
  setAuthStatus,
  setUser,
  wsOnClose,
  wsOnConnecting,
  wsOnMessage,
  wsOnOpen,
  initialState,
} from './userSlice';
import type { IUserState } from './userSlice';
import type { TAuthResponse } from '@shared/types';

jest.mock('@reduxjs/toolkit', () => {
  const toolkit = jest.requireActual('@reduxjs/toolkit') as any;
  return {
    createSlice: toolkit.createSlice,
    createAsyncThunk: (typePrefix: string) => {
      const actionCreator: any = () => {};
      actionCreator.pending = { type: `${typePrefix}/pending` };
      actionCreator.fulfilled = { type: `${typePrefix}/fulfilled` };
      actionCreator.rejected = { type: `${typePrefix}/rejected` };
      return actionCreator;
    },
  };
});

jest.mock('@shared/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock('@shared/utils', () => ({
  refreshToken: jest.fn(),
}));

jest.mock('@shared/utils/cookie', () => ({
  setCookie: jest.fn(),
}));

import mockPayload from '../test/orders.json';
const mockWsPayload = mockPayload as Pick<IUserState, 'orders'>;

import userData from '../test/user.json';
const mockUserData = userData as TAuthResponse;

const mockFailedResponse = {
  success: false,
};

describe('Тестирование reducer пользователя', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать setUser', () => {
    const previousState: IUserState = { ...initialState };
    const action = setUser(mockUserData.user);
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      user: mockUserData.user,
    });
  });

  it('должен обработать setAuthStatus', () => {
    const previousState: IUserState = { ...initialState };
    const action = setAuthStatus(true);
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
    });
  });

  it('должен обработать resetStore', () => {
    const previousState: IUserState = {
      ...initialState,
      isAuth: true,
      user: mockUserData.user,
    };
    const action = resetStore();
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      user: initialState.user,
      isAuth: initialState.isAuth,
    });
  });

  it('должен обработать wsOnMessage', () => {
    const previousState: IUserState = { ...initialState, ordersLoading: true };
    const action = wsOnMessage(mockWsPayload as Omit<IUserState, 'wsStatus'>);
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      orders: mockWsPayload.orders,
      ordersLoading: false,
    });
  });

  it('должен обработать wsOnConnecting', () => {
    const previousState: IUserState = { ...initialState };
    const action = wsOnConnecting();
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      wsStatus: 'connecting',
    });
  });

  it('должен обработать wsOnOpen', () => {
    const previousState: IUserState = {
      ...initialState,
      wsStatus: 'connecting',
    };
    const action = wsOnOpen();
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      wsStatus: 'connected',
    });
  });

  it('должен обработать wsOnClose', () => {
    const previousState: IUserState = {
      ...initialState,
      wsStatus: 'connected',
    };
    const action = wsOnClose();
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      wsStatus: 'disconnected',
    });
  });

  it('должен обработать initUser.pending', () => {
    const previousState: IUserState = { ...initialState, isAuth: true };
    const action = { type: 'user/init/pending' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: true,
    });
  });

  it('должен обработать initUser.fulfilled при success: true', () => {
    const previousState: IUserState = { ...initialState, initLoading: true };
    const action = {
      type: 'user/init/fulfilled',
      payload: { success: true },
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
      initLoading: false,
    });
  });

  it('должен обработать initUser.fulfilled при success: false', () => {
    const previousState: IUserState = { ...initialState, initLoading: true };
    const action = {
      type: 'user/init/fulfilled',
      payload: mockFailedResponse,
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      initLoading: false,
    });
  });

  it('должен обработать initUser.rejected', () => {
    const previousState: IUserState = { ...initialState, initLoading: true };
    const action = { type: 'user/init/rejected' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      initLoading: false,
    });
  });

  it('должен обработать loginUser.pending', () => {
    const previousState: IUserState = { ...initialState, isAuth: true };
    const action = { type: 'authApi/login/pending' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it('должен обработать loginUser.fulfilled при success: true', () => {
    const previousState: IUserState = { ...initialState };
    const action = {
      type: 'authApi/login/fulfilled',
      payload: mockUserData,
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
      user: mockUserData.user,
    });
  });

  it('должен обработать loginUser.fulfilled при success: false', () => {
    const previousState: IUserState = {
      ...initialState,
      user: mockUserData.user,
      initLoading: false,
    };
    const action = {
      type: 'authApi/login/fulfilled',
      payload: mockFailedResponse,
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
    });
  });

  it('должен обработать loginUser.rejected', () => {
    const previousState: IUserState = { ...initialState };
    const action = { type: 'authApi/login/rejected' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it('должен обработать registerUser.pending', () => {
    const previousState: IUserState = { ...initialState, isAuth: true };
    const action = { type: 'authApi/register/pending' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it('должен обработать registerUser.fulfilled при success: true', () => {
    const previousState: IUserState = { ...initialState };
    const action = {
      type: 'authApi/register/fulfilled',
      payload: mockUserData,
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
      user: mockUserData.user,
    });
  });

  it('должен обработать registerUser.fulfilled при success: false', () => {
    const previousState: IUserState = {
      ...initialState,
      user: mockUserData.user,
      initLoading: false,
    };
    const action = {
      type: 'authApi/register/fulfilled',
      payload: mockFailedResponse,
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
    });
  });

  it('должен обработать registerUser.rejected', () => {
    const previousState: IUserState = { ...initialState };
    const action = { type: 'authApi/register/rejected' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it('должен обработать logoutUser.pending', () => {
    const previousState: IUserState = { ...initialState, isAuth: true };
    const action = { type: 'authApi/logout/pending' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it('должен обработать logoutUser.fulfilled при success: true', () => {
    const previousState: IUserState = {
      ...initialState,
      isAuth: true,
      user: mockUserData.user,
    };
    const action = {
      type: 'authApi/logout/fulfilled',
      payload: { success: true },
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      user: initialState.user,
      isAuth: initialState.isAuth,
    });
  });

  it('должен обработать logoutUser.fulfilled при success: false', () => {
    const previousState: IUserState = {
      ...initialState,
      isAuth: true,
      user: mockUserData.user,
      initLoading: false,
    };
    const action = {
      type: 'authApi/logout/fulfilled',
      payload: mockFailedResponse,
    };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
    });
  });

  it('должен обработать logoutUser.rejected', () => {
    const previousState: IUserState = { ...initialState, isAuth: true };
    const action = { type: 'authApi/logout/rejected' };
    const newState = userReducer(previousState, action);

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });
});
