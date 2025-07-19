import { describe, it, expect, jest } from '@jest/globals';
import reducer, {
  addIngredient,
  removeIngredient,
  setBun,
  setIngredients,
  sortIngredients,
  setIngredient,
  initialState,
} from './selectedIngredientsSlice';
import type {
  ISliceSelectedIngredients,
  ISelectedIngredientSortAction,
} from './selectedIngredientsSlice';
import type { TIngredient } from '@shared/types';
import mockIngredientJson from '../test/ingredients.json';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

const mockBun: TIngredient = mockIngredientJson.data[0];

const mockIngredient1: TIngredient = mockIngredientJson.data[1];

const mockIngredient2: TIngredient = mockIngredientJson.data[2];

describe('Тестирование reducer ингредиентов', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать setIngredients и установить ингредиенты с __key', () => {
    const previousState: ISliceSelectedIngredients = { ...initialState };
    const ingredientsList = [mockIngredient1, mockIngredient2];
    const newState = reducer(previousState, setIngredients(ingredientsList));

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [
        { ...mockIngredient1, __key: 'mocked-uuid' },
        { ...mockIngredient2, __key: 'mocked-uuid' },
      ],
    });
  });

  it('должен обработать setBun и установить булку', () => {
    const previousState: ISliceSelectedIngredients = { ...initialState };
    const newState = reducer(previousState, setBun(mockBun));

    expect(newState).toEqual({
      ...previousState,
      selectedBun: mockBun,
    });
  });

  it('должен обработать setBun и сбросить булку в null', () => {
    const previousState: ISliceSelectedIngredients = {
      ...initialState,
      selectedBun: mockBun,
    };
    const newState = reducer(previousState, setBun(null));

    expect(newState).toEqual({
      ...previousState,
      selectedBun: null,
    });
  });

  it('должен обработать setIngredient и установить просматриваемый ингредиент', () => {
    const previousState: ISliceSelectedIngredients = { ...initialState };
    const newState = reducer(previousState, setIngredient(mockIngredient1));

    expect(newState).toEqual({
      ...previousState,
      viewedIngredient: mockIngredient1,
    });
  });

  it('должен обработать setIngredient и сбросить просматриваемый ингредиент в null', () => {
    const previousState: ISliceSelectedIngredients = {
      ...initialState,
      viewedIngredient: mockIngredient1,
    };
    const newState = reducer(previousState, setIngredient(null));

    expect(newState).toEqual({
      ...previousState,
      viewedIngredient: null,
    });
  });

  it('должен обработать addIngredient и добавить ингредиент с __key', () => {
    const previousState: ISliceSelectedIngredients = { ...initialState };
    const newState = reducer(previousState, addIngredient(mockIngredient1));

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [{ ...mockIngredient1, __key: 'mocked-uuid' }],
    });
  });

  it('должен обработать removeIngredient и удалить ингредиент по __key', () => {
    const previousState: ISliceSelectedIngredients = {
      ...initialState,
      selectedIngredients: [
        { ...mockIngredient1, __key: 'uuid1' },
        { ...mockIngredient2, __key: 'uuid2' },
      ],
    };
    const newState = reducer(previousState, removeIngredient('uuid1'));

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [{ ...mockIngredient2, __key: 'uuid2' }],
    });
  });

  it('должен обработать sortIngredients и отсортировать ингредиенты', () => {
    const previousState: ISliceSelectedIngredients = {
      ...initialState,
      selectedIngredients: [
        { ...mockIngredient1, __key: 'uuid1' },
        { ...mockIngredient2, __key: 'uuid2' },
      ],
    };
    const sortAction: ISelectedIngredientSortAction = {
      fromIndex: 0,
      toIndex: 1,
    };
    const newState = reducer(previousState, sortIngredients(sortAction));

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [
        { ...mockIngredient2, __key: 'uuid2' },
        { ...mockIngredient1, __key: 'uuid1' },
      ],
    });
  });
});
