import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsApi, TApiOrderResponse } from '@shared/api';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IOrderState {
  isLoading: boolean;
  order: TApiOrderResponse['order'] | null;
  orderItems: Array<string>;
  error: string | null;
  name: string | null;
}

const initialState: IOrderState = {
  isLoading: false,
  name: null,
  error: null,
  order: null,
  orderItems: [],
};

export const postOrder = createAsyncThunk(
  'ingredients/post',
  ingredientsApi.postOrder
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
        state.order = null;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<TApiOrderResponse>) => {
          state.order = action.payload.order;
          state.name = action.payload?.name ?? null;
          state.error = null;
          state.isLoading = false;
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
