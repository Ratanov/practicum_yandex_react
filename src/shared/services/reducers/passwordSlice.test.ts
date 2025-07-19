import { describe, it, expect, jest } from '@jest/globals';
import reducer, {
  forgotPassword,
  resetPassword,
  initialState,
} from './passwordSlice';
import type { IPasswordState } from './passwordSlice';

jest.mock('@shared/api', () => ({
  passwordApi: {
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

const mockSuccessResponse = {
  success: true,
};

const mockFailedResponse = {
  success: false,
};

describe('Тестирование reducer пароля', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать forgotPassword.pending', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: true,
      successReset: true,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
      successReset: false,
    });
  });

  it('должен обработать forgotPassword.fulfilled при success: true', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: false,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.fulfilled.type,
      payload: mockSuccessResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: true,
    });
  });

  it('должен обработать forgotPassword.fulfilled при success: false', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: true,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
    });
  });

  it('должен обработать forgotPassword.rejected', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: true,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.rejected.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
    });
  });

  it('должен обработать resetPassword.pending', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: false,
      successReset: true,
    };
    const newState = reducer(previousState, {
      type: resetPassword.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: true,
      successReset: false,
    });
  });

  it('должен обработать resetPassword.fulfilled при success: true', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: true,
      successReset: false,
    };
    const newState = reducer(previousState, {
      type: resetPassword.fulfilled.type,
      payload: mockSuccessResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
      successReset: true,
    });
  });

  it('должен обработать resetPassword.fulfilled при success: false', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: true,
      successReset: false,
    };
    const newState = reducer(previousState, {
      type: resetPassword.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
    });
  });

  it('должен обработать resetPassword.rejected', () => {
    const previousState: IPasswordState = {
      ...initialState,
      isMailSend: false,
      successReset: true,
    };
    const newState = reducer(previousState, {
      type: resetPassword.rejected.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: true,
      successReset: false,
    });
  });
});
