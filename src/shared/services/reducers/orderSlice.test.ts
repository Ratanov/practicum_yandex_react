import { describe, it, expect, jest } from '@jest/globals';
import reducer, { postOrder, setOrderItems, initialState } from './orderSlice';
import type { IOrderState } from './orderSlice';
import type { TOrderResponse } from '@shared/types';

jest.mock('@shared/api', () => ({
  ingredientsApi: {
    createOrder: jest.fn(),
  },
}));

const mockSuccessResponse: TOrderResponse = {
  success: true,
  name: 'Test Order',
  order: {
    number: 12345,
  },
};

const mockFailedResponse: TOrderResponse = {
  success: false,
  // @ts-expect-error
  name: "",
  order: {
    number: 0,
  },
};

describe('Тестирование reducer создания заказа', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать setOrderItems и установить orderItems', () => {
    const previousState: IOrderState = { ...initialState };
    const orderItems = ['item1', 'item2'];
    const newState = reducer(previousState, setOrderItems(orderItems));

    expect(newState).toEqual({
      ...previousState,
      orderItems,
    });
  });

  it('должен обработать postOrder.pending', () => {
    const previousState: IOrderState = {
      ...initialState,
      number: 999,
      error: 'старая ошибка',
    };
    const newState = reducer(previousState, { type: postOrder.pending.type });

    expect(newState).toEqual({
      ...previousState,
      isLoading: true,
      error: null,
      number: null,
    });
  });

  it('должен обработать postOrder.fulfilled и обновить данные при success: true', () => {
    const previousState: IOrderState = {
      ...initialState,
      isLoading: true,
    };
    const newState = reducer(previousState, {
      type: postOrder.fulfilled.type,
      payload: mockSuccessResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      number: mockSuccessResponse.order?.number,
      name: mockSuccessResponse.name,
      error: null,
    });
  });

  it('должен обработать postOrder.fulfilled и не обновлять данные при success: false', () => {
    const previousState: IOrderState = {
      ...initialState,
      isLoading: true,
      number: 999,
      name: 'старое имя',
    };
    const newState = reducer(previousState, {
      type: postOrder.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
    });
  });

  it('должен обработать postOrder.rejected и установить пользовательскую ошибку', () => {
    const previousState: IOrderState = {
      ...initialState,
      isLoading: true,
    };
    const errorMessage = 'Ошибка сети';
    const newState = reducer(previousState, {
      type: postOrder.rejected.type,
      error: { message: errorMessage },
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      error: errorMessage,
    });
  });

  it('должен обработать postOrder.rejected с ошибкой по умолчанию при отсутствии сообщения', () => {
    const previousState: IOrderState = {
      ...initialState,
      isLoading: true,
    };
    const newState = reducer(previousState, {
      type: postOrder.rejected.type,
      error: {},
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      error: 'Ошибка при создании заказа',
    });
  });
});
