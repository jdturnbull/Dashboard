import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import call from "../../utils/call";
import { app_base } from "../../config";

// Gets token from localstorage, verifies and returns session
export const setup = createAsyncThunk("user/setup", async () => {
  const token = localStorage.getItem("token");
  const { session, workers, actions } = await call("POST", "user/setup", {
    token,
  });
  return { session, workers, actions };
});

// Sends magic links
export const auth = createAsyncThunk("user/auth", async (data) => {
  const response = await call("POST", "user/auth", data);
  return response;
});

export const user = createSlice({
  name: "user",
  initialState: {
    session: null,
    errored: false,
    workers: [],
    sideBarOpen: false,
  },
  reducers: {
    setSideBarOpen: (state, action) => {
      state.sideBarOpen = action.payload;
    },
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

      const redirect = new URL(`${app_base}/pending`);
      redirect.searchParams.append("email", email);
      redirect.searchParams.append("firstName", firstName);

      window.open(redirect, "_self");
    });
  },
});

export const { setSideBarOpen } = user.actions;
export default user.reducer;
