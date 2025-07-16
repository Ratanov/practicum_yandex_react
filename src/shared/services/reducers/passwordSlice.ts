import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { passwordApi } from '@shared/api';

export interface IPasswordState {
  isMailSend: boolean;
  successReset: boolean;
}

export const initialState: IPasswordState = {
  isMailSend: false,
  successReset: false,
};

export const forgotPassword = createAsyncThunk(
  'forgot',
  passwordApi.forgotPassword
);
export const resetPassword = createAsyncThunk(
  'reset',
  passwordApi.resetPassword
);

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isMailSend = false;
        state.successReset = false;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.isMailSend = payload.success;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isMailSend = false;
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isMailSend = true;
        state.successReset = false;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.isMailSend = false;
          state.successReset = true;
        }
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isMailSend = true;
        state.successReset = false;
      });
  },
});

export default passwordSlice.reducer;
