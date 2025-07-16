import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@shared/types';

export interface IIngredientModalState {
  ingredient: TIngredient | null;
  isOpen: boolean;
}

export const initialState: IIngredientModalState = {
  ingredient: null,
  isOpen: false,
};

const ingredientModalSlice = createSlice({
  name: 'ingredientModal',
  initialState,
  reducers: {
    setModalIngredient: (
      state,
      action: PayloadAction<IIngredientModalState['ingredient']>
    ) => {
      state.ingredient = action.payload;
    },
    setOpen: (
      state,
      action: PayloadAction<IIngredientModalState['isOpen']>
    ) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setModalIngredient, setOpen } = ingredientModalSlice.actions;
export default ingredientModalSlice.reducer;
