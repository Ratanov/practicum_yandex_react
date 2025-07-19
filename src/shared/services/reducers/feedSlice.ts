import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeedOrderItem } from '@shared/types';

export interface ISliceFeed {
  total: number | null;
  totalToday: number | null;
  status: 'connected' | 'disconnected' | 'connecting';
  orders: Array<TFeedOrderItem>;
}

export const initialState: ISliceFeed = {
  orders: [],
  status: 'disconnected',
  total: null,
  totalToday: null,
};

export const wsDisconnect = createAction('feed/wsDisconnect');

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsOnMessage: (state, action: PayloadAction<Omit<ISliceFeed, 'status'>>) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    },
    wsOnConnecting: (state) => {
      state.status = 'connecting';
    },
    wsOnOpen: (state) => {
      state.status = 'connected';
    },
    wsOnClose: (state) => {
      state.status = 'disconnected';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wsDisconnect, (state) => {
      state.status = 'disconnected';
      state.orders = [];
      state.total = null;
      state.totalToday = null;
    });
  },
});

export const { wsOnMessage, wsOnClose, wsOnConnecting, wsOnOpen } =
  feedSlice.actions;
export default feedSlice.reducer;
