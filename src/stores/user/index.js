import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import call from '../../utils/call';

// Gets token from localstorage, verifies and returns session
export const setup = createAsyncThunk('user/setup', async () => {
  const token = localStorage.getItem('token');
  const { session, workers, actions } = await call('POST', 'user/setup', { token });
  return { session, workers, actions };
});

// Sends magic links
export const auth = createAsyncThunk('user/auth', async (data) => {
  const response = await call('POST', 'user/auth', data);
  return response;
});

export const user = createSlice({
  name: 'user',
  initialState: {
    session: null,
    errored: false,
    workers: [],
  },

  extraReducers: (builder) => {
    builder.addCase(setup.fulfilled, (state, action) => {
      const { session, workers, actions } = action.payload;
      state.workers = workers;
      state.session = session;
      state.actions = actions;
    });
    // TODO: Catch auth.error
    builder.addCase(auth.fulfilled, (state, action) => {
      const { email, firstName } = action.payload;

      const redirect = new URL('http://localhost:3000/pending');
      redirect.searchParams.append('email', email);
      redirect.searchParams.append('firstName', firstName);

      window.open(redirect, '_self');
    });
  },
});

export default user.reducer;
