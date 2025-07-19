import { describe, it, expect } from '@jest/globals';
import reducer, {
  setModalIngredient,
  setOpen,
  initialState,
} from './modalSlice';
import type { IIngredientModalState } from './modalSlice';
import type { TIngredient } from '@shared/types';
import mockIngredientJson from '../test/ingredients.json';

const mockIngredient: TIngredient = mockIngredientJson.data[0];

describe('Тестирование reducer модального окна', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать setModalIngredient и установить ингредиент', () => {
    const previousState: IIngredientModalState = { ...initialState };
    const newState = reducer(previousState, setModalIngredient(mockIngredient));

    expect(newState).toEqual({
      ...previousState,
      ingredient: mockIngredient,
    });
  });

  it('должен обработать setModalIngredient и сбросить ингредиент в null', () => {
    const previousState: IIngredientModalState = {
      ...initialState,
      ingredient: mockIngredient,
    };
    const newState = reducer(previousState, setModalIngredient(null));

    expect(newState).toEqual({
      ...previousState,
      ingredient: null,
    });
  });

  it('должен обработать setOpen и установить isOpen в true', () => {
    const previousState: IIngredientModalState = { ...initialState };
    const newState = reducer(previousState, setOpen(true));

    expect(newState).toEqual({
      ...previousState,
      isOpen: true,
    });
  });

  it('должен обработать setOpen и установить isOpen в false', () => {
    const previousState: IIngredientModalState = {
      ...initialState,
      isOpen: true,
    };
    const newState = reducer(previousState, setOpen(false));

    expect(newState).toEqual({
      ...previousState,
      isOpen: false,
    });
  });
});
