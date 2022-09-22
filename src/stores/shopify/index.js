import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import call from '../../utils/call';

export const integrate = createAsyncThunk('shopify/integrate', async ({ email, shop, description }) => {
  const url = await call('POST', 'shopify/auth', { email, shop, description });
  window.location.replace(url);
});

export const update = createAsyncThunk('shopify/update', async ({ id, data, enabledActions }) => {
  const updated = await call('POST', 'shopify/update', { id, data, enabledActions });
  return updated;
});

export const resolve = createAsyncThunk('shopify/resolve', async ({ id }) => {
  const response = await call('POST', 'shopify/actions/resolve', { id });
  return response;
});

export const shopify = createSlice({
  name: 'shopify',
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(update.fulfilled, (state, action) => {});
  },
});

export default shopify.reducer;
