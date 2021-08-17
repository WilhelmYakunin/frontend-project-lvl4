/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const signupFromSlice = createSlice({
  name: 'signup',
  initialState: {
    isSignuped: false,
    signupError: 'none',
  },
  reducers: {
    signup(state) {
      state.isSignuped = true;
    },
    signupError(state, action) {
      state.signupError = action.payload;
    },
  },
});

export const {
  signup, signupError,
} = signupFromSlice.actions;

export default signupFromSlice.reducer;
