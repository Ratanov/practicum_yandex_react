import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TSelectedIngredients } from '@shared/types';

interface ISliceSelectedIngredients {
  selectedIngredients: Array<TSelectedIngredients>;
  selectedBun: TIngredient | null;
  viewedIngredient: TIngredient | null;
}

interface ISelectedIngredientSortAction {
  fromIndex: number;
  toIndex: number;
}

const initialState: ISliceSelectedIngredients = {
  selectedBun: null,
  selectedIngredients: [],
  viewedIngredient: null,
};

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    setBun(
      state: ISliceSelectedIngredients,
      action: PayloadAction<TIngredient | null>
    ) {
      state.selectedBun = action.payload;
    },
    setIngredients: {
      reducer: (
        state: ISliceSelectedIngredients,
        action: PayloadAction<Array<TSelectedIngredients>>
      ) => {
        state.selectedIngredients = [...action.payload];
      },
      prepare: (items: Array<TIngredient>) => ({
        payload: items.map((ingredient) => ({
          ...ingredient,
          __key: uuidv4(),
        })),
      }),
    },
    setIngredient(
      state: ISliceSelectedIngredients,
      action: PayloadAction<TIngredient | null>
    ) {
      state.viewedIngredient = action.payload;
    },
    addIngredient: {
      reducer: (
        state: ISliceSelectedIngredients,
        action: PayloadAction<TSelectedIngredients>
      ) => {
        state.selectedIngredients = [
          ...state.selectedIngredients,
          action.payload,
        ];
      },
      prepare: (item: TIngredient) => ({
        payload: { ...item, __key: uuidv4() },
      }),
    },
    removeIngredient(
      state: ISliceSelectedIngredients,
      action: PayloadAction<string>
    ) {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.__key !== action.payload
      );
    },
    sortIngredients(
      state: ISliceSelectedIngredients,
      action: PayloadAction<ISelectedIngredientSortAction>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const [ingredient] = state.selectedIngredients.splice(fromIndex, 1);
      state.selectedIngredients.splice(toIndex, 0, ingredient);
    },
  },
});

export const {
  setBun,
  setIngredients,
  setIngredient,
  addIngredient,
  removeIngredient,
  sortIngredients,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
