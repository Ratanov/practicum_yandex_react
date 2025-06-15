import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@shared/types';

interface IIngredientModalState {
  ingredient: TIngredient | null;
  isOpen: boolean;
}

const initialState: IIngredientModalState = {
  ingredient: null,
  isOpen: false,
};

const ingredientModalSlice = createSlice({
  name: 'ingredientModal',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen } = ingredientModalSlice.actions;
export default ingredientModalSlice.reducer;
