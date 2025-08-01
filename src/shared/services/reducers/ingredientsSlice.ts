import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ingredientsApi } from '@shared/api';
import { TApiResponse, TIngredient } from '@shared/types';

export interface IIngredientsState {
  isLoading: boolean;
  ingredients: Array<TIngredient>;
  ingredientsHash: Record<string, TIngredient>;
  error: string | null;
}

export const initialState: IIngredientsState = {
  isLoading: false,
  ingredients: [],
  ingredientsHash: {},
  error: null,
};

export const loadIngredients = createAsyncThunk(
  'ingredients/get',
  ingredientsApi.getIngredients
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loadIngredients.fulfilled,
        (
          state: IIngredientsState,
          action: PayloadAction<TApiResponse<Array<TIngredient>>>
        ) => {
          if (action.payload.success) {
            state.ingredients = action.payload?.data ?? [];
            state.ingredientsHash = action.payload.data.reduce((prev, curr) => {
              prev[curr._id] = curr;

              return prev;
            }, {} as Record<string, TIngredient>);
          }

          state.isLoading = false;
        }
      )
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Ошибка при загрузке данных';
        state.isLoading = false;
      });
  },
});

export default ingredientsSlice.reducer;
