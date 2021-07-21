import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
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
} = signupSlice.actions;

export default signupSlice.reducer;
