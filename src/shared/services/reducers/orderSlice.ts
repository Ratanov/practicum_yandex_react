import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsApi } from '@shared/api';
import { TOrderResponse } from '@shared/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IOrderState {
  isLoading: boolean;
  orderItems: Array<string>;
  error: string | null;
  name: string | null;
  number: number | null | undefined;
}

export const initialState: IOrderState = {
  isLoading: false,
  name: null,
  error: null,
  orderItems: [],
  number: null,
};

export const postOrder = createAsyncThunk(
  'ingredients/post',
  ingredientsApi.createOrder
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderItems(
      state: IOrderState,
      action: PayloadAction<IOrderState['orderItems']>
    ) {
      state.orderItems = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.number = null;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          if (action.payload.success) {
            state.number = action.payload?.order?.number;
            state.name = action.payload?.name ?? null;
            state.error = null;
            state.isLoading = false;
          }
        }
      )
      .addCase(postOrder.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Ошибка при создании заказа';
        state.isLoading = false;
      });
  },
});

export const { setOrderItems } = orderSlice.actions;
export default orderSlice.reducer;
