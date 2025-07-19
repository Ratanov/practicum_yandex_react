import { describe, it, expect, jest } from '@jest/globals';
import reducer, { loadIngredients, initialState } from './ingredientsSlice';
import type { IIngredientsState } from './ingredientsSlice';
import type { TIngredient } from '@shared/types';
import mockIngredient from '../test/ingredients.json';

jest.mock('@shared/api', () => ({
  ingredientsApi: {
    getIngredients: jest.fn(),
  },
}));

const mockIngredients: TIngredient[] = mockIngredient.data;

const mockIngredientsResponse = {
  success: true,
  data: mockIngredients,
};

const expectedIngredientsHash: Record<string, TIngredient> =
  mockIngredientsResponse.success
    ? mockIngredientsResponse.data.reduce(
        (acc: Record<string, TIngredient>, item: TIngredient) => {
          acc[item._id] = item;
          return acc;
        },
        {} as Record<string, TIngredient>
      )
    : {};

describe('Тестирование reducer ингредиентов', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен установить состояние загрузки при начале запроса', () => {
    const previousState: IIngredientsState = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      isLoading: false,
    };
    const newState = reducer(previousState, {
      type: loadIngredients.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: true,
      error: null,
    });
  });

  it('должен обновить состояние при получении данных', () => {
    const previousState: IIngredientsState = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      isLoading: true,
    };
    const newState = reducer(previousState, {
      type: loadIngredients.fulfilled.type,
      payload: mockIngredientsResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      ingredients: mockIngredientsResponse.success
        ? mockIngredientsResponse.data
        : [],
      ingredientsHash: expectedIngredientsHash,
    });
  });

  it('должен корректно обработать пустой массив ингредиентов', () => {
    const previousState: IIngredientsState = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      isLoading: true,
    };

    const emptyResponse = {
      success: true,
      data: [],
    };

    const newState = reducer(previousState, {
      type: loadIngredients.fulfilled.type,
      payload: emptyResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      ingredients: [],
      ingredientsHash: {},
    });
  });

  it('должен сохранить текущие данные при ошибке загрузки', () => {
    const existingIngredients = mockIngredients.slice(0, 2);
    const existingHash = existingIngredients.reduce(
      (acc: Record<string, TIngredient>, item: TIngredient) => {
        acc[item._id] = item;
        return acc;
      },
      {} as Record<string, TIngredient>
    );

    const previousState: IIngredientsState = {
      error: null,
      ingredients: existingIngredients,
      ingredientsHash: existingHash,
      isLoading: true,
    };

    const newState = reducer(previousState, {
      type: loadIngredients.rejected.type,
      error: { message: 'Ошибка сети' },
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      error: 'Ошибка сети',
      ingredients: existingIngredients,
      ingredientsHash: existingHash,
    });
  });

  it('должен правильно обработать неуспешный ответ сервера', () => {
    const previousState: IIngredientsState = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      isLoading: true,
    };

    const unsuccessfulResponse = {
      success: false,
      data: [],
    };

    const newState = reducer(previousState, {
      type: loadIngredients.fulfilled.type,
      payload: unsuccessfulResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isLoading: false,
      ingredients: [],
      ingredientsHash: {},
    });
  });

  it('должен сформировать корректную хэш-таблицу ингредиентов', () => {
    const previousState: IIngredientsState = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      isLoading: true,
    };

    const testIngredients = {
      success: true,
      data: mockIngredients,
    };

    const expectedHash = mockIngredients.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
    }, {} as Record<string, TIngredient>);

    const newState = reducer(previousState, {
      type: loadIngredients.fulfilled.type,
      payload: testIngredients,
    });

    expect(newState.ingredientsHash).toEqual(expectedHash);
  });

  it('должен очистить предыдущую ошибку при новом запросе', () => {
    const previousState: IIngredientsState = {
      error: 'Старая ошибка',
      ingredients: [],
      ingredientsHash: {},
      isLoading: false,
    };

    const newState = reducer(previousState, {
      type: loadIngredients.pending.type,
    });

    expect(newState.error).toBeNull();
    expect(newState.isLoading).toBe(true);
  });
});
